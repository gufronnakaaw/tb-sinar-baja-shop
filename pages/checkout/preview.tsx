import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Image } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import NextImage from "next/image";
import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();

  return (
    <Layout title="Preview Page">
      <HeaderTitle
        path="/checkout?id=17630837&purchase_amount=2"
        label="Preview Pesanan"
        className="sticky left-0 top-0"
      />

      <div className="grid gap-16">
        <div className="grid gap-6">
          <div className="grid grid-cols-[24px_1fr] items-start gap-2 rounded-xl border-[2px] border-primary bg-primary/20 p-4">
            <WarningCircle
              weight="duotone"
              size={24}
              className="text-primary"
            />

            <div>
              <h4 className="mb-2 text-sm font-semibold italic text-primary">
                Harap Dibaca!
              </h4>
              <p className="text-[12px] font-medium text-primary">
                Waktu pengiriman paling lambat 3x24 jam setelah pembayaran
                berhasil di verifikasi.
              </p>
            </div>
          </div>

          <div className="grid gap-[12px]">
            <div className="grid">
              <h4 className="font-semibold text-foreground">
                Metode Pembayaran
              </h4>
              <p className="text-[12px] font-medium italic text-foreground-600">
                Transfer Bank (Verifikasi manual)
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">
                Bank Central Asia (BCA)
              </p>
              <Image
                priority
                isBlurred
                as={NextImage}
                src="/img/bank-bca-logo.svg"
                alt="bank img"
                width={500}
                height={500}
                className="h-auto w-16"
              />
            </div>
          </div>

          <div className="h-[2px] w-full border-[2px] border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h4 className="font-semibold text-foreground">Daftar Pesanan</h4>

            <div className="grid gap-4">
              <CardOrder />
            </div>
          </div>

          <div className="h-[2px] w-full border-[2px] border-dashed border-foreground-200" />

          <div className="grid gap-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground-600">
                Total Harga (1 item)
              </h4>
              <h4 className="text-sm font-semibold text-foreground">
                Rp 260.000
              </h4>
            </div>

            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground-600">
                Biaya Pengiriman
              </h4>
              <h4 className="text-sm font-semibold text-foreground">
                Rp 50.000
              </h4>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground">Total Pembayaran</h4>
            <h4 className="font-semibold text-foreground">Rp 310.000</h4>
          </div>

          <Button
            color="primary"
            onClick={() => router.push("/checkout/preview")}
            className="w-full font-semibold"
          >
            Pesan (1 item)
          </Button>
        </div>
      </div>
    </Layout>
  );
}
