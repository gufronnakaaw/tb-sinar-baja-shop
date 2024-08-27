import { Transaction } from "@/types/transaction.type";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Bag } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTransaction({
  transaksi_id,
  total_item,
  total,
  created_at,
  status,
}: Transaction) {
  const router = useRouter();
  return (
    <div
      className="grid w-full cursor-pointer grid-cols-[40px_1fr] items-center gap-2 rounded-xl border border-foreground-200 p-4 hover:bg-foreground-100"
      onClick={() =>
        router.push(
          `/profile/transactions/detail?id=${encodeURIComponent(transaksi_id)}`,
        )
      }
    >
      <Bag size={25} />

      <div className="flex items-center justify-between gap-2 text-[12px]">
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold text-foreground">
            Transaksi {transaksi_id}
          </h3>
          <p className="font-medium text-foreground-600">
            {formatDate(created_at)}
          </p>
          <p className="font-semibold text-foreground">{total_item} Item</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-foreground">{formatRupiah(total)}</p>
          <p className="font-semibold text-success">{status}</p>
        </div>
      </div>
    </div>
  );
}
