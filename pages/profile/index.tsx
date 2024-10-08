import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { SuccessResponse } from "@/types/global.type";
import { Profile } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Chip } from "@nextui-org/react";
import {
  MapTrifold,
  Receipt,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Kelola Informasi Profil Dan Pengaturan Akun Anda.">
      <div className="h-[calc(100vh-96px)] pt-8">
        <div className="grid gap-8">
          <div className="inline-flex items-center gap-4">
            <Image
              src="/img/avatar.svg"
              alt="avatar"
              width={48}
              height={48}
              priority
            />

            <div>
              <h6 className="text-sm font-semibold text-foreground">
                {profile.nama}
              </h6>
              <p className="text-[12px] font-medium text-foreground-600">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <h4 className="text-sm font-semibold text-foreground">Pesanan</h4>

            <Link
              href="/profile/transactions"
              className="group grid grid-cols-[24px_1fr] items-center gap-4"
            >
              <Receipt
                weight="duotone"
                size={24}
                className="text-foreground-600 group-hover:text-primary"
              />

              <div className="flex w-full items-center justify-between">
                <div>
                  <h6 className="text-sm font-semibold text-foreground group-hover:text-primary">
                    Daftar Transaksi
                  </h6>
                  <p className="text-[12px] font-medium text-foreground-600 group-hover:text-foreground-400">
                    Lihat semua riwayat transaksi anda
                  </p>
                </div>

                <Chip
                  size="sm"
                  variant="solid"
                  color="danger"
                  classNames={{
                    content: "font-medium",
                  }}
                >
                  {profile.total_transaction}
                </Chip>
              </div>
            </Link>
          </div>

          <div className="grid gap-2">
            <h4 className="text-sm font-semibold text-foreground">Akun</h4>

            <div className="grid gap-4">
              <Link
                href="/profile/detail"
                className="group grid grid-cols-[24px_1fr] items-center gap-4"
              >
                <UserCircle
                  weight="duotone"
                  size={24}
                  className="text-foreground-600 group-hover:text-primary"
                />

                <div>
                  <h6 className="text-sm font-semibold text-foreground group-hover:text-primary">
                    Profil Pengguna
                  </h6>
                  <p className="text-[12px] font-medium text-foreground-600 group-hover:text-foreground-400">
                    Ubah informasi diri anda
                  </p>
                </div>
              </Link>

              <Link
                href="/profile/address"
                className="group grid grid-cols-[24px_1fr] items-center gap-4"
              >
                <MapTrifold
                  weight="duotone"
                  size={24}
                  className="text-foreground-600 group-hover:text-primary"
                />

                <div>
                  <h6 className="text-sm font-semibold text-foreground group-hover:text-primary">
                    Alamat Pengiriman
                  </h6>
                  <p className="text-[12px] font-medium text-foreground-600 group-hover:text-foreground-400">
                    Tambah & hapus alamat pengiriman anda
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <Button
            variant="flat"
            color="danger"
            startContent={
              <SignOut weight="duotone" size={24} className="text-danger" />
            }
            onClick={async () => {
              if (confirm("Apakah kamu yakin?")) {
                await signOut({
                  callbackUrl: "/",
                });
              }
            }}
            className="font-semibold"
          >
            Keluar Akun
          </Button>
        </div>
      </div>

      <Navbar />
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<Profile> = await fetcher({
    url: "/profile",
    method: "GET",
    token,
  });

  return {
    props: {
      profile: response.data,
    },
  };
}) satisfies GetServerSideProps<{ profile: Profile }>;
