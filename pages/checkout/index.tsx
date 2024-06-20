import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function CheckoutPage() {
  return (
    <Layout title="Checkout Page">
      <HeaderTitle
        path="/products/17630837"
        label="Buat Pesanan"
        className="sticky left-0 top-0"
      />

      <div className="grid gap-8">
        <div className="grid gap-5">
          <h3 className="font-semibold text-foreground">
            Informasi Pengiriman
          </h3>

          <div className="grid gap-3">
            <Input
              variant="bordered"
              color="default"
              label="Nama Penerima"
              labelPlacement="outside"
              placeholder="Contoh: Joko Anwar"
            />

            <Input
              variant="bordered"
              color="default"
              label="Email Penerima"
              labelPlacement="outside"
              placeholder="Contoh: joko.anwar@mail.com"
            />

            <Input
              variant="bordered"
              color="default"
              label="No. Telp"
              labelPlacement="outside"
              placeholder="Contoh: 08XXXXXXXXXX"
            />

            <Textarea
              variant="bordered"
              color="default"
              maxRows={4}
              label="Alamat"
              labelPlacement="outside"
              placeholder="Contoh: Jalan Mawar Merah, No. 00"
            />
          </div>
        </div>

        <div className="h-[1px] w-full border border-dashed border-foreground-200" />

        <div className="grid gap-2">
          <h3 className="font-semibold text-foreground">
            Metode Pembayaran{" "}
            <span className="text-[12px] font-medium text-foreground-600">
              (Transfer Bank)
            </span>
          </h3>

          <RadioGroup>
            <Radio value="bca">
              <p className="text-sm text-foreground">Bank Central Asia (BCA)</p>
            </Radio>
            <Radio value="mandiri">
              <p className="text-sm text-foreground">Bank Mandiri</p>
            </Radio>
            <Radio value="bni">
              <p className="text-sm text-foreground">Bank BNI</p>
            </Radio>
          </RadioGroup>
        </div>

        <Button
          color="primary"
          endContent={<ArrowRight weight="bold" size={16} />}
          className="w-full font-semibold"
        >
          Selanjutnya
        </Button>
      </div>
    </Layout>
  );
}
