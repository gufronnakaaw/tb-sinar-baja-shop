export type Transaction = {
  transaksi_id: string;
  created_at: string;
  total: number;
  total_item: number;
  status: string;
};

export type TransactionDetail = {
  transaksi_id: string;
  type: string;
  nama_penerima: string;
  created_at: string;
  no_telpon: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat_lengkap: string;
  kode_pos: string;
  subtotal_produk: number;
  subtotal_ongkir: number;
  total: number;
  alasan: string | null;
  replied: boolean;
  status: string;
  payment: TransactionPayment;
  products: TransactionProduct[];
};

export type TransactionPayment = {
  url: string | null;
  dari: string | null;
  expired: string | null;
  metode: string;
  nama: string | null;
  alasan: string | null;
  status: string;
};

export type TransactionProduct = {
  nama_produk: string;
  kode_item: string;
  harga: number;
  kategori: string;
  quantity: number;
  subtotal_produk: number;
};
