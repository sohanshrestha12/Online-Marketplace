import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
        <div className="space-y-2 py-2 px-2">
          <Skeleton className="mt-2 h-4 w-[250px]" />
          <Skeleton className="mt-3 h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
