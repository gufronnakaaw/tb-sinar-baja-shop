import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import HeaderTitle from "@/components/header/HeaderTitle";
import { formatRupiah } from "@/utils/formatRupiah";
import { Bag } from "@phosphor-icons/react";

export default function TransactionDetail() {
  const label = "Transaksi " + "#190720240901";
  return (
    <Layout title={label}>
      <div className="grid gap-2">
        <HeaderTitle
          path="/profile/transactions"
          label={label}
          className="sticky left-0 top-0"
        />

        <div className="grid gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-foreground-100 p-6">
              <Bag size={35} />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-lg font-semibold">Johnson Doe</p>
              <p className="text-sm">089078789898</p>
              <p className="text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
                dolorem?
              </p>
            </div>
          </div>

          <div className="h-[2px] w-full border-[2px] border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h4 className="text-lg font-semibold text-foreground">
              Daftar Pesanan
            </h4>

            <div className="grid gap-4">
              <CardOrder />
              <CardOrder />
              <CardOrder />
            </div>
          </div>

          <div className="h-[2px] w-full border-[2px] border-dashed border-foreground-200" />

          <h4 className="text-lg font-semibold text-foreground">
            Rincian Transaksi
          </h4>

          <div className="grid gap-2 text-sm">
            <div className="grid grid-cols-2">
              <p>Metode Pembayaran</p>
              <p className="justify-self-end">Transfer</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Status</p>
              <p className="justify-self-end text-success">Selesai</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Waktu</p>
              <p className="justify-self-end">10:00</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Tanggal</p>
              <p className="justify-self-end">20 Juli 2024</p>
            </div>
            <div className="grid grid-cols-2">
              <p>ID Transaksi</p>
              <p className="justify-self-end">#190720240901</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Ongkir</p>
              <p className="justify-self-end">{formatRupiah(50000)}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Subtotal</p>
              <p className="justify-self-end">{formatRupiah(150000)}</p>
            </div>
          </div>

          <div className="h-[2px] w-full border-[2px] border-dashed border-foreground-200" />

          <div className="text-md mb-8 grid grid-cols-2 font-semibold">
            <p>Total</p>
            <p className="justify-self-end">{formatRupiah(200000)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
