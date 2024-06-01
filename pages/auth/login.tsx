import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Key } from "@phosphor-icons/react";
import Link from "next/link";

import Layout from "@/components/Layout";

export default function LoginPage() {
  return (
    <Layout title="Login Terlebih Dahulu!">
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
            Selamat Datang!
          </h4>
          <p className="text-sm leading-[180%] text-foreground-600">
            Sebelum berbelanja, harap untuk login dengan akun anda terlebih
            dahulu.
          </p>
        </div>

        <div className="grid gap-4">
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
            placeholder="Masukan email"
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
        </div>

        <div className="grid gap-4">
          <Button color="primary" className="font-semibold">
            Masuk
          </Button>

          <div className="inline-flex items-center justify-center gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Belum punya akun?
            </p>
            <Link
              href="/auth/register"
              className="text-sm font-bold text-primary"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
