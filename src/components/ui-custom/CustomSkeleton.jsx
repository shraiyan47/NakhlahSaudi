import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CustomSkeleton() {
  return (
    <div className="w-full md:py-12 sm:py-6 flex flex-col gap-4 mt-6 justify-center items-center">
      <div className="grid grid-cols-3 ">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="space-y-2 ">
        <Skeleton className="h-4 w-[240px]" />
        <Skeleton className="h-4 w-[240px]" />
      </div>
      <div className="space-y-2 mt-6">
        <Skeleton className="h-4 w-[240px]" />
        <Skeleton className="h-4 w-[240px]" />
      </div>
    </div>
  );
}
