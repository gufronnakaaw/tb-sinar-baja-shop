import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Image } from "@nextui-org/react";
import { MapTrifold } from "@phosphor-icons/react";
import NextImage from "next/image";
import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();

  return (
    <Layout title="Preview Page">
      <HeaderTitle
        path="/purchase/checkout?id=17630837"
        label="Preview Pesanan"
        className="sticky left-0 top-0"
      />

      <div className="grid gap-16">
        <div className="grid gap-6">
          <div className="grid gap-[12px]">
            <h3 className="text-sm font-semibold text-foreground">
              Informasi Pengiriman
            </h3>

            <div className="flex items-start gap-4">
              <MapTrifold weight="duotone" size={48} className="text-primary" />

              <div>
                <h5 className="mb-1 text-[12px] font-semibold italic text-foreground">
                  Pesanan Diambil Sendiri
                </h5>
                <p className="text-[12px] font-medium text-foreground-600">
                  Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
                  Kediri, Jawa Timur 64131
                </p>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h3 className="text-sm font-semibold text-foreground">
              Metode Pembayaran{" "}
              <span className="text-[12px] font-medium text-foreground-600">
                (Transfer Bank)
              </span>
            </h3>

            <div className="flex items-center justify-between gap-2">
              <div>
                <h6 className="text-[12px] font-medium text-foreground">
                  Bank Central Asia (BCA)
                </h6>
                <p className="mt-1 text-[12px] font-medium italic text-foreground-600">
                  0192847621 a/n TB Sinar Baja Kediri
                </p>
              </div>
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

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h4 className="font-semibold text-foreground">Daftar Pesanan</h4>

            <div className="grid gap-4">
              <CardOrder />
              <CardOrder />
              <CardOrder />
            </div>
          </div>

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[12px] font-medium text-foreground-600">
                Total Harga (3 item)
              </h4>
              <h4 className="text-[12px] font-semibold text-foreground">
                Rp 780.000
              </h4>
            </div>

            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[12px] font-medium text-foreground-600">
                Biaya Pengiriman
              </h4>
              <h4 className="text-[12px] font-semibold text-foreground">
                Rp 50.000
              </h4>
            </div>
          </div>
        </div>

        <div className="grid gap-3 pb-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground">Total Pembayaran</h4>
            <h4 className="font-semibold text-foreground">Rp 830.000</h4>
          </div>

          <Button
            color="primary"
            onClick={() => router.push("/purchase/payment?id=17630837")}
            className="w-full font-semibold"
          >
            Pesan (3 item)
          </Button>
        </div>
      </div>
    </Layout>
  );
}
