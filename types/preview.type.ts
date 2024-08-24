import { Address } from "./address.type";

export type Preview = {
  type: "pickup" | "delivery";
  bank: {
    atas_nama: string;
    bank: string;
    no_rekening: string;
  };
  products: ProductOrder[];
  address: Address;
  subtotal_ongkir: number;
  total: number;
};

export type ProductOrder = {
  nama_produk_asli: string;
  kode_item: string;
  kategori: string;
  harga: number;
  image: { url: string }[];
  quantity: number;
  subtotal_produk: number;
};
