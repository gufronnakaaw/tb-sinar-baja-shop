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

      <div className="grid gap-12 py-12">
        <div className="inline-flex items-center gap-4">
          <Image
            src="/avatar.svg"
            alt="avatar"
            width={64}
            height={64}
            priority
          />

          <div>
            <h6 className="text-[18px] font-semibold text-foreground">
              Fajar Fadillah Agustian
            </h6>
            <p className="text-[12px] font-medium text-foreground-600">
              fajarfadillah@gmail.com
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Pesanan</h4>

          <Link
            href="/profile/transactions"
            className="group flex items-center gap-4"
          >
            <Receipt
              weight="duotone"
              size={28}
              className="text-foreground-600 group-hover:text-primary"
            />

            <div>
              <h6 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                Daftar Transaksi
              </h6>
              <p className="text-sm font-medium text-foreground-600 group-hover:text-foreground-400">
                Lihat semua riwayat transaksi anda
              </p>
            </div>
          </Link>
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Akun</h4>

          <div className="grid gap-8">
            <Link href="#" className="group flex items-center gap-4">
              <UserCircle
                weight="duotone"
                size={28}
                className="text-foreground-600 group-hover:text-primary"
              />

              <div>
                <h6 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                  Profil Pengguna
                </h6>
                <p className="text-sm font-medium text-foreground-600 group-hover:text-foreground-400">
                  Ubah informasi diri anda
                </p>
              </div>
            </Link>

            <Link href="#" className="group flex items-center gap-4">
              <Key
                weight="duotone"
                size={28}
                className="text-foreground-600 group-hover:text-primary"
              />

              <div>
                <h6 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                  Ubah Kata Sandi
                </h6>
                <p className="text-sm font-medium text-foreground-600 group-hover:text-foreground-400">
                  Atur ulang kata sandi
                </p>
              </div>
            </Link>

            <Link href="#" className="group flex items-center gap-4">
              <MapTrifold
                weight="duotone"
                size={28}
                className="text-foreground-600 group-hover:text-primary"
              />

              <div>
                <h6 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                  Alamat Pengiriman
                </h6>
                <p className="text-sm font-medium text-foreground-600 group-hover:text-foreground-400">
                  Tambah & hapus alamat pengiriman anda
                </p>
              </div>
            </Link>
          </div>
        </div>

        <Button
          variant="flat"
          color="danger"
          size="lg"
          startContent={
            <SignOut weight="duotone" size={28} className="text-danger" />
          }
          className="font-semibold"
        >
          Keluar Akun
        </Button>
      </div>
    </Layout>
  );
}
