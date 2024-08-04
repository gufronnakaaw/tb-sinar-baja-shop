export type ProductType = {
  product_id: number;
  product_image: string;
  product_name: string;
  product_category: string;
  price: number;
};

export type ProductTest = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
};

export type Product = {
  kode_item: string;
  slug: string;
  nama_produk: string;
  nama_produk_asli: string;
  kategori: string;
  harga_1: number;
  harga_2: number;
  harga_3: number;
  harga_4: number;
  harga_5: number;
  harga_6: number;
  image: { url: string }[];
};
