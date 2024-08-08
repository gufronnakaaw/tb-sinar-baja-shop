import { Button, Input } from "@nextui-org/react";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import CardAddress from "@/components/card/CardAddress";

// dummy data
import { my_address } from "@/_dummy/my-address";
import HeaderTitle from "@/components/header/HeaderTitle";

export default function ShippingAddressPage() {
  const router = useRouter();

  return (
    <Layout title="Alamat Pengiriman" className="relative">
      <div className="grid">
        <div className="sticky left-0 top-0 z-10 grid gap-1 bg-white pb-4">
          <HeaderTitle path="/profile" label="Alamat Pengiriman" />

          <Input
            isRequired
            variant="bordered"
            color="default"
            labelPlacement="outside"
            startContent={
              <MagnifyingGlass
                weight="duotone"
                size={18}
                className="text-foreground-400"
              />
            }
            placeholder="Cari alamat pengiriman"
          />
        </div>

        <div className="grid gap-4 overflow-scroll">
          {my_address.length < 1 ? (
            <div className="mt-12 grid place-items-center gap-4">
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
                  Tambahkan alamat pengiriman untuk memudahkan Anda dalam
                  menghitung estimasi biaya pengiriman
                </p>
              </div>
            </div>
          ) : null}

          {my_address.map((address, index) => (
            <CardAddress key={index} address={address} />
          ))}
        </div>

        <div className="sticky bottom-0 left-0 bg-white py-4">
          <Button
            color="primary"
            startContent={<MapPin weight="bold" size={20} />}
            onClick={() => router.push("/profile/address/create")}
            className="w-full font-semibold"
          >
            Tambah Alamat
          </Button>
        </div>
      </div>
    </Layout>
  );
}
