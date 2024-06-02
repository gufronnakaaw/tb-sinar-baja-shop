import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";

export default function EditShippingAddress() {
  const router = useRouter();

  return (
    <Layout title="Edit Alamat">
      <div className="grid gap-8">
        <HeaderTitle
          path="/profile/shipping-address"
          label="Edit Alamat"
          className="sticky left-0 top-0"
        />

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Informasi Penerima</h4>

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Nama Penerima"
            labelPlacement="outside"
            placeholder="Masukan nama penerima"
          />

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="No. Telpon Penerima"
            labelPlacement="outside"
            startContent={
              <span className="text-sm text-foreground-600">+62</span>
            }
            placeholder="eg, 8172684294"
          />
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Detail Alamat</h4>

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Label Alamat"
            labelPlacement="outside"
            placeholder="Cth. Alamat Rumah, Alamat Kantor"
          />

          <Textarea
            isRequired
            variant="bordered"
            color="default"
            maxRows={4}
            label="Alamat Lengkap"
            labelPlacement="outside"
            placeholder="Masukan nama jalan, no. rumah, dan lain sebagainya"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Kecamatan, Kota, Provinsi"
            labelPlacement="outside"
            placeholder="Cth. Limo, Depok, Jawa Barat"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Kode Pos"
            labelPlacement="outside"
            placeholder="Cth. 16512"
          />

          <Checkbox
            color="primary"
            classNames={{
              label: "text-sm text-foreground",
            }}
          >
            Jadikan Alamat Utama
          </Checkbox>
        </div>

        <div className="sticky bottom-0 left-0 z-50 bg-white py-4">
          <Button
            color="primary"
            onClick={() => {
              if (confirm("Apakah kamu yakin?")) {
                window.location.href = "/profile/shipping-address";
              }
            }}
            className="w-full font-semibold"
          >
            Simpan Alamat
          </Button>
        </div>
      </div>
    </Layout>
  );
}
