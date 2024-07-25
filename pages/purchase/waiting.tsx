import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function WaitingPage() {
  const router = useRouter();

  return (
    <Layout title="Waiting Page">
      <HeaderTitle
        path="/purchase/checkout?id=17630837"
        label="Menunggu Konfirmasi"
        className="sticky left-0 top-0"
      />

      <div className="mt-8 grid gap-8">
        <div className="grid gap-4">
          <Image
            priority
            src="/img/waiting-img.svg"
            alt="waiting img"
            width={250}
            height={250}
            className="justify-self-center"
          />

          <div className="text-center">
            <h5 className="mb-1 font-semibold text-foreground">
              Menunggu Konfirmasi Admin
            </h5>
            <p className="text-[12px] leading-[180%] text-foreground-600">
              Mohon untuk menunggu konfirmasi dari admin mengenai biaya
              pengiriman. Proses ini akan memakan waktu paling lambat{" "}
              <span className="font-bold text-primary">1x24 jam</span>.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <h5 className="font-semibold text-foreground">Total Belanja</h5>
            <h5 className="font-semibold text-foreground">Rp780.000</h5>
          </div>
        </div>

        <Button
          color="primary"
          endContent={<ArrowRight weight="bold" size={16} />}
          onClick={() => router.push("/products")}
          className="mb-4 w-full font-semibold"
        >
          Lanjut Belanja
        </Button>
      </div>
    </Layout>
  );
}
