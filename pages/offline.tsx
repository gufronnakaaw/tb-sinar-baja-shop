import Layout from "@/components/Layout";
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
              Toko Sudah Tutup!
            </h5>
            <p className="text-[12px] leading-[180%] text-foreground-600">
              Proses pembelian dan transaksi akan otomatis dibatalkan untuk
              kenyamanan dan keamanan pelanggan. Atas kerjasamanya kami ucapkan
              terima kasih.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
