import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { ProfileDetail } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { PencilLine } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UserProfilePage({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title="User Profile Page" className="relative">
      <div className="grid">
        <div className="sticky left-0 top-0 z-10 grid gap-1 bg-white pb-4">
          <HeaderTitle path="/profile" label="Profil Pengguna" />
        </div>

        <div className="grid gap-8">
          <Image
            priority
            src="/img/avatar.svg"
            alt="avatar"
            width={82}
            height={82}
            className="justify-self-center"
          />

          {/* <div className="grid grid-cols-[24px_1fr] items-start gap-2 rounded-xl border-[2px] border-primary bg-primary/20 p-4">
            <WarningCircle
              weight="duotone"
              size={24}
              className="text-primary"
            />

            <p className="text-sm font-medium italic text-primary">
              Harap lengkapi data diri anda, sebelum anda mulai berbelanja!
            </p>
          </div> */}

          <div className="grid gap-2">
            <h4 className="font-semibold text-foreground">Biodata Diri</h4>

            <div className="grid grid-cols-[130px_1fr] items-center">
              <div className="grid gap-2">
                <h6 className="text-sm font-medium text-foreground-600">
                  Nama
                </h6>
                <h6 className="text-sm font-medium text-foreground-600">
                  Tanggal Lahir
                </h6>
                <h6 className="text-sm font-medium text-foreground-600">
                  Jenis Kelamin
                </h6>
              </div>

              <div className="grid gap-2">
                <p className="text-sm font-medium text-foreground">
                  {profile.nama}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {profile.tanggal_lahir ? profile.tanggal_lahir : "-"}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {profile.jenis_kelamin ? profile.jenis_kelamin : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h4 className="font-semibold text-foreground">Kontak</h4>

            <div className="grid grid-cols-[130px_1fr] items-center">
              <div className="grid gap-2">
                <h6 className="text-sm font-medium text-foreground-600">
                  Email
                </h6>
                <h6 className="text-sm font-medium text-foreground-600">
                  Nomor HP
                </h6>
              </div>

              <div className="grid gap-2">
                <p className="text-sm font-medium text-foreground">
                  {profile.email}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {profile.no_telpon}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="bordered"
            color="primary"
            startContent={<PencilLine weight="duotone" size={18} />}
            onClick={() => router.push("/profile/edit")}
            className="font-semibold"
          >
            Edit Profil
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
