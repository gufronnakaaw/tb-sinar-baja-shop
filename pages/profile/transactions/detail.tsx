import Layout from "@/components/Layout";
import CardOrder from "@/components/card/CardOrder";
import HeaderTitle from "@/components/header/HeaderTitle";
import { shopAddress } from "@/data/app.data";
import { SuccessResponse } from "@/types/global.type";
import { TransactionDetail } from "@/types/transaction.type";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime, formatTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Chip } from "@nextui-org/react";
import { Bag } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function TransactionDetails({
  transaction,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title={`Transaksi ${transaction.transaksi_id}`}>
      <div className="grid gap-2">
        <HeaderTitle
          path="/profile/transactions"
          label={`Transaksi ${transaction.transaksi_id}`}
          className="sticky left-0 top-0"
        />

        <div className="grid divide-y-1.5 divide-dashed divide-foreground-200">
          <div className="flex flex-col items-center justify-center gap-2 pb-6">
            <div className="rounded-full bg-foreground-100 p-4">
              <Bag weight="bold" size={26} />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-semibold text-foreground">
                {transaction.nama_penerima}
              </p>
              <p className="text-[12px] text-foreground-600">
                {transaction.no_telpon}
              </p>
              <p className="text-[12px] text-foreground-600">
                {transaction.alamat_lengkap},{" "}
                <span className="uppercase">
                  {transaction.kecamatan}, {transaction.kota},{" "}
                  {transaction.provinsi}, {transaction.kode_pos}
                </span>
              </p>
            </div>
          </div>

          {transaction.type == "pickup" ? (
            <div className="grid gap-2 py-6">
              <h4 className="text-sm font-semibold text-foreground">Alamat</h4>

              <div>
                <h6 className="mb-1 text-[12px] font-semibold text-foreground">
                  TB Sinar Baja
                  <Chip
                    color="primary"
                    size="sm"
                    classNames={{
                      content: "font-medium text-[10px]",
                    }}
                    className="ml-2"
                  >
                    Ambil Sendiri
                  </Chip>
                </h6>
                <p className="text-[12px] font-medium text-foreground-600">
                  {shopAddress.address} - {shopAddress.phone}
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-2 py-6">
            <h4 className="text-sm font-semibold text-foreground">
              Daftar Pesanan
            </h4>

            <div className="grid gap-2">
              {transaction.products.map((product) => {
                return (
                  <CardOrder
                    {...{
                      image: [{ url: "" }],
                      harga: product.harga,
                      kategori: product.kategori,
                      kode_item: product.kode_item,
                      nama_produk_asli: product.nama_produk,
                      quantity: product.quantity,
                      subtotal_produk: product.subtotal_produk,
                    }}
                    key={product.kode_item}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid gap-2 py-6">
            <h4 className="text-sm font-semibold text-foreground">
              Rincian Transaksi
            </h4>

            <div className="grid grid-cols-2 items-center gap-2">
              <div className="grid gap-1 justify-self-start text-[12px] font-medium text-foreground-600">
                <p>ID Transaksi</p>
                <p>Metode Pembayaran</p>
                <p>Status</p>
                <p>Waktu</p>
                <p>Tanggal</p>
                <p>Subtotal Produk</p>
                <p>Subtotal Ongkir</p>
              </div>

              <div className="grid gap-1 justify-self-end text-[12px] font-medium text-foreground">
                <p>{transaction.transaksi_id}</p>
                <p className="capitalize">{transaction.payment.metode}</p>
                <Chip
                  variant="flat"
                  color={
                    transaction.status == "selesai" ? "success" : "default"
                  }
                  size="sm"
                  classNames={{
                    content: "text-[9px] capitalize font-medium",
                  }}
                >
                  {transaction.status}
                </Chip>
                <p>{formatTime(transaction.created_at)}</p>
                <p>{formatDateWithoutTime(transaction.created_at)}</p>
                <p>{formatRupiah(transaction.subtotal_produk)}</p>
                <p>{formatRupiah(transaction.subtotal_ongkir)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-2 pb-8 pt-6">
            <div className="flex items-end justify-between gap-2">
              <p className="text-[12px] font-medium text-foreground-600">
                Total
              </p>
              <h4 className="text-sm font-bold text-foreground">
                {formatRupiah(transaction.total)}
              </h4>
            </div>

            <Button
              variant="bordered"
              color="primary"
              onClick={() =>
                router.push(
                  `/purchase/payment?id=${encodeURIComponent(transaction.transaksi_id)}`,
                )
              }
              className="w-full font-semibold"
            >
              Pembayaran
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<TransactionDetail> = await fetcher({
    url: `/transactions/detail/${encodeURIComponent(query?.id as string)}`,
    method: "GET",
    token,
  });

  if (
    ["Menunggu balasan", "Menunggu konfirmasi anda"].includes(
      response.data.status,
    )
  ) {
    return {
      redirect: {
        destination: `/purchase/waiting?id=${encodeURIComponent(response.data.transaksi_id)}`,
      },
    };
  }

  return {
    props: {
      transaction: response.data,
    },
  };
}) satisfies GetServerSideProps<{
  transaction: TransactionDetail;
}>;
