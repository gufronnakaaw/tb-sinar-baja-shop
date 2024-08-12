import CardCart from "@/components/card/CardCart";
import EmptyCart from "@/components/EmptyCart";
import Layout from "@/components/Layout";
import { Cart } from "@/types/cart.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { CaretLeft } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function CartPage({
  carts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title="Keranjang Saya">
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
          Keranjang Saya
        </h5>
      </header>

      <div className="h-screen">
        {carts.length ? (
          <div className="grid gap-4 pb-8">
            {carts.map((cart) => (
              <CardCart {...cart} key={cart.cart_id} />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}

        {carts.length ? (
          <div className="absolute bottom-0 left-0 z-10 grid w-full gap-2 bg-white px-6 py-6">
            <div className="flex items-end justify-between gap-2">
              <h4 className="text-[12px] font-medium text-foreground-600">
                Total Pembayaran
              </h4>
              <h4 className="font-semibold text-foreground">
                {formatRupiah(
                  carts
                    .filter((cart) => cart.active)
                    .map((cart) => cart.qty * cart.harga_6)
                    .reduce((a, b) => a + b),
                )}
              </h4>
            </div>

            <Button
              color="primary"
              onClick={() => router.push("/purchase/checkout?id=17630837")}
              className="w-full font-semibold"
            >
              Beli
            </Button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<Cart[]> = await fetcher({
    url: "/carts",
    method: "GET",
    token,
  });

  return {
    props: {
      carts: response.data,
    },
  };
}) satisfies GetServerSideProps<{ carts: Cart[] }>;
