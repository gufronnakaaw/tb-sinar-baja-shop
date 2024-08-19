import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
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
import { ArrowRight, MapTrifold, Truck } from "@phosphor-icons/react";
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
      return router.push({
        pathname: "/purchase/preview",
        query: {
          type: selectedDiv,
          bank,
          address,
          ...router.query,
        },
      });
    }
  }

  return (
    <Layout title="Checkout Page">
      <HeaderTitle
        path="/products"
        label="Buat Pesanan"
        className="sticky left-0 top-0"
      />

      <div className="grid gap-8">
        <div className="grid gap-4">
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
          <div className="grid border-l-[4px] border-primary pl-4">
            {selectedDiv == "pickup" ? (
              <>
                <h5 className="mb-1 text-sm font-semibold text-foreground">
                  Alamat Toko
                </h5>
                <p className="text-[12px] font-medium text-foreground-600">
                  {shopAddress.address} - {shopAddress.phone}
                </p>
              </>
            ) : null}

            {selectedDiv == "delivery" ? (
              <>
                <h5 className="mb-1 text-sm font-semibold text-foreground">
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
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <span className="text-small capitalize">{`Alamat ${address.label} - ${address.nama_penerima} - ${address.no_telpon}`}</span>
                          <span className="text-tiny text-default-400">
                            {address.alamat_lengkap}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </>
            ) : null}
          </div>
        </div>

        <div className="h-[1px] w-full border border-dashed border-foreground-200" />

        <div className="grid gap-4">
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
                    description: "text-[12px] text-foreground-600 font-medium",
                  }}
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.bank}
                  </p>
                </Radio>
              );
            })}
          </RadioGroup>

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
