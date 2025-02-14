import { Skeleton } from "@/components/ui/skeleton";

const LoadingScreen = () => {
  return (
    <div className="bg-gradient-to-b from-slate-700 to-slate-900 h-screen w-screen flex">
      <div className="w-1/3 h-full flex flex-col space-y-10 p-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 h-full p-5 space-y-10">
        <div className="space-y-2">
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[7rem]" />
        </div>
        <div className="space-y-2 flex w-full items-end flex-col">
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[7rem]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[7rem]" />
        </div>
        <div className="space-y-2 flex w-full items-end flex-col">
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[10rem]" />
          <Skeleton className="h-[1rem] w-[7rem]" />
        </div>
      </div>
    </div>
  );
};
export default LoadingScreen;
