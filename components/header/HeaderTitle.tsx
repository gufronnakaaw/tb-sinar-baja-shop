import { Button } from "@nextui-org/react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface HeaderTitleProps {
  path: string;
  label: string;
  className?: string;
}

export default function HeaderTitle({
  path,
  label,
  className,
}: HeaderTitleProps) {
  const router = useRouter();

  return (
    <header
      className={`z-50 grid h-20 grid-cols-[50px_1fr_50px] items-center bg-white ${className}`}
    >
      <Button
        isIconOnly
        variant="light"
        color="default"
        onClick={() => router.push(path)}
      >
        <CaretLeft weight="bold" size={24} />
      </Button>

      <h5 className="text-center text-[18px] font-semibold text-foreground">
        {label}
      </h5>
    </header>
  );
}
