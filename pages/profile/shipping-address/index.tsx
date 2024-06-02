import { Button, Input } from "@nextui-org/react";
import { CaretLeft, MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

export default function ShippingAddressPage() {
  const router = useRouter();

  return (
    <Layout title="Alamat Pengiriman">
      <div className="grid">
        <header className="grid h-20 grid-cols-[50px_1fr_50px] items-center">
          <Button
            isIconOnly
            variant="light"
            color="default"
            onClick={() => router.push("/profile")}
          >
            <CaretLeft weight="bold" size={24} />
          </Button>

          <h5 className="text-center text-[18px] font-semibold text-foreground">
            Alamat Pengiriman
          </h5>
        </header>

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
          placeholder="Cara alamat pengiriman"
        />

        <div className="mt-12 grid gap-8">
          <div className="grid place-items-center gap-4">
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

          <Button
            color="primary"
            startContent={<MapPin weight="bold" size={20} />}
            onClick={() => router.push("/profile/shipping-address/create")}
            className="font-semibold"
          >
            Tambah Alamat
          </Button>
        </div>
      </div>
    </Layout>
  );
}
