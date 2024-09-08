import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Address } from "@/types/address.type";
import { SuccessResponse } from "@/types/global.type";
import { Regional } from "@/types/regional.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import Toast from "react-hot-toast";

export default function EditShippingAddress({
  provinces,
  address,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState(address);

  const [provinceCode, setProvinceCode] = useState<Key>("");
  const [regencies, setRegencies] = useState<Regional[]>([]);
  const [regencyCode, setRegencyCode] = useState<Key>("");
  const [districts, setDistricts] = useState<Regional[]>([]);
  const [districtCode, setDistrictCode] = useState<Key>("");

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

  async function handleUpdateAddress() {
    const provinsi = provinces.find((item) => item.code == provinceCode)?.name;
    const kota = regencies.find((item) => item.code == regencyCode)?.name;
    const kecamatan = districts.find((item) => item.code == districtCode)?.name;

    try {
      await fetcher({
        url: "/profile/address",
        method: "PATCH",
        data: { ...input, provinsi, kota, kecamatan },
        token,
      });

      Toast.success("Update alamat berhasil");
      return router.push("/profile/address");
    } catch (error) {
      Toast.error("Terjadi kesalahan saat update alamat");
      console.log(error);
    }
  }

  return (
    <Layout title="Edit Alamat">
      <div className="grid gap-8">
        <HeaderTitle
          path="/profile/address"
          label="Edit Alamat"
          className="sticky left-0 top-0"
        />

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
            classNames={{
              label: "text-[12px]",
            }}
            defaultValue={input.nama_penerima}
            onChange={(e) => {
              setInput({
                ...input,
                nama_penerima: e.target.value,
              });
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
            classNames={{
              label: "text-[12px]",
            }}
            defaultValue={input.no_telpon}
            onChange={(e) => {
              setInput({
                ...input,
                no_telpon: e.target.value,
              });
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
            placeholder={address.provinsi}
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
            placeholder={address.kota}
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
            placeholder={address.kecamatan}
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
            classNames={{
              label: "text-[12px]",
            }}
            defaultValue={address.alamat_lengkap}
            onChange={(e) => {
              setInput({
                ...input,
                alamat_lengkap: e.target.value,
              });
            }}
          />

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Label Alamat"
            labelPlacement="outside"
            placeholder="Cth. Rumah"
            classNames={{
              label: "text-[12px]",
            }}
            onChange={(e) => {
              setInput({
                ...input,
                label: e.target.value,
              });
            }}
            defaultSelectedKeys={[address.label]}
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
            variant="bordered"
            color="default"
            label="Kode Pos"
            labelPlacement="outside"
            placeholder="Cth. 19191"
            classNames={{
              label: "text-[12px]",
            }}
            onChange={(e) => {
              setInput({
                ...input,
                kode_pos: e.target.value,
              });
            }}
            defaultValue={address.kode_pos}
          />
        </div>

        <div className="sticky bottom-0 left-0 z-50 h-20 w-full bg-white pt-2">
          <Button
            color="primary"
            onClick={handleUpdateAddress}
            className="w-full font-semibold"
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

  const [provinces, address] = await Promise.all([
    fetcher({
      url: "/provinces",
      method: "GET",
    }),
    fetcher({
      url: `/profile/address?address_id=${query.address_id as string}`,
      method: "GET",
      token,
    }),
  ]);

  return {
    props: {
      provinces: provinces.data as Regional[],
      address: address.data as Address,
      token,
    },
  };
}) satisfies GetServerSideProps<{
  provinces: Regional[];
  address: Address;
  token: string;
}>;
