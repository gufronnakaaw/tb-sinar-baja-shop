import { Button } from "@nextui-org/react";
import {
  Key,
  MapTrifold,
  Receipt,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  return (
    <Layout title="Kelola Informasi Profil Dan Pengaturan Akun Anda.">
      <Navbar />

      <div className="grid gap-8 py-8">
        <div className="inline-flex items-center gap-4">
          <Image
            src="/img/avatar.svg"
            alt="avatar"
            width={48}
            height={48}
            priority
          />

          <div>
            <h6 className="font-semibold text-foreground">Johnson Doe</h6>
            <p className="text-[12px] font-medium text-foreground-600">
              johnsondoe@mail.com
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <h4 className="text-sm font-semibold text-foreground">Pesanan</h4>

          <Link
            href="/profile/transactions"
            className="group flex items-center gap-4"
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

              <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-danger">
                <p className="text-sm text-white">5</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid gap-2">
          <h4 className="text-sm font-semibold text-foreground">Akun</h4>

          <div className="grid gap-6">
            <Link
              href="/profile/user"
              className="group flex items-center gap-4"
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
              href="/profile/change-password"
              className="group flex items-center gap-4"
            >
              <Key
                weight="duotone"
                size={24}
                className="text-foreground-600 group-hover:text-primary"
              />

              <div>
                <h6 className="text-sm font-semibold text-foreground group-hover:text-primary">
                  Ubah Kata Sandi
                </h6>
                <p className="text-[12px] font-medium text-foreground-600 group-hover:text-foreground-400">
                  Atur ulang kata sandi
                </p>
              </div>
            </Link>

            <Link
              href="/profile/shipping-address"
              className="group flex items-center gap-4"
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
          onClick={() => {
            if (confirm("Apakah kamu yakin?")) {
              window.location.href = "/auth/login";
            }
          }}
          className="font-semibold"
        >
          Keluar Akun
        </Button>
      </div>
    </Layout>
  );
}
