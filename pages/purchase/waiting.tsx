import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { TransactionWaiting } from "@/types/transaction.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Toast from "react-hot-toast";

export default function WaitingPage({
  transaction,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (
    !["Menunggu balasan", "Menunggu konfirmasi anda"].includes(
      transaction.status,
    )
  ) {
    return router.push(
      `/purchase/payment?id=${encodeURIComponent(transaction.transaksi_id)}`,
    );
  }

  async function handleConfirm() {
    try {
      await fetcher({
        url: "/transactions/draft",
        method: "PATCH",
        token,
        data: {
          transaksi_id: transaction.transaksi_id,
          total: transaction.total + transaction.subtotal_ongkir,
        },
      });

      router.push(
        `/purchase/payment?id=${encodeURIComponent(transaction.transaksi_id)}`,
      );
    } catch (error) {
      console.log(error);

      Toast.error("Terjadi kesalahan saat update transaksi");
    }
  }

  async function handleCancel() {}

  return (
    <Layout title="Waiting Page">
      <HeaderTitle
        path="/profile/transactions"
        label="Menunggu Konfirmasi"
        className="sticky left-0 top-0"
      />

      <div className="mt-8 grid gap-8">
        <div className="grid gap-4">
          <Image
            priority
            src="/img/waiting-img.svg"
            alt="waiting img"
            width={200}
            height={200}
            className="justify-self-center"
          />

          <div className="text-center">
            <h5 className="mb-1 text-sm font-semibold text-foreground">
              Menunggu Konfirmasi Admin
            </h5>
            <p className="max-w-[] text-[12px] leading-[180%] text-foreground-600">
              Mohon untuk menunggu konfirmasi dari admin mengenai biaya
              pengiriman. Proses ini akan memakan waktu paling lambat{" "}
              <span className="font-bold text-primary">1x24 jam</span>.
            </p>
          </div>
        </div>

        <div className="grid gap-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-foreground-600">Subtotal Produk</p>
            <h5 className="text-[12px] font-semibold text-foreground">
              {formatRupiah(transaction.subtotal_produk)}
            </h5>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-foreground-600">Subtotal Ongkir</p>
            <h5 className="text-[12px] font-semibold text-foreground">
              {formatRupiah(transaction.subtotal_ongkir)}
            </h5>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] text-foreground-600">Total</p>
            <h5 className="text-[12px] font-semibold text-foreground">
              {formatRupiah(transaction.total + transaction.subtotal_ongkir)}
            </h5>
          </div>
        </div>

        <div className="grid gap-2">
          <Button
            color="primary"
            onClick={handleConfirm}
            className="font-semibold"
            isDisabled={!transaction.replied}
          >
            Lanjut Pembayaran
          </Button>

          <Button
            color="primary"
            variant="bordered"
            onClick={handleCancel}
            className="font-semibold"
            isDisabled={!transaction.replied}
          >
            Batalkan
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<TransactionWaiting> = await fetcher({
    url: `/waiting?id=${encodeURIComponent(query?.id as string)}`,
    method: "GET",
    token,
  });

  return {
    props: {
      transaction: response.data,
      token,
    },
  };
}) satisfies GetServerSideProps<{
  transaction: TransactionWaiting;
  token: string;
}>;
