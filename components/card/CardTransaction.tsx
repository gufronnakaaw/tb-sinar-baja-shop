import { formatRupiah } from "@/utils/formatRupiah";
import { Bag } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTransaction({
  id_transaksi,
  total_item,
  total_transaksi,
  status,
}: {
  id_transaksi: string;
  total_item: number;
  total_transaksi: number;
  status: string;
}) {
  const router = useRouter();
  return (
    <div
      className="grid w-full cursor-pointer grid-cols-[40px_1fr_85px] items-center rounded-xl border border-foreground-200 p-4 text-[12px] hover:bg-foreground-100"
      onClick={() => router.push("/profile/transactions/detail")}
    >
      <Bag size={25} />

      <div className="grid gap-1">
        <h3 className="text-[13px] font-semibold text-foreground">
          Transaksi {id_transaksi}
        </h3>
        <p>20 Juli 2024 09:13</p>
        <p className="font-semibold">{total_item} Item</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">{formatRupiah(total_transaksi)}</p>
        <p className="font-semibold text-success">{status}</p>
      </div>
    </div>
  );
}
