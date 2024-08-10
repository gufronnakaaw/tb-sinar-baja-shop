import Layout from "@/components/Layout";
import { fetcher } from "@/utils/fetcher";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Key, Phone, User } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [input, setInput] = useState<{
    nama?: string;
    email?: string;
    no_telpon?: string;
    password?: string;
    password_confirm?: string;
  }>({});
  const [disabled, setDisabled] = useState(true);

  async function handleRegister() {
    try {
      const data = await fetcher({
        url: "/auth/register/users",
        method: "POST",
        data: input,
      });

      await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });

      return router.push("/profile/address/create?from=register");
    } catch (error) {
      Toast.error("Terjadi kesalahan saat registrasi");
      console.log(error);
    }
  }

  return (
    <Layout title="Daftar Sekarang!">
      <div className="grid gap-8 py-24">
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
            placeholder="Cth. Johnson Doe"
            name="nama"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />

          <Input
            isRequired
            type="email"
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
            placeholder="Cth. johnson.doe@mail.com"
            name="email"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="No. Telpon Pengguna"
            labelPlacement="outside"
            endContent={
              <Phone weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Cth. 081122334455"
            className="gap-10"
            name="no_telpon"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />

          <Input
            isRequired
            type="password"
            variant="bordered"
            color="default"
            label="Kata Sandi"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan kata sandi"
            name="password"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });

              if (e.target.value != input.password_confirm) {
                setDisabled(true);
              } else {
                setDisabled(false);
              }
            }}
            autoComplete="off"
          />

          <Input
            isRequired
            type="password"
            variant="bordered"
            color="default"
            label="Konfirmasi Kata Sandi"
            labelPlacement="outside"
            endContent={
              <Key weight="bold" size={18} className="text-foreground-400" />
            }
            placeholder="Masukan konfirmasi kata sandi"
            name="password_confirm"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });

              if (e.target.value != input.password) {
                setDisabled(true);
              } else {
                setDisabled(false);
              }
            }}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4">
          <Button
            color="primary"
            onClick={handleRegister}
            className="font-semibold"
            isDisabled={disabled}
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
