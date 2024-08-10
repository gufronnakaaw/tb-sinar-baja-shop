import Layout from "@/components/Layout";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Key } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Toast from "react-hot-toast";

export default function LoginPage() {
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const [input, setInput] = useState<{
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (!input.email || !input.password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [input]);

  async function handleLogin() {
    if (Object.keys(input).length < 2) return;

    const result = await signIn("credentials", {
      ...input,
      callbackUrl: "/",
    });

    if (result?.error) {
      const { error } = JSON.parse(result?.error);

      Toast.error(error.message);
    }
  }

  return (
    <Layout title="Login Terlebih Dahulu!">
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
            placeholder="Masukan email"
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
            }}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4">
          <Button
            color="primary"
            onClick={handleLogin}
            className="font-semibold"
            isDisabled={disabled}
          >
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
