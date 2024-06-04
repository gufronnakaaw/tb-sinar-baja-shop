import { CategoryType, SortingType } from "@/types/filter.type";

export const sorting: SortingType[] = [
  { key: "newest", label: "Terbaru" },
  { key: "latest", label: "Terlama" },
  { key: "high_price", label: "Harga Tertinggi" },
  { key: "low_price", label: "Harga Terendah" },
];

export const filtering: CategoryType[] = [
  { id_category: 1, name: "Bahan Bangunan" },
  { id_category: 2, name: "Keramik" },
  { id_category: 3, name: "Jasa" },
  { id_category: 4, name: "Stainless" },
  { id_category: 5, name: "Rak" },
];
