import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import HeaderTitle from "@/components/header/HeaderTitle";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { ArrowRight, Bag } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function TransactionDetail() {
  const router = useRouter();
  const label = "Transaksi " + "#190720240901";

  return (
    <Layout title={label}>
      <div className="grid gap-2">
        <HeaderTitle
          path="/profile/transactions"
          label={label}
          className="sticky left-0 top-0"
        />

        <div className="grid gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-foreground-100 p-6">
              <Bag weight="bold" size={35} />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-lg font-semibold">Johnson Doe</p>
              <p className="text-sm text-foreground-600">089078789898</p>
              <p className="text-sm text-foreground-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
                dolorem?
              </p>
            </div>
          </div>

          <div className="h-[1.5px] w-full border-[1.5px] border-dashed border-foreground-200" />

          <div className="grid gap-3">
            <h4 className="font-semibold text-foreground">Daftar Pesanan</h4>

            <div className="grid gap-4">
              <CardOrder />
              <CardOrder />
              <CardOrder />
            </div>
          </div>

          <div className="h-[1.5px] w-full border-[1.5px] border-dashed border-foreground-200" />

          <div className="grid gap-3">
            <h4 className="font-semibold text-foreground">Rincian Transaksi</h4>

            <div className="grid grid-cols-2 items-center gap-2">
              <div className="grid gap-1 justify-self-start text-[12px] font-medium text-foreground-600">
                <p>Metode Pembayaran</p>
                <p>Status</p>
                <p>Waktu</p>
                <p>Tanggal</p>
                <p>ID Transaksi</p>
                <p>Biaya Pengiriman</p>
                <p>Subtotal</p>
              </div>

              <div className="grid gap-1 justify-self-end text-[12px] font-medium text-foreground">
                <p>Transfer</p>
                <p className="font-semibold text-success">Selesai</p>
                <p>10:00 WIB</p>
                <p>20 Juli 2024</p>
                <p>#190720240901</p>
                <p>{formatRupiah(50000)}</p>
                <p>{formatRupiah(150000)}</p>
              </div>
            </div>
          </div>

          <div className="h-[1.5px] w-full border-[1.5px] border-dashed border-foreground-200" />

          <div className="mb-10 grid gap-2">
            <div className="flex items-center justify-between text-lg font-semibold">
              <p>Total</p>
              <p>{formatRupiah(200000)}</p>
            </div>

            <Button
              color="primary"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => router.push("/products")}
              className="w-full font-semibold"
            >
              Lanjut Belanja
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
