import Layout from "@/components/Layout";
import CardAddress from "@/components/card/CardAddress";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Address } from "@/types/address.type";
import { SuccessResponse } from "@/types/global.type";
import { Button } from "@nextui-org/react";
import { MapPin } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShippingAddressPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<SuccessResponse<Address[]>>(
    {
      url: "/profile/address",
      method: "GET",
      token,
    },
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading) {
    return;
  }

  return (
    <Layout title="Alamat Pengiriman" className="relative">
      <HeaderTitle
        path="/profile"
        label="Alamat Pengiriman"
        className="sticky left-0 top-0"
      />

      {!data?.data.length ? (
        <div className="mt-12 grid min-h-screen place-items-center gap-4">
          <Image
            priority
            src="/img/map.svg"
            alt="map img"
            width={200}
            height={200}
          />

          <div className="text-center">
            <h4 className="mb-1 text-[18px] font-semibold text-foreground">
              Belum Ada Alamat Pengiriman
            </h4>
            <p className="mx-auto max-w-[350px] text-sm font-medium leading-[180%] text-foreground-600">
              Tambahkan alamat pengiriman untuk memudahkan Anda dalam menghitung
              estimasi biaya pengiriman
            </p>
          </div>
        </div>
      ) : null}

      {data?.data.map((address, index) => {
        return (
          <div className="min-h-screen" key={address.address_id}>
            <div className="grid gap-4 overflow-scroll">
              <CardAddress {...{ address, mutate, token }} />
            </div>
          </div>
        )
      })}

      <div className="sticky bottom-0 left-0 z-50 h-20 w-full bg-white pt-2">
        <Button
          color="primary"
          startContent={<MapPin weight="bold" size={20} />}
          onClick={() => router.push("/profile/address/create")}
          className="w-full font-semibold"
        >
          Tambah Alamat
        </Button>
      </div>
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
