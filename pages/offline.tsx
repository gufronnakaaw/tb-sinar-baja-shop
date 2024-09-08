import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function OfflinePage() {
  return (
    <Layout title="Toko Tutup!">
      <header className="z-50 flex h-20 items-center justify-center bg-white">
        <h5 className="text-center font-semibold text-foreground">
          Pemberitahuan
        </h5>
      </header>

      <div className="mt-8 grid gap-8">
        <div className="grid gap-6">
          <Image
            priority
            src="/img/warning-img.svg"
            alt="offline img"
            width={250}
            height={250}
            className="justify-self-center"
          />

          <div className="text-center">
            <h5 className="mb-2 text-lg font-semibold text-foreground">
              Toko Sedang Tutup!
            </h5>
            <p className="text-[12px] leading-[180%] text-foreground-600">
              Segala proses transaksi untuk sementara diberhentikan. Atas
              perhatiannya kami ucapkan terima kasih.
            </p>

            <Button
              color="primary"
              onClick={() => (window.location.href = "/")}
              className="mt-4 w-full font-semibold"
            >
              Kembali ke halaman utama
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
