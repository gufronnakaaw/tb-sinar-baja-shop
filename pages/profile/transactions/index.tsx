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
      <div className="grid gap-3">
        <HeaderTitle
          path="/profile"
          label="Riwayat Transaksi"
          className="sticky left-0 top-0"
        />

        {transactions.length ? (
          transactions.map((item) => {
            return <CardTransaction key={item.transaksi_id} {...item} />;
          })
        ) : (
          <EmptyTransaction />
        )}
      </div>
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
