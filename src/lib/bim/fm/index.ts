export type FacilityRecordType =
  | "asset"
  | "warranty"
  | "maintenance"
  | "handover"
  | "operation_note"
  | "renovation";

export const FM_RECORD_TYPES: Record<FacilityRecordType, string> = {
  asset: "أصل تشغيلي",
  warranty: "ضمان",
  maintenance: "صيانة",
  handover: "تسليم",
  operation_note: "ملاحظة تشغيل",
  renovation: "تجديد أو تعديل",
};
