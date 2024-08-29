import Layout from "@/components/Layout";
import PopupPaymentConfirm from "@/components/popup/PopupPaymentConfirm";
import { Button, Snippet, Tab, Tabs } from "@nextui-org/react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function OrderPage() {
  const router = useRouter();

  const tabs = [
    {
      id: "m-banking",
      label: "Transfer Via M-Banking",
      guides: [
        {
          id: 1,
          text: "Buka Aplikasi M-Banking",
        },
        {
          id: 2,
          text: `Pilih menu "Transfer" atau "Transfer Dana"`,
        },
        {
          id: 3,
          text: `Pilih tujuan transfer. Jika transfer ke rekening bank lain, pilih 'Antar Bank' atau "Transfer ke Bank Lain". Jika ke sesama bank, pilih "Transfer Sesama Bank"`,
        },
        {
          id: 4,
          text: "Ketik nomor rekening tujuan dengan benar",
        },
        {
          id: 5,
          text: "Isi nominal uang yang mau ditransfer dan pastikan semua informasi seperti nomor rekening dan jumlah transfer sudah benar",
        },
        {
          id: 6,
          text: `Klik "Lanjut" atau "Kirim", kemudian masukkan PIN m-banking kamu"`,
        },
        {
          id: 7,
          text: "Setelah transfer berhasil, simpan bukti transfer untuk melakukan konfirmasi",
        },
      ],
    },
    {
      id: "atm",
      label: "Transfer Via ATM",
      guides: [
        {
          id: 1,
          text: "Kunjungi ATM bank kamu atau ATM yang mendukung jaringan bersama",
        },
        {
          id: 2,
          text: "Masukkan kartu ATM, pilih bahasa yang kamu inginkan dan ketikan PIN ATM kamu",
        },
        {
          id: 3,
          text: `Pilih menu "Transfer" atau "Transfer Dana"`,
        },
        {
          id: 4,
          text: `Pilih tujuan transfer. Jika transfer ke rekening bank lain, pilih "Antar Bank" atau "Transfer ke Bank Lain". Jika ke sesama bank, pilih "Transfer Sesama Bank"`,
        },
        {
          id: 5,
          text: "Ketik nomor rekening tujuan dengan benar",
        },
        {
          id: 6,
          text: "Isi nominal uang yang mau ditransfer dan pastikan semua informasi seperti nomor rekening dan jumlah transfer sudah benar",
        },
        {
          id: 7,
          text: `Klik "Lanjut" atau "Kirim", kemudian masukkan PIN m-banking kamu"`,
        },
        {
          id: 8,
          text: "Setelah transfer berhasil, ambil kartu ATM kamu yang keluar dari mesin dan simpan bukti transfer untuk melakukan konfirmasi",
        },
      ],
    },
  ];

  return (
    <Layout title="Payment Page">
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
          Pembayaran
        </h5>
      </header>

      <div className="grid divide-y-1.5 divide-dashed divide-foreground-200">
        <div className="grid gap-2 pb-6">
          <h3 className="text-sm font-semibold text-foreground">
            Metode Pembayaran
          </h3>

          <div className="grid gap-[2px] rounded-xl border border-foreground-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-sm font-semibold text-foreground">
                BCA - a/n TB. Sinar Baja
              </h6>

              <p className="text-[12px] font-medium text-primary">
                Transfer Bank
              </p>
            </div>

            <Snippet
              symbol=""
              variant="bordered"
              className="w-full"
              classNames={{
                base: "text-foreground border-none p-0",
                pre: "font-semibold text-foreground font-sans text-[14px]",
              }}
            >
              0192847621
            </Snippet>
          </div>
        </div>

        <div className="grid gap-2 py-6">
          <h3 className="text-sm font-semibold text-foreground">
            Rincian Pembayaran
          </h3>

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

            <p className="mt-2 rounded-xl border border-primary bg-primary-50 px-4 py-2 text-[12px] font-medium italic text-primary">
              <span className="font-bold text-primary">Catatan:</span> Harap
              transfer sesuai total pembayaran untuk mempercepat proses
              verifikasi.
            </p>
          </div>
        </div>

        <div className="grid gap-2 py-6">
          <h3 className="text-sm font-semibold text-foreground">
            Panduan Pembayaran
          </h3>

          <Tabs
            aria-label="tabs payment guide"
            items={tabs}
            size="sm"
            color="primary"
            radius="full"
            classNames={{
              base: "font-medium",
            }}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <div className="grid gap-2">
                  {item.guides.map((guide) => (
                    <div
                      key={guide.id}
                      className="grid grid-cols-[24px_1fr] items-start gap-2"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[12px] font-semibold text-white">
                        {guide.id}
                      </div>
                      <p className="text-[12px] leading-[165%] text-foreground-600">
                        {guide.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Tab>
            )}
          </Tabs>
        </div>

        <div className="grid gap-2 pb-8 pt-6">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[12px] font-medium text-foreground-600">
              Total Pembayaran
            </h4>
            <h4 className="font-semibold text-foreground">Rp 830.000</h4>
          </div>

          <Button
            variant="solid"
            color="primary"
            className="w-full font-semibold"
            onClick={() => router.push("/profile/transactions/detail")}
          >
            Detail Pesanan Saya
          </Button>

          <PopupPaymentConfirm />
        </div>
      </div>
    </Layout>
  );
}
