import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  try {
    // 1. Read request body
    const body = await readBody(event);
    const { resume, config } = body;

    // Validation
    if (!resume || !config) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing resume or config data",
      });
    }

    const baseUrl = getRequestURL(event).origin;
    console.log("baseUrl", baseUrl);

    const resumeName = "my-resume"; // TODO: this should be dynamic after auth process will be implemented

    // 4. Construct URL to PDF render page
    const pdfUrl = `${baseUrl}/resume`;

    // 5. Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    try {
      const page = await browser.newPage();

      // Navigate to the PDF render page
      await page.goto(pdfUrl, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Inject resume and config data into sessionStorage
      await page.evaluate(
        (data) => {
          sessionStorage.setItem("resume", JSON.stringify(data.resume));
          sessionStorage.setItem("config", JSON.stringify(data.config));
        },
        { resume, config }
      );

      // Reload page to pick up the injected data
      await page.reload({
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait for the preview component to render
      await page.waitForSelector(".print-container", { timeout: 5000 });

      // Generate PDF
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        preferCSSPageSize: false,
      });

      // 6. Set response headers and return PDF
      setHeader(event, "Content-Type", "application/pdf");
      setHeader(event, "Content-Disposition", `attachment; filename="${resumeName}.pdf"`);

      return pdf;
    } finally {
      // Always close browser to free resources
      await browser.close();
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `PDF generation failed: ${error.message || "Unknown error"}`,
    });
  }
});
