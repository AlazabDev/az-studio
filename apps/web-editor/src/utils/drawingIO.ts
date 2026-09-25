import { pdfjs } from "react-pdf";
import type { DrawingBackground } from "../../../../packages/core-domain/src";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read drawing file"));
    reader.readAsDataURL(file);
  });
}

function getImageSize(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth || image.width, height: image.naturalHeight || image.height });
    image.onerror = () => reject(new Error("Failed to decode drawing image"));
    image.src = dataUrl;
  });
}

async function renderPdfFirstPage(file: File): Promise<DrawingBackground> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdfDocument = await pdfjs.getDocument({ data: bytes }).promise;
  const page = await pdfDocument.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const maxSide = 2400;
  const scale = Math.min(3, maxSide / Math.max(baseViewport.width, baseViewport.height));
  const viewport = page.getViewport({ scale: Math.max(scale, 1.25) });
  const canvas = window.document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas is unavailable");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport }).promise;
  const dataUrl = canvas.toDataURL("image/png", 0.95);
  await pdfDocument.destroy();
  return {
    name: file.name,
    sourceType: "pdf",
    dataUrl,
    pixelWidth: canvas.width,
    pixelHeight: canvas.height,
    opacity: 0.92
  };
}

export async function readDrawingFile(file: File): Promise<DrawingBackground> {
  const lower = file.name.toLowerCase();
  if (file.type === "application/pdf" || lower.endsWith(".pdf")) {
    return renderPdfFirstPage(file);
  }

  if (file.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(lower)) {
    const dataUrl = await readAsDataUrl(file);
    const size = await getImageSize(dataUrl);
    return {
      name: file.name,
      sourceType: "image",
      dataUrl,
      pixelWidth: size.width,
      pixelHeight: size.height,
      opacity: 0.92
    };
  }

  throw new Error("Supported drawings: PDF, PNG, JPG, JPEG, WEBP");
}
