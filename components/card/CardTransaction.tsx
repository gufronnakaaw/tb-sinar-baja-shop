import { formatRupiah } from "@/utils/formatRupiah";
import { Bag } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTransaction({
  id_transaksi,
  total_item,
  total_transaksi,
  tanggal_transaksi,
  status,
}: {
  id_transaksi: string;
  total_item: number;
  total_transaksi: number;
  tanggal_transaksi: string;
  status: string;
}) {
  const router = useRouter();
  return (
    <div
      className="grid w-full cursor-pointer grid-cols-[40px_1fr] items-center gap-2 rounded-xl border border-foreground-200 p-4 hover:bg-foreground-100"
      onClick={() => router.push("/profile/transactions/detail")}
    >
      <Bag size={25} />

      <div className="flex items-center justify-between gap-2 text-[12px]">
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold text-foreground">
            Transaksi {id_transaksi}
          </h3>
          <p className="font-medium text-foreground-600">{tanggal_transaksi}</p>
          <p className="font-semibold text-foreground">{total_item} Item</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-foreground">
            {formatRupiah(total_transaksi)}
          </p>
          <p className="font-semibold text-success">{status}</p>
        </div>
      </div>
    </div>
  );
}
