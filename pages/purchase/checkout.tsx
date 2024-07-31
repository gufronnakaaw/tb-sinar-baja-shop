import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { ArrowRight, MapTrifold, Truck } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedDiv(selectedDiv === id ? null : id);
  };

  return (
    <Layout title="Checkout Page">
      <HeaderTitle
        path="/products/17630837"
        label="Buat Pesanan"
        className="sticky left-0 top-0"
      />

      <div className="grid gap-8">
        <div className="grid gap-4">
          <h3 className="text-sm font-semibold text-foreground">
            Informasi Pengiriman
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <CardShipping>
              <MapTrifold
                weight="duotone"
                size={36}
                className="text-primary transition group-hover:text-white"
              />

              <h6 className="text-center text-[12px] font-semibold text-foreground-600 transition group-hover:text-white">
                Pesanan <br />
                Diambil Sendiri
              </h6>
            </CardShipping>

            <CardShipping>
              <Truck
                weight="duotone"
                size={36}
                className="text-primary transition group-hover:text-white"
              />

              <h6 className="text-center text-[12px] font-semibold text-foreground-600 transition group-hover:text-white">
                Pesanan <br />
                Diantar
              </h6>
            </CardShipping>
          </div>

          {/* selected delivery */}
          <div className="grid border-l-[4px] border-primary pl-4">
            <h5 className="mb-1 text-sm font-semibold italic text-foreground">
              Pesanan Diambil Sendiri
            </h5>
            <p className="text-[12px] font-medium text-foreground-600">
              Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
              Kediri, Jawa Timur 64131
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full border border-dashed border-foreground-200" />

        <div className="grid gap-4">
          <h3 className="text-sm font-semibold text-foreground">
            Metode Pembayaran{" "}
            <span className="text-[12px] font-medium text-foreground-600">
              (Transfer Bank)
            </span>
          </h3>

          <RadioGroup>
            <Radio
              value="bca"
              description="0192847621 a/n TB Sinar Baja Kediri"
              classNames={{
                description:
                  "text-[12px] italic text-foreground-600 font-medium",
              }}
            >
              <p className="text-sm font-medium text-foreground">
                Bank Central Asia (BCA)
              </p>
            </Radio>

            <Radio
              value="mandiri"
              description="717260402 a/n TB Sinar Baja Kediri"
              classNames={{
                description:
                  "text-[12px] italic text-foreground-600 font-medium",
              }}
            >
              <p className="text-sm font-medium text-foreground">
                Bank Mandiri
              </p>
            </Radio>

            <Radio
              value="bni"
              description="881629374 a/n TB Sinar Baja Kediri"
              classNames={{
                description:
                  "text-[12px] italic text-foreground-600 font-medium",
              }}
            >
              <p className="text-sm font-medium text-foreground">
                Bank Negara Indonesia (BNI)
              </p>
            </Radio>
          </RadioGroup>
        </div>

        <Button
          color="primary"
          endContent={<ArrowRight weight="bold" size={16} />}
          onClick={() => router.push("/purchase/preview?id=17630837")}
          className="mb-4 w-full font-semibold"
        >
          Selanjutnya
        </Button>
      </div>
    </Layout>
  );
}

function CardShipping({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-foreground-200 p-2 transition hover:border-primary hover:bg-primary">
      {children}
    </div>
  );
}
