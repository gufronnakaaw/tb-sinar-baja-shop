import Layout from "@/components/Layout";
import CardCart from "@/components/card/CardCart";
import HeaderTitle from "@/components/header/HeaderTitle";
import { AppContext } from "@/context/AppContext";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function CartPage() {
  const router = useRouter();
  const ctx = useContext(AppContext);

  return (
    <Layout title="Keranjang Saya">
      <HeaderTitle
        path="/products"
        label="Keranjang Saya"
        className="sticky left-0 top-0"
      />

      <div className="h-screen">
        {/* <div className="mt-16 flex flex-col items-center gap-8">
          <Image
            priority
            as={NextImage}
            src="/img/empty-cart-img.svg"
            alt="empty box img"
            width={192}
            height={192}
          />

          <div className="grid justify-items-center gap-4">
            <div className="text-center">
              <h4 className="mx-auto mb-1 max-w-[230px] font-semibold text-foreground">
                Oppsss... keranjang kamu masih kosong
              </h4>
              <p className="text-[12px] font-medium text-foreground-600">
                Cari, pesan, dan terima pesanan yang kamu suka.
              </p>
            </div>

            <Button
              variant="solid"
              color="primary"
              className="w-max font-semibold"
              onClick={() => ctx?.onOpenUnauthenticated()}
            >
              Mulai Belanja
            </Button>
          </div>
        </div> */}

        <div className="grid gap-4 pb-8">
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
        </div>
      </div>
    </Layout>
  );
}
