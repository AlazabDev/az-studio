export type MepDiscipline =
  | "hvac"
  | "lighting"
  | "plumbing"
  | "electrical"
  | "fire_safety";

export const MEP_DISCIPLINES: Record<MepDiscipline, string> = {
  hvac: "تكييف وتهوية",
  lighting: "إضاءة",
  plumbing: "سباكة",
  electrical: "كهرباء",
  fire_safety: "سلامة ودفاع مدني",
};

export const MEP_EVIDENCE_SOURCES = {
  hvac: ["Carrier HAP"],
  lighting: ["DIALux evo"],
  plumbing: ["Plumbing calculation report"],
  electrical: ["Load schedule", "Electrical calculation report"],
  fire_safety: ["Fire safety report", "Civil defense requirements"],
};
