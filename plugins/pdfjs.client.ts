import { GlobalWorkerOptions } from "pdfjs-dist";
// Option A: bundle worker and get its URL from Vite
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// If the above ever fails in your env, fallback to a CDN URL instead:
// const workerUrl = 'https://unpkg.com/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs';

export default defineNuxtPlugin(() => {
  GlobalWorkerOptions.workerSrc = workerUrl;
});
