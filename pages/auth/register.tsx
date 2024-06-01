import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Key, Phone, User } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <Layout title="Daftar Sekarang!">
      <div className="grid gap-8 pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 justify-self-center"
        >
          <div className="h-8 w-8 rounded-full bg-primary" />
          <h5 className="text-[20px] font-bold text-foreground">
            TB Sinar Baja
          </h5>
        </Link>

        <div className="grid gap-1">
          <h4 className="text-[20px] font-bold text-foreground">
            Hi, Salam Kenal!
          </h4>
          <p className="text-sm leading-[180%] text-foreground-600">
            Daftar sekarang untuk kemudahan belanja baja: cepat, aman, dan
            layanan pelanggan terbaik!
          </p>
        </div>

        <div className="grid gap-4">
          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Nama Lengkap"
            labelPlacement="outside"
            endContent={
              <User weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="eg, Maman Kusniadi"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Email"
            labelPlacement="outside"
            endContent={
              <EnvelopeSimple
                weight="bold"
                size={18}
                className="text-foreground-400"
              />
            }
            placeholder="eg, maman.kusniadi@mail.com"
          />

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="No. Telpon Pengguna"
            labelPlacement="outside"
            startContent={
              <span className="text-sm text-foreground-600">+62</span>
            }
            endContent={
              <Phone weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="eg, 8172684294"
            className="gap-10"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Kata Sandi"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan kata sandi"
          />

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Konformasi Kata Sandi"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan konfirmasi kata sandi"
          />
        </div>

        <div className="grid gap-4">
          <Button
            color="primary"
            onClick={() => router.push("/")}
            className="font-semibold"
          >
            Daftar Sekarang
          </Button>

          <div className="inline-flex items-center justify-center gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Sudah punya akun?
            </p>
            <Link href="/auth/login" className="text-sm font-bold text-primary">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
