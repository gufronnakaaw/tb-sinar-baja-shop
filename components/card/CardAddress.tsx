import { Button, Chip } from "@nextui-org/react";
import { PencilSimple, Trash } from "@phosphor-icons/react";
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
    <div className="grid gap-4 rounded-xl border border-foreground-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <Chip
          variant="flat"
          color="primary"
          size="sm"
          classNames={{
            content: "font-semibold capitalize",
          }}
        >
          Alamat {address.label}
        </Chip>
      </div>

      <div className="grid gap-1">
        <h4 className="font-semibold text-foreground">
          {address.nama_penerima}
        </h4>
        <p className="font-medium text-foreground">{address.no_telpon}</p>
        <p className="mt-1 text-sm font-medium leading-[180%] text-foreground-600">
          {address.alamat_lengkap} | {address.kecamatan} | {address.kota} |{" "}
          {address.provinsi} | {address.kode_pos}
        </p>
      </div>

      <div className="flex items-center gap-1 border-t border-foreground-200 pt-4">
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
