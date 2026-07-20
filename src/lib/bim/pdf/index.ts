export const PDF_LIBRARY_TYPES = [
  "drawing",
  "technical_report",
  "approval",
  "handover",
  "review",
  "invoice",
  "quotation",
] as const;

export type PdfLibraryType = (typeof PDF_LIBRARY_TYPES)[number];

export function isPdfFile(filename: string) {
  return filename.toLowerCase().endsWith(".pdf");
}
