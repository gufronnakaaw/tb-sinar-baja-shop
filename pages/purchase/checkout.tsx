import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { ArrowRight, MapTrifold, Truck } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [selectedDiv, setSelectedDiv] = useState("");

  return (
    <Layout title="Checkout Page">
      <HeaderTitle
        path="/products/17630837"
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
              className={`group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-foreground-200 p-2 transition hover:border-primary hover:bg-primary ${selectedDiv == "pickup" ? "bg-primary" : null}`}
              onClick={() => setSelectedDiv("pickup")}
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
              className={`group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-foreground-200 p-2 transition hover:border-primary hover:bg-primary ${selectedDiv == "delivery" ? "bg-primary" : null}`}
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
                <h5 className="mb-1 text-sm font-semibold italic text-foreground">
                  Pesanan Diambil Sendiri
                </h5>
                <p className="text-[12px] font-medium text-foreground-600">
                  Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
                  Kediri, Jawa Timur 64131
                </p>
              </>
            ) : (
              <h1>your address here</h1>
            )}
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

          <RadioGroup>
            <Radio
              value="bca"
              description="0192847621 a/n TB Sinar Baja Kediri"
              classNames={{
                description:
                  "text-[12px] italic text-foreground-600 font-medium",
              }}
            >
              <p className="text-sm font-medium text-foreground">
                Bank Central Asia (BCA)
              </p>
            </Radio>
          </RadioGroup>

          <Button
            color="primary"
            endContent={<ArrowRight weight="bold" size={16} />}
            onClick={() => router.push("/purchase/preview?id=17630837")}
            className="mb-4 w-full font-semibold"
            isDisabled={!selectedDiv}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  console.log(query);

  return {
    props: {
      carts: ["ak"],
    },
  };
}) satisfies GetServerSideProps<{ carts: string[] }>;
