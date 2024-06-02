import { Button } from "@nextui-org/react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

export default function CreateShippingAddress() {
  const router = useRouter();

  return (
    <Layout title="Tambah Alamat">
      <div className="grid gap-12">
        <header className="grid h-20 grid-cols-[50px_1fr_50px] items-center">
          <Button
            isIconOnly
            variant="light"
            color="default"
            onClick={() => router.push("/profile/shipping-address")}
          >
            <CaretLeft weight="bold" size={24} />
          </Button>

          <h5 className="text-center text-[18px] font-semibold text-foreground">
            Tambah Alamat
          </h5>
        </header>

        <div>form</div>
      </div>
    </Layout>
  );
}
