import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import { shopAddress } from "@/data/app.data";
import { SuccessResponse } from "@/types/global.type";
import { Preview } from "@/types/preview.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { CaretLeft, MapPin, Truck } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import qs from "qs";

export default function PreviewPage({
  preview,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title="Preview Page">
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
          Preview Pesanan
        </h5>
      </header>

      <div className="grid gap-16">
        <div className="grid gap-6">
          <div className="grid gap-[12px]">
            <h3 className="text-sm font-semibold text-foreground">
              Informasi Pengiriman
            </h3>

            <div className="flex items-start gap-4">
              {preview.type == "pickup" ? (
                <MapPin weight="duotone" size={48} className="text-primary" />
              ) : (
                <Truck weight="duotone" size={48} className="text-primary" />
              )}

              <div>
                {preview.type == "pickup" ? (
                  <>
                    <h5 className="mb-1 text-[12px] font-semibold text-foreground">
                      Pesanan Diambil Sendiri
                    </h5>
                    <p className="text-[12px] font-medium text-foreground-600">
                      {shopAddress.address} - {shopAddress.phone}
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className="mb-1 text-[12px] font-semibold text-foreground">
                      Pesanan Diantar
                    </h5>
                    <p className="text-[12px] font-medium text-foreground-600">
                      {preview.address.nama_penerima} -{" "}
                      {preview.address.no_telpon}
                    </p>
                    <p className="text-[12px] font-medium text-foreground-600">
                      {preview.address.alamat_lengkap},{" "}
                      <span className="uppercase">
                        {preview.address.kecamatan}, {preview.address.kota},{" "}
                        {preview.address.provinsi}, {preview.address.kode_pos}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h3 className="text-sm font-semibold text-foreground">
              Metode Pembayaran{" "}
              <span className="text-[12px] font-medium text-foreground-600">
                (Transfer)
              </span>
            </h3>

            <div className="flex items-center justify-between gap-2">
              <div>
                <h6 className="text-[12px] font-medium text-foreground">
                  {preview.bank.bank}
                </h6>
                <p className="mt-1 text-[12px] font-medium text-foreground-600">
                  {preview.bank.no_rekening} a/n {preview.bank.atas_nama}
                </p>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-[12px]">
            <h4 className="font-semibold text-foreground">Daftar Pesanan</h4>

            <div className="grid gap-4">
              {preview.products.map((product) => {
                return <CardOrder {...product} key={product.kode_item} />;
              })}
            </div>
          </div>

          <div className="h-[1px] w-full border border-dashed border-foreground-200" />

          <div className="grid gap-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[12px] font-medium text-foreground-600">
                Subtotal Produk
              </h4>
              <h4 className="text-[12px] font-semibold text-foreground">
                {formatRupiah(preview.total)}
              </h4>
            </div>

            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[12px] font-medium text-foreground-600">
                Subtotal Ongkir
              </h4>
              <h4 className="text-[12px] font-semibold text-foreground">
                {preview.type == "pickup"
                  ? formatRupiah(preview.subtotal_ongkir)
                  : "Harus Menunggu Konfirmasi Admin"}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid gap-3 pb-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground">Total Pembayaran</h4>
            <h4 className="font-semibold text-foreground">
              {formatRupiah(preview.total)}
            </h4>
          </div>

          <Button
            color="primary"
            onClick={() => router.push("/purchase/payment")}
            className="w-full font-semibold"
          >
            Pesan ({preview.products.length} item)
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query, req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<Preview> = await fetcher({
    url: `/preview?${qs.stringify(query)}`,
    method: "GET",
    token,
  });

  return {
    props: {
      preview: response.data,
    },
  };
}) satisfies GetServerSideProps<{ preview: Preview }>;
