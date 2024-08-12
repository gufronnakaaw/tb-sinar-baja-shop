import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { SuccessResponse } from "@/types/global.type";
import { Regional } from "@/types/regional.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import Toast from "react-hot-toast";

export default function EditShippingAddress({
  provinces,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

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

  return (
    <Layout title="Edit Alamat">
      <div className="grid gap-8">
        <HeaderTitle
          path="/profile/address"
          label="Edit Alamat"
          className="sticky left-0 top-0"
        />

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Informasi Penerima</h4>

          <Input
            isRequired
            variant="bordered"
            color="default"
            label="Nama Penerima"
            labelPlacement="outside"
            placeholder="Masukan nama penerima"
          />

          <Input
            isRequired
            type="number"
            variant="bordered"
            color="default"
            label="No. Telpon Penerima"
            labelPlacement="outside"
            placeholder="Cth. 082233445566"
          />
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Detail Alamat</h4>

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Provinsi"
            labelPlacement="outside"
            onChange={(e) => setProvinceCode(e.target.value)}
            placeholder="Cth. DKI Jakarta"
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
          />

          <Select
            isRequired
            color="default"
            variant="bordered"
            label="Label Alamat"
            labelPlacement="outside"
            placeholder="Cth. Rumah"
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
            placeholder="Cth. 16512"
          />

          <Checkbox
            color="primary"
            classNames={{
              label: "text-sm text-foreground",
            }}
          >
            Jadikan Alamat Utama
          </Checkbox>
        </div>

        <div className="sticky bottom-0 left-0 z-50 bg-white py-4">
          <Button
            color="primary"
            onClick={() => {
              if (confirm("Apakah kamu yakin?")) {
                window.location.href = "/profile/address";
              }
            }}
            className="w-full font-semibold"
          >
            Simpan Alamat
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const response: SuccessResponse<Regional[]> = await fetcher({
    url: "/provinces",
    method: "GET",
  });

  return {
    props: {
      provinces: response.data,
    },
  };
}) satisfies GetServerSideProps<{ provinces: Regional[] }>;
