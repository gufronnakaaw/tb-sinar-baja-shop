export type Cart = {
  cart_id: string;
  qty: number;
  active: boolean;
  image: {
    url: string;
  }[];
  nama_produk_asli: string;
  harga_6: number;
  kategori: string;
};