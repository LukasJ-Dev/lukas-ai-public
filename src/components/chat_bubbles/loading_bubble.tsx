import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBubble() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 items-center">
        <Image
          src="/lukas.png"
          alt="A image of Lukas"
          width={32}
          height={32}
          className="rounded-full"
        />
        <strong className="text-lg">Lukas AI</strong>
      </div>

      <div className={`bg-card flex flex-col p-4 rounded-lg w-fit`}>
        <div className="flex flex-col gap-y-3">
          {/* First line - longer sentence */}
          <div className="flex flex-row gap-x-2">
            <Skeleton className="h-4 w-[120px] bg-muted" />
            <Skeleton className="h-4 w-[180px] bg-muted" />
            <Skeleton className="h-4 w-[90px] bg-muted" />
          </div>

          {/* Second line - medium length */}
          <div className="flex flex-row gap-x-2">
            <Skeleton className="h-4 w-[150px] bg-muted" />
            <Skeleton className="h-4 w-[100px] bg-muted" />
          </div>

          {/* Third line - shorter */}
          <div className="flex flex-row gap-x-2">
            <Skeleton className="h-4 w-[80px] bg-muted" />
            <Skeleton className="h-4 w-[140px] bg-muted" />
            <Skeleton className="h-4 w-[60px] bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
