import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { Regional } from "@/types/regional.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import Toast from "react-hot-toast";

export default function CreateShippingAddress({
  provinces,
  from,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [provinceCode, setProvinceCode] = useState<Key>("");
  const [regencies, setRegencies] = useState<Regional[]>([]);
  const [regencyCode, setRegencyCode] = useState<Key>("");
  const [districts, setDistricts] = useState<Regional[]>([]);
  const [districtCode, setDistrictCode] = useState<Key>("");
  const [input, setInput] = useState<{
    nama_penerima: string;
    no_telpon: string;
    alamat_lengkap: string;
    label: string;
    kode_pos: string;
  }>({
    nama_penerima: "",
    no_telpon: "",
    alamat_lengkap: "",
    label: "",
    kode_pos: "",
  });

  useEffect(() => {
    if (provinceCode) {
      setRegencies([]);
      setDistricts([]);
      getRegencies();
    }

    async function getRegencies() {
      try {
        const response: SuccessResponse<Regional[]> = await fetcher({
          url: `/regencies/${provinceCode}`,
          method: "GET",
        });

        setRegencies(response.data);
      } catch (error) {
        Toast.error("Terjadi kesalahan saat mendapatkan data kabupaten/kota");
        console.log(error);
      }
    }
  }, [provinceCode]);

  useEffect(() => {
    if (provinceCode) {
      setDistricts([]);
      getRegencies();
    }

    async function getRegencies() {
      try {
        const response: SuccessResponse<Regional[]> = await fetcher({
          url: `/regencies/${provinceCode}`,
          method: "GET",
        });

        setRegencies(response.data);
      } catch (error) {
        Toast.error("Terjadi kesalahan saat mendapatkan data kabupaten/kota");
        console.log(error);
      }
    }
  }, [provinceCode]);

  useEffect(() => {
    if (regencyCode) {
      setDistricts([]);
      getDistricts();
    }

    async function getDistricts() {
      try {
        const response: SuccessResponse<Regional[]> = await fetcher({
          url: `/districts/${regencyCode}`,
          method: "GET",
        });

        setDistricts(response.data);
      } catch (error) {
        Toast.error("Terjadi kesalahan saat mendapatkan data kabupaten/kota");
        console.log(error);
      }
    }
  }, [regencyCode]);

  async function handleCreateAddress() {
    const provinsi = provinces.find((item) => item.code == provinceCode)?.name;
    const kota = regencies.find((item) => item.code == regencyCode)?.name;
    const kecamatan = districts.find((item) => item.code == districtCode)?.name;

    try {
      await fetcher({
        url: "/profile/address",
        method: "POST",
        data: { ...input, provinsi, kota, kecamatan },
        token,
      });

      localStorage.removeItem("register");
      return router.push(
        router.query.callback
          ? (router.query.callback as string)
          : "/profile/address",
      );
    } catch (error) {
      Toast.error("Terjadi kesalahan saat membuat alamat");
      console.log(error);
    }
  }

  return (
    <Layout title="Tambah Alamat" className="relative">
      <div className="grid gap-8">
        {from == "register" ? (
          <div className="mt-4 grid grid-cols-[24px_1fr] items-start gap-2 rounded-xl border-[2px] border-primary bg-primary/20 p-4">
            <WarningCircle
              weight="duotone"
              size={24}
              className="text-primary"
            />

            <p className="text-sm font-medium italic text-primary">
              Harap lengkapi alamat anda terlebih dahulu sebelum mulai
              berbelanja!
            </p>
          </div>
        ) : (
          <HeaderTitle
            path="/profile/address"
            label="Tambah Alamat"
            className="sticky left-0 top-0"
          />
        )}

        <div className="grid gap-4">
          <h4 className="text-sm font-semibold text-foreground">
            Informasi Penerima
          </h4>

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Nama Penerima"
            labelPlacement="outside"
            placeholder="Masukan nama penerima"
            name="nama_penerima"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            classNames={{
              label: "text-[12px]",
            }}
          />

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="No. Telpon Penerima"
            labelPlacement="outside"
            placeholder="Cth. 082233445566"
            name="no_telpon"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            classNames={{
              label: "text-[12px]",
            }}
          />
        </div>

        <div className="grid gap-4">
          <h4 className="text-sm font-semibold text-foreground">
            Detail Alamat
          </h4>

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Provinsi"
            labelPlacement="outside"
            onChange={(e) => setProvinceCode(e.target.value)}
            placeholder="Cth. DKI Jakarta"
            classNames={{
              label: "text-[12px]",
            }}
          >
            {provinces.map((province) => (
              <SelectItem key={province.code} value={province.name}>
                {province.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Kabupaten/Kota"
            labelPlacement="outside"
            onChange={(e) => setRegencyCode(e.target.value)}
            placeholder="Cth. Jakarta Selatan"
            classNames={{
              label: "text-[12px]",
            }}
          >
            {regencies.map((regency) => (
              <SelectItem key={regency.code} value={regency.name}>
                {regency.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Kecamatan"
            labelPlacement="outside"
            onChange={(e) => setDistrictCode(e.target.value)}
            placeholder="Cth. Setiabudi"
            classNames={{
              label: "text-[12px]",
            }}
          >
            {districts.map((district) => (
              <SelectItem key={district.code} value={district.name}>
                {district.name}
              </SelectItem>
            ))}
          </Select>

          <Textarea
            isRequired
            variant="bordered"
            color="default"
            maxRows={4}
            label="Alamat Lengkap"
            labelPlacement="outside"
            placeholder="Masukan nama jalan, no. rumah, dan lain sebagainya"
            name="alamat_lengkap"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            classNames={{
              label: "text-[12px]",
            }}
          />

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Label Alamat"
            labelPlacement="outside"
            placeholder="Cth. Rumah"
            onChange={(e) => {
              setInput({
                ...input,
                label: e.target.value,
              });
            }}
            classNames={{
              label: "text-[12px]",
            }}
          >
            <SelectItem key="rumah" value="rumah">
              Rumah
            </SelectItem>
            <SelectItem key="kantor" value="kantor">
              Kantor
            </SelectItem>
          </Select>

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="Kode Pos"
            labelPlacement="outside"
            placeholder="Cth. 19191"
            name="kode_pos"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
            classNames={{
              label: "text-[12px]",
            }}
          />
        </div>

        <div className="sticky bottom-0 left-0 z-50 h-20 w-full bg-white pt-2">
          <Button
            color="primary"
            onClick={handleCreateAddress}
            className="w-full font-semibold"
            isDisabled={
              !Object.values(input).every((value) => value.trim() !== "") ||
              !provinceCode ||
              !regencyCode ||
              !districtCode
            }
          >
            Simpan Alamat
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<Regional[]> = await fetcher({
    url: "/provinces",
    method: "GET",
  });

  return {
    props: {
      provinces: response.data,
      from: query?.from ? (query?.from as string) : "any",
      token,
    },
  };
}) satisfies GetServerSideProps<{
  provinces: Regional[];
  from: string;
  token: string;
}>;
