import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";

export default function EditUserProfilePage() {
  return (
    <Layout title="Edit Profile Page" className="relative">
      <div className="grid">
        <div className="sticky left-0 top-0 z-10 grid gap-1 bg-white pb-4">
          <HeaderTitle path="/profile/detail" label="Edit Profil" />
        </div>

        <div className="grid gap-8">
          <div className="grid gap-4">
            <h4 className="font-semibold text-foreground">Biodata Diri</h4>

            <Input
              isRequired
              variant="bordered"
              color="default"
              label="Nama Lengkap"
              labelPlacement="outside"
              placeholder="eg, Maman Kusniadi"
            />

            <Input
              isRequired
              variant="bordered"
              color="default"
              label="Tanggal Lahir"
              labelPlacement="outside"
              placeholder="eg, 12 Januari 1999"
            />

            <RadioGroup
              isRequired
              label="Jenis Kelamin"
              classNames={{
                label: "text-sm text-foreground",
              }}
            >
              <Radio value="man">Pria</Radio>
              <Radio value="woman">Wanita</Radio>
            </RadioGroup>
          </div>

          <div className="grid gap-4">
            <h4 className="font-semibold text-foreground">Kontak</h4>

            <Input
              isRequired
              type="email"
              variant="bordered"
              color="default"
              label="Email"
              labelPlacement="outside"
              placeholder="eg, maman.kusniadi@mail.com"
            />

            <Input
              isRequired
              type="number"
              variant="bordered"
              color="default"
              label="Nomor HP"
              labelPlacement="outside"
              placeholder="eg, 08XXXXXXXXXX"
            />
          </div>

          <Button
            color="primary"
            onClick={() => (window.location.href = "/products")}
            className="font-semibold"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </Layout>
  );
}
