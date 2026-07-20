export const BIM_3D_EXTENSIONS = ["ifc", "obj", "usdz", "glb", "gltf"] as const;

export type Bim3DFileType = (typeof BIM_3D_EXTENSIONS)[number];

export function isBim3DFile(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  return !!ext && BIM_3D_EXTENSIONS.includes(ext as Bim3DFileType);
}
