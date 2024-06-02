import { Button, Chip } from "@nextui-org/react";
import { PencilSimple, Star, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import { AddressType } from "@/types/address.type";

type AddressProps = {
  address: AddressType;
};

export default function CardAddress({ address }: AddressProps) {
  const router = useRouter();

  return (
    <div className="grid gap-4 rounded-xl border border-foreground-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <Chip
          variant="flat"
          color="primary"
          size="sm"
          classNames={{
            content: "font-semibold",
          }}
        >
          {address.address_label}
        </Chip>

        {address.main_address ? (
          <Chip
            variant="flat"
            color="success"
            size="sm"
            startContent={
              <Star weight="fill" size={14} className="text-success" />
            }
            classNames={{
              base: "gap-1 px-2",
              content: "font-semibold",
            }}
          >
            {address.main_address && "Utama"}
          </Chip>
        ) : null}
      </div>

      <div className="grid gap-1">
        <h4 className="font-semibold text-foreground">
          {address.recipient_name}
        </h4>
        <p className="font-medium text-foreground">
          +62{address.recipient_no_telp}
        </p>
        <p className="mt-1 text-sm font-medium leading-[180%] text-foreground-600">
          {address.complete_address} | {address.subdistrict_city_province} |{" "}
          {address.postal_code}
        </p>
      </div>

      <div className="flex items-center gap-1 border-t border-foreground-200 pt-4">
        <Button
          variant="light"
          color="primary"
          startContent={
            <PencilSimple weight="duotone" size={22} className="text-primary" />
          }
          onClick={() =>
            router.push(
              `/profile/shipping-address/edit?id=${address.address_id}`,
            )
          }
          className="px-2 font-semibold"
        >
          Edit Alamat
        </Button>

        <Button
          isIconOnly
          variant="light"
          color="danger"
          onClick={() => {
            if (confirm("Apakah kamu yakin?")) {
              window.location.href = "/profile/shipping-address";
            }
          }}
        >
          <Trash weight="duotone" size={22} className="text-danger" />
        </Button>
      </div>
    </div>
  );
}
