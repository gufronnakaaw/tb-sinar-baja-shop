import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { ProfileDetail } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function EditUserProfilePage({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Edit Profile Page" className="relative">
      <div className="grid">
        <div className="sticky left-0 top-0 z-10 grid gap-1 bg-white pb-4">
          <HeaderTitle path="/profile/detail" label="Edit Profil" />
        </div>

        <div className="grid gap-8">
          <div className="grid gap-4">
            <h4 className="text-sm font-semibold text-foreground">
              Biodata Diri
            </h4>

            <Input
              value={profile.nama}
              isRequired
              variant="bordered"
              color="default"
              label="Nama Lengkap"
              labelPlacement="outside"
              placeholder="Cth. Johnson Doe"
              classNames={{
                label: "text-[12px]",
              }}
            />

            <Input
              variant="bordered"
              color="default"
              label="Tanggal Lahir"
              labelPlacement="outside"
              placeholder="Cth. 12 Januari 1999"
              classNames={{
                label: "text-[12px]",
              }}
            />

            <RadioGroup
              label="Jenis Kelamin"
              classNames={{
                label: "text-[12px] text-foreground",
              }}
            >
              <Radio
                value="P"
                classNames={{
                  label: "text-[14px]",
                }}
              >
                Pria
              </Radio>
              <Radio
                value="W"
                classNames={{
                  label: "text-[14px]",
                }}
              >
                Wanita
              </Radio>
            </RadioGroup>
          </div>

          <div className="grid gap-4">
            <h4 className="text-sm font-semibold text-foreground">Kontak</h4>

            <Input
              value={profile.email}
              isDisabled
              type="email"
              variant="bordered"
              color="default"
              label="Email"
              labelPlacement="outside"
              placeholder="eg, maman.kusniadi@mail.com"
              classNames={{
                label: "text-[12px]",
              }}
            />

            <Input
              value={profile.no_telpon}
              type="number"
              variant="bordered"
              color="default"
              label="Nomor HP"
              labelPlacement="outside"
              placeholder="eg, 08XXXXXXXXXX"
              classNames={{
                label: "text-[12px]",
              }}
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

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<ProfileDetail> = await fetcher({
    url: "/profile/detail",
    method: "GET",
    token,
  });

  return {
    props: {
      profile: response.data,
    },
  };
}) satisfies GetServerSideProps<{ profile: ProfileDetail }>;
