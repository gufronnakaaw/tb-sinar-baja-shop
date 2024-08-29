import { Transaction } from "@/types/transaction.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { Bag } from "@phosphor-icons/react";
import Image from "next/image";
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
      className="grid w-full cursor-pointer divide-y-1 divide-foreground-200 rounded-xl border border-foreground-200 p-4 hover:bg-foreground-100"
      onClick={() =>
        router.push(
          `/profile/transactions/detail?id=${encodeURIComponent(transaksi_id)}`,
        )
      }
    >
      <div className="flex items-center justify-between gap-2 pb-4">
        <div className="inline-flex items-center gap-2">
          <Bag size={22} className="text-primary" />

          <div>
            <h6 className="text-[10px] font-semibold text-foreground">
              Belanja
            </h6>
            <p className="text-[10px] font-medium text-foreground-600">
              {formatDateWithoutTime(created_at)}
            </p>
          </div>
        </div>

        <Chip
          variant="flat"
          color={status == "selesai" ? "success" : "default"}
          size="sm"
          classNames={{
            content: "text-[9px] capitalize font-medium",
          }}
        >
          {status}
        </Chip>
      </div>

      <div className="grid grid-cols-[40px_1fr] items-center gap-2 pt-4">
        <Image
          priority
          src="/img/package.png"
          alt="package img"
          width={200}
          height={200}
          className="aspect-square size-10"
        />

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-medium text-foreground-600">
              {total_item} barang
            </p>
            <h6 className="text-[10px] font-semibold text-foreground">
              Transaksi {transaksi_id}
            </h6>
          </div>

          <div>
            <p className="text-[10px] font-medium text-foreground-600">
              Total Belanja
            </p>
            <h6 className="text-[10px] font-semibold text-foreground">
              {formatRupiah(total)}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
