import CardCart from "@/components/card/CardCart";
import EmptyCart from "@/components/EmptyCart";
import HeaderTitle from "@/components/header/HeaderTitle";
import Layout from "@/components/Layout";
import { Cart } from "@/types/cart.type";
import { SuccessResponse } from "@/types/global.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as qs from "qs";
import useSWR from "swr";

export default function CartPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, mutate } = useSWR<SuccessResponse<Cart[]>>(
    {
      url: "/carts",
      method: "GET",
      token,
    },
    {
      revalidateOnFocus: false,
    },
  );
  const router = useRouter();

  if (isLoading) {
    return;
  }

  return (
    <Layout title="Keranjang Saya">
      <HeaderTitle
        path="/products"
        label="Keranjang Saya"
        className="sticky left-0 top-0"
      />

      <div className="min-h-screen">
        {data?.data.length ? (
          <div className="grid gap-4 pb-8">
            {data.data.map((cart) => (
              <CardCart {...{ cart, token, mutate }} key={cart.cart_id} />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>

      {data?.data.length ? (
        <div className="sticky bottom-0 left-0 z-50 w-full bg-white p-[8px_0_1.5rem_0]">
          <div className="mb-2 flex items-end justify-between">
            <h4 className="text-[12px] font-medium text-foreground-600">
              Total Pembayaran
            </h4>
            <h4 className="font-semibold text-foreground">
              {data.data.filter((cart) => cart.active).length == 0
                ? formatRupiah(0)
                : formatRupiah(
                    data?.data
                      .filter((cart) => cart.active)
                      .map((cart) => cart.qty * cart.harga_6)
                      .reduce((a, b) => a + b),
                  )}
            </h4>
          </div>

          <Button
            color="primary"
            onClick={() =>
              router.push(
                `/purchase/checkout?${qs.stringify(
                  {
                    carts: data.data
                      .filter((cart) => cart.active)
                      .map((cart) => cart.cart_id),
                  },
                  {
                    arrayFormat: "repeat",
                  },
                )}`,
              )
            }
            className="w-full font-semibold"
            isDisabled={data.data.filter((cart) => cart.active).length == 0}
          >
            Beli
          </Button>
        </div>
      ) : null}
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;
  return {
    props: {
      token,
    },
  };
}) satisfies GetServerSideProps<{ token: string }>;
