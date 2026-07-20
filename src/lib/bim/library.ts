export type BimLibraryType = "3d" | "mep" | "fm" | "pdf" | "docs";

export type BimLibraryItem = {
  id: string;
  type: BimLibraryType;
  name: string;
  titleAr: string;
  descriptionAr: string;
  extensions: string[];
  purpose: string;
};

export const BIM_LIBRARY: BimLibraryItem[] = [
  {
    id: "lib-3d",
    type: "3d",
    name: "3D Models",
    titleAr: "مكتبة النماذج ثلاثية الأبعاد",
    descriptionAr: "ملفات النماذج والعارضات المستخدمة كمرجع بصري ومكاني للمشروع.",
    extensions: ["ifc", "obj", "usdz", "glb", "gltf"],
    purpose: "عرض النموذج وربطه بالملفات والملاحظات والتسليم.",
  },
  {
    id: "lib-mep",
    type: "mep",
    name: "MEP Technical Evidence",
    titleAr: "مكتبة الأدلة الفنية MEP",
    descriptionAr: "تقارير وحسابات التكييف والإضاءة والسباكة والكهرباء.",
    extensions: ["pdf", "xlsx", "dwg", "csv"],
    purpose: "توثيق القرارات الفنية والحسابات الداعمة للاعتماد والتنفيذ.",
  },
  {
    id: "lib-fm",
    type: "fm",
    name: "Facility Management",
    titleAr: "مكتبة التشغيل وإدارة المرافق",
    descriptionAr: "بيانات التشغيل والصيانة والضمانات وسجلات ما بعد التسليم.",
    extensions: ["pdf", "xlsx", "docx", "jpg", "png"],
    purpose: "تحويل المشروع بعد التسليم إلى مرجع للتشغيل والصيانة والتجديد.",
  },
  {
    id: "lib-pdf",
    type: "pdf",
    name: "PDF Reports & Drawings",
    titleAr: "مكتبة ملفات PDF",
    descriptionAr: "التقارير واللوحات والاعتمادات والمراجعات بصيغة PDF.",
    extensions: ["pdf"],
    purpose: "عرض ومراجعة ملفات الاعتماد والتسليم والتقارير.",
  },
  {
    id: "lib-docs",
    type: "docs",
    name: "Project Documents",
    titleAr: "مكتبة مستندات المشروع",
    descriptionAr: "مستندات المشروع، ملفات Office، الجداول، الحصر، المواصفات، وملفات CAD.",
    extensions: ["doc", "docx", "xls", "xlsx", "csv", "dwg", "dxf"],
    purpose: "تنظيم مستندات المشروع وربطها بالمرحلة والتخصص والإصدار.",
  },
];

export function getBimLibraryByType(type: BimLibraryType) {
  return BIM_LIBRARY.find((item) => item.type === type);
}

export function getBimLibraryForExtension(extension: string) {
  const cleanExt = extension.toLowerCase().replace(".", "");

  return BIM_LIBRARY.filter((item) =>
    item.extensions.includes(cleanExt)
  );
}
