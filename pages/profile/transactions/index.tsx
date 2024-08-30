import EmptyTransaction from "@/components/EmptyTransaction";
import Layout from "@/components/Layout";
import CardTransaction from "@/components/card/CardTransaction";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { Transaction } from "@/types/transaction.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function TransactionsPage({
  transactions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Lihat Riwayat Transaksi Pembelian Baja Anda Dengan Mudah Dan Cepat.">
      <HeaderTitle
        path="/profile"
        label="Riwayat Transaksi"
        className="sticky left-0 top-0"
      />

      {transactions.length ? (
        <div className="grid gap-8 pb-8">
          <div className="grid gap-3">
            {transactions.map((item) => {
              return <CardTransaction key={item.transaksi_id} {...item} />;
            })}
          </div>

          {/* <p className="grid grid-cols-3 items-center text-center text-[10px] font-medium italic text-foreground-400">
            <div className="h-[1px] w-full rounded-full bg-foreground-200">
              Kembali ke atas!
            </div>
            <div className="h-[1px] w-full rounded-full bg-foreground-200"></div>
          </p> */}
        </div>
      ) : (
        <div className="flex justify-center pt-10">
          <EmptyTransaction />
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<Transaction[]> = await fetcher({
    url: "/transactions",
    method: "GET",
    token,
  });

  return {
    props: {
      transactions: response.data,
    },
  };
}) satisfies GetServerSideProps<{ transactions: Transaction[] }>;
