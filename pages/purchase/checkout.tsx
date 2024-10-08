import Layout from "@/components/Layout";
import { shopAddress } from "@/data/app.data";
import { Address } from "@/types/address.type";
import { Bank } from "@/types/bank.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  ArrowRight,
  CaretLeft,
  MapTrifold,
  Truck,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CheckoutPage({
  checkout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const [selectedDiv, setSelectedDiv] = useState("");

  useEffect(() => {
    if (selectedDiv == "pickup") {
      setDisabled(!selectedDiv || !bank);
    }

    if (selectedDiv == "delivery") {
      setDisabled(!selectedDiv || !bank || !address);
    }
  }, [selectedDiv, bank, address]);

  function handleCheckout() {
    if (!disabled) {
      const query = {
        type: selectedDiv,
        bank,
        ...router.query,
      };

      if (address) {
        Object.assign(query, { address });
      }

      return router.push({
        pathname: "/purchase/preview",
        query,
      });
    }
  }

  return (
    <Layout title="Checkout Page">
      <header className="sticky left-0 top-0 z-50 grid h-20 grid-cols-[50px_1fr_50px] items-center bg-white">
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="sm"
          onClick={() => router.back()}
        >
          <CaretLeft weight="bold" size={20} className="text-foreground" />
        </Button>

        <h5 className="text-center font-semibold text-foreground">
          Buat Pesanan
        </h5>
      </header>

      <div className="mb-16 min-h-screen">
        <div className="grid divide-y-2 divide-dashed divide-foreground-200">
          <div className="grid gap-2 pb-6">
            <h3 className="text-sm font-semibold text-foreground">
              Informasi Pengiriman
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-foreground-200 p-2 transition hover:border-primary hover:bg-primary ${selectedDiv == "pickup" ? "border-primary bg-primary" : null}`}
                onClick={() => {
                  setSelectedDiv("pickup");
                  setAddress("");
                }}
              >
                <MapTrifold
                  weight="duotone"
                  size={36}
                  className={`text-primary transition group-hover:text-white ${selectedDiv == "pickup" ? "text-white" : null}`}
                />

                <h6
                  className={`text-center text-[12px] font-semibold text-foreground-600 transition group-hover:text-white ${selectedDiv == "pickup" ? "text-white" : null}`}
                >
                  Pesanan <br />
                  Diambil Sendiri
                </h6>
              </div>

              <div
                className={`group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-foreground-200 p-2 transition hover:border-primary hover:bg-primary ${selectedDiv == "delivery" ? "border-primary bg-primary" : null}`}
                onClick={() => setSelectedDiv("delivery")}
              >
                <Truck
                  weight="duotone"
                  size={36}
                  className={`text-primary transition group-hover:text-white ${selectedDiv == "delivery" ? "text-white" : null}`}
                />

                <h6
                  className={`text-center text-[12px] font-semibold text-foreground-600 transition group-hover:text-white ${selectedDiv == "delivery" ? "text-white" : null}`}
                >
                  Pesanan <br />
                  Diantar
                </h6>
              </div>
            </div>

            {/* selected delivery */}
            {selectedDiv == "pickup" ? (
              <div className="mt-2 grid gap-2 border-l-[4px] border-primary pl-4">
                <h5 className="text-sm font-semibold text-foreground">
                  Alamat Toko
                </h5>
                <p className="text-[12px] font-medium text-foreground-600">
                  {shopAddress.address} - {shopAddress.phone}
                </p>
              </div>
            ) : null}

            {selectedDiv == "delivery" ? (
              <div className="mt-2 grid gap-2 border-l-[4px] border-primary pl-4">
                <h5 className="text-sm font-semibold text-foreground">
                  Alamat Saya
                </h5>

                <Select
                  items={checkout.address}
                  placeholder="Pilih Alamat"
                  labelPlacement="outside"
                  onChange={(e) => setAddress(e.target.value)}
                >
                  {(address) => (
                    <SelectItem
                      key={address.address_id}
                      textValue={address.nama_penerima}
                    >
                      <div className="grid">
                        <h6 className="text-[14px] font-medium capitalize text-foreground">{`Alamat ${address.label} - ${address.nama_penerima} - ${address.no_telpon}`}</h6>
                        <p className="text-[12px] text-default-600">
                          {address.alamat_lengkap}
                        </p>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </div>
            ) : null}
          </div>

          <div className="grid gap-2 pt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Metode Pembayaran{" "}
              <span className="text-[12px] font-medium text-foreground-600">
                (Transfer Bank)
              </span>
            </h3>

            <RadioGroup onChange={(e) => setBank(e.target.value)}>
              {checkout.banks.map((item) => {
                return (
                  <Radio
                    key={item.bank_id}
                    value={item.bank_id}
                    description={`${item.no_rekening} a/n ${item.atas_nama}`}
                    classNames={{
                      description:
                        "text-[12px] text-foreground-600 font-medium",
                    }}
                  >
                    <p className="text-sm font-medium text-foreground">
                      {item.bank}
                    </p>
                  </Radio>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 z-50 h-20 w-full bg-white pt-2">
        <Button
          color="primary"
          endContent={<ArrowRight weight="bold" size={16} />}
          onClick={handleCheckout}
          className="mb-4 w-full font-semibold"
          isDisabled={disabled}
        >
          Selanjutnya
        </Button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query, req }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<{ banks: Bank[]; address: Address[] }> =
    await fetcher({
      url: "/checkout",
      method: "GET",
      token,
    });

  return {
    props: {
      checkout: response.data,
    },
  };
}) satisfies GetServerSideProps<{
  checkout: { banks: Bank[]; address: Address[] };
}>;
