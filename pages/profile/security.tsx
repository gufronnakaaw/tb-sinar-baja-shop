import { Button, Input } from "@nextui-org/react";
import { Key } from "@phosphor-icons/react";

import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";

export default function ChangePasswordPage() {
  return (
    <Layout title="Ubah Kata Sandi">
      <div className="grid gap-8">
        <HeaderTitle path="/profile" label="Ubah Kata Sandi" />

        <div className="grid gap-4">
          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Kata Sandi Lama"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan kata sandi lama"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Kata Sandi Baru"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan kata sandi baru"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Konfirmasi Kata Sandi Baru"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Konfirmasi kata sandi baru"
          />
        </div>

        <Button
          color="primary"
          onClick={() => {
            if (confirm("Apakah kamu yakin?")) {
              window.location.href = "/profile";
            }
          }}
          className="font-semibold"
        >
          Simpan Kata Sandi
        </Button>
      </div>
    </Layout>
  );
}
