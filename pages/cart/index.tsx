import EmptyCart from "@/components/EmptyCart";
import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CartPage() {
  const router = useRouter();

  return (
    <Layout title="Keranjang Saya">
      <header className="sticky left-0 top-0 z-50 grid h-20 grid-cols-[50px_1fr_50px] items-center bg-white">
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="sm"
          onClick={() => router.back()}
        >
          <CaretLeft weight="bold" size={20} className="text-foreground" />
        </Button>

        <h5 className="text-center font-semibold text-foreground">
          Keranjang Saya
        </h5>
      </header>

      <div className="h-screen">
        <EmptyCart />
        {/* <div className="grid gap-4 pb-8">
          <CardCart />
          <CardCart />
          <CardCart />
        </div>

        <div className="sticky bottom-0 left-0 z-10 grid gap-2 bg-white py-6">
          <div className="flex items-end justify-between gap-2">
            <h4 className="text-[12px] font-medium text-foreground-600">
              Total Pembayaran
            </h4>
            <h4 className="font-semibold text-foreground">Rp 830.000</h4>
          </div>

          <Button
            color="primary"
            onClick={() => router.push("/purchase/checkout?id=17630837")}
            className="w-full font-semibold"
          >
            Beli
          </Button>
        </div> */}
      </div>
    </Layout>
  );
}
