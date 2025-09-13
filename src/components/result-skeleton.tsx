export function ResultSkeleton() {
  return (
    <div className="flex gap-2 items-center py-2">
      <div className="size-8 rounded-lg bg-gray-200 animate-pulse"></div>
      <div className="flex flex-col gap-1">
        <div className="w-64 h-2 bg-gray-200 animate-pulse  rounded-full"></div>
        <div className="w-56 h-2 bg-gray-200 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}
