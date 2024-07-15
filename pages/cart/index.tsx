import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { AppContext } from "@/context/AppContext";
import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function CartPage() {
  const router = useRouter();
  const ctx = useContext(AppContext);

  return (
    <Layout title="Keranjang Saya">
      <header className="sticky left-0 top-0 z-50 grid h-20 items-center bg-white">
        <h5 className="text-center font-semibold text-foreground">
          Keranjang Saya
        </h5>
      </header>

      <div className="h-[calc(100%-6rem)]">
        <div className="mt-16 flex flex-col items-center gap-8">
          <Image
            priority
            as={NextImage}
            src="/img/empty-box.svg"
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
        </div>
      </div>

      <Navbar />
    </Layout>
  );
}
