import Layout from "@/components/Layout";
import CardTransaction from "@/components/card/CardTransaction";
import HeaderTitle from "@/components/header/HeaderTitle";

export default function TransactionsPage() {
  return (
    <Layout title="Lihat Riwayat Transaksi Pembelian Baja Anda Dengan Mudah Dan Cepat.">
      <div className="grid gap-3">
        <HeaderTitle
          path="/profile"
          label="Riwayat Transaksi"
          className="sticky left-0 top-0"
        />

        <CardTransaction
          {...{
            id_transaksi: "#150720241001",
            total_item: 2,
            total_transaksi: 100000,
            status: "Selesai",
          }}
        />

        <CardTransaction
          {...{
            id_transaksi: "#090720242301",
            total_item: 10,
            total_transaksi: 3500000,
            status: "Selesai",
          }}
        />

        <CardTransaction
          {...{
            id_transaksi: "#290720241201",
            total_item: 20,
            total_transaksi: 35000000,
            status: "Selesai",
          }}
        />
      </div>
    </Layout>
  );
}
