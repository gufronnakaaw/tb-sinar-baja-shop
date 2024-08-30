import { Button, Chip } from "@nextui-org/react";
import { HouseLine, PencilSimple, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import { Address } from "@/types/address.type";
import { fetcher } from "@/utils/fetcher";
import Toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type AddressProps = {
  address: Address;
  mutate: KeyedMutator<any>;
  token: string;
};

export default function CardAddress({ address, mutate, token }: AddressProps) {
  const router = useRouter();

  async function handleDeleteAddress(address_id: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: `/profile/address/${address_id}`,
        method: "DELETE",
        token,
      });
      mutate();
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat hapus alamat");
    }
  }

  return (
    <div className="grid divide-y divide-foreground-200 rounded-xl border border-foreground-200 p-4">
      <div className="grid gap-2 pb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-3">
            <HouseLine weight="duotone" size={26} className="text-primary" />

            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {address.nama_penerima}
              </h4>
              <p className="text-[12px] font-medium text-foreground">
                {address.no_telpon}
              </p>
            </div>
          </div>

          <Chip
            variant="flat"
            color="primary"
            size="sm"
            classNames={{
              content: "font-semibold capitalize text-[10px]",
            }}
          >
            Alamat {address.label}
          </Chip>
        </div>

        <p className="text-[12px] font-medium leading-[180%] text-foreground-600">
          {address.alamat_lengkap} | {address.kecamatan} | {address.kota} |{" "}
          {address.provinsi} | {address.kode_pos}
        </p>
      </div>

      <div className="flex items-center gap-1 pt-4">
        <Button
          variant="light"
          color="primary"
          size="sm"
          startContent={
            <PencilSimple weight="bold" size={18} className="text-primary" />
          }
          onClick={() =>
            router.push(
              `/profile/address/edit?address_id=${address.address_id}`,
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
          size="sm"
          onClick={() => handleDeleteAddress(address.address_id)}
        >
          <Trash weight="bold" size={18} className="text-danger" />
        </Button>
      </div>
    </div>
  );
}
