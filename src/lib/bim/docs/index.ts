export const DOC_EXTENSIONS = [
  "doc",
  "docx",
  "xls",
  "xlsx",
  "csv",
  "dwg",
  "dxf",
] as const;

export type ProjectDocExtension = (typeof DOC_EXTENSIONS)[number];

export function isProjectDocument(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  return !!ext && DOC_EXTENSIONS.includes(ext as ProjectDocExtension);
}
