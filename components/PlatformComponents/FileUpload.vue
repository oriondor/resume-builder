<script setup lang="ts">
  const dropZone = ref<HTMLDivElement>();
  const previewImgUrl = ref<string | null>(null);
  const pdfCanvas = ref<HTMLCanvasElement | null>(null);
  const loading = ref(false);

  let pdfApi: typeof import("pdfjs-dist") | null = null;

  async function ensurePdfApi() {
    if (!import.meta.client) return null;
    if (!pdfApi) {
      // typed entry => no TS errors
      pdfApi = await import("pdfjs-dist");
    }
    return pdfApi;
  }

  const fileTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const file = ref<File | null>(null);

  function onDrop(files: File[] | null) {
    if (files && files.length > 0) {
      file.value = files[0] as File;
    } else {
      file.value = null;
    }
  }

  const { isOverDropZone } = useDropZone(dropZone, {
    onDrop,
    dataTypes: fileTypes,
    multiple: false,
    // whether to prevent default behavior for unhandled events
    preventDefaultForUnhandled: false,
  });

  const { open, onChange } = useFileDialog({
    multiple: false,
    accept: fileTypes.join(","),
  });

  onChange((files) => onDrop(files as File[] | null));

  const containerProps = computed(() => {
    if (isOverDropZone.value) {
      return {
        icon: "material-symbols-light:upload-file-rounded",
        text: "Drop it like it's hot",
      };
    }
    return {
      icon: "material-symbols-light:upload-file-outline",
      text: "Drop your file here or click to upload",
    };
  });

  // --- preview helpers ---
  let lastObjectUrl: string | null = null;

  function cleanupObjectUrl() {
    if (lastObjectUrl) {
      URL.revokeObjectURL(lastObjectUrl);
      lastObjectUrl = null;
    }
  }

  async function renderPdfFirstPage(f: File) {
    if (!import.meta.client) return;
    const api = await ensurePdfApi();
    if (!api) return;

    const { getDocument } = api;
    loading.value = true;
    try {
      // Some Nuxt setups require explicitly pointing the workerSrc; if the dynamic import succeeded, pdfjs handles it.
      // If needed, you can manually set:
      // GlobalWorkerOptions.workerSrc = new URL('pdf.worker.min.js', import.meta.url).toString();

      const data = await f.arrayBuffer();
      const pdf = await getDocument({ data }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = pdfCanvas.value!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      await page.render({ canvasContext: ctx, viewport }).promise;
    } catch (e) {
      console.error("PDF render failed:", e);
    } finally {
      loading.value = false;
    }
  }

  function makeImagePreview(f: File) {
    cleanupObjectUrl();
    const url = URL.createObjectURL(f);
    lastObjectUrl = url;
    previewImgUrl.value = url;
  }
  function removeFile() {
    file.value = null;
    previewImgUrl.value = null;

    // clear PDF canvas if rendered
    const canvas = pdfCanvas.value;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.height = 0;
    }

    cleanupObjectUrl();
  }

  // watch file to build preview
  watch(
    file,
    async (f) => {
      previewImgUrl.value = null;
      const canvas = pdfCanvas.value;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.height = 0;
      }
      cleanupObjectUrl();

      if (!f) return;

      if (f.type.startsWith("image/")) {
        makeImagePreview(f);
        return;
      }
      if (f.type === "application/pdf") {
        await renderPdfFirstPage(f);
        return;
      }
      // doc/docx – no native render; show placeholder (handled in template)
    },
    { flush: "post" }
  );

  onBeforeUnmount(() => {
    cleanupObjectUrl();
  });
</script>
<template>
  <div class="file-upload">
    <div v-if="file" class="preview-container">
      <helper-button
        type="secondary"
        class="remove-file"
        icon="material-symbols:close-rounded"
        @click="removeFile"
      />
      <div class="preview-header">
        <span class="preview-label">Preview:</span>
        <span class="preview-name">{{ file.name }}</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="preview-loading">Rendering preview…</div>

      <!-- Image preview -->
      <img v-if="previewImgUrl" :src="previewImgUrl" alt="preview" class="preview-image" />

      <!-- PDF preview -->
      <canvas v-else-if="file.type === 'application/pdf'" ref="pdfCanvas" class="preview-canvas" />

      <!-- DOC/DOCX fallback -->
      <div v-else class="preview-fallback">
        <span class="preview-icon">📄</span>
        <div>
          First-page preview isn't available for this file type in the browser.
          <div class="preview-note">You can still upload it.</div>
        </div>
      </div>
    </div>
    <helper-dashed-container v-else ref="dropZone" v-bind="containerProps" @click="open" />
  </div>
</template>

<style scoped>
  .preview-container {
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 12px;
    margin: auto;
    margin-top: 12px;
    max-width: 15rem;
  }

  .preview-header {
    font-size: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #555;
  }

  .preview-label {
    font-weight: 600;
  }

  .preview-name {
    word-break: break-all;
  }

  .preview-loading {
    font-size: 14px;
    opacity: 0.7;
  }

  .preview-image,
  .preview-canvas {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    display: block;
  }

  .preview-fallback {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    padding: 12px;
    border-radius: 6px;
    background-color: #f5f5f5;
    color: #444;
  }

  .preview-icon {
    font-size: 20px;
  }

  .preview-note {
    opacity: 0.7;
    font-size: 13px;
  }

  .remove-file {
    float: right;
    margin: 0;
    margin-bottom: 8px;
    cursor: pointer;
  }
</style>
