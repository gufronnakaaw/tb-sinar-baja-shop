import { Button, Input } from "@nextui-org/react";
import { CaretLeft, Key } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

export default function ChangePasswordPage() {
  const router = useRouter();

  return (
    <Layout title="Ubah Kata Sandi">
      <div className="grid gap-8">
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
            Ubah Kata Sandi
          </h5>
        </header>

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
