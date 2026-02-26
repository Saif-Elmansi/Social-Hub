import { Card, Skeleton } from "@heroui/react";

export default function PostSkeleton() {
  return (
    <Card className="w-full max-w-[95%] sm:max-w-125 md:max-w-145 bg-[#242526] border-none shadow-md my-4 p-4 space-y-5 mx-auto">
      {/* هيدر السكيلتون: الدائرة والمستطيلات الجانبية */}
      <div className="flex items-center gap-3">
        <Skeleton className="flex rounded-full w-12 h-12 bg-white/5" />
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-2/5 rounded-lg bg-white/10" />
          <Skeleton className="h-3 w-1/5 rounded-lg bg-white/5" />
        </div>
      </div>

      {/* جسم البوست: نص وصورة */}
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-lg h-3 bg-white/10" />
        <Skeleton className="w-full rounded-xl h-48 sm:h-64 bg-white/5" />
      </div>

      {/* الفوتر: أزرار التفاعل */}
      <div className="flex justify-between gap-3 pt-2">
        <Skeleton className="w-1/4 h-8 rounded-lg bg-white/5" />
        <Skeleton className="w-1/4 h-8 rounded-lg bg-white/5" />
        <Skeleton className="w-1/4 h-8 rounded-lg bg-white/5" />
      </div>
    </Card>
  );
}