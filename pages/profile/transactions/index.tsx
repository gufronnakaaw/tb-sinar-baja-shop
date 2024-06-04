import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeaderTitle from "@/components/header/HeaderTitle";

export default function TransactionsPage() {
  return (
    <Layout title="Lihat Riwayat Transaksi Pembelian Baja Anda Dengan Mudah Dan Cepat.">
      <Navbar />

      <div className="grid gap-8">
        <HeaderTitle
          path="/profile"
          label="Riwayat Transaksi"
          className="sticky left-0 top-0"
        />

        <div>transactions</div>
      </div>
    </Layout>
  );
}
