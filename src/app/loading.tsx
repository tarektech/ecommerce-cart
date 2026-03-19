import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loadingCardIds = [
  "catalog-card-1",
  "catalog-card-2",
  "catalog-card-3",
  "catalog-card-4",
  "catalog-card-5",
  "catalog-card-6",
  "catalog-card-7",
  "catalog-card-8",
];

const loadingFilterIds = ["price-band", "sort-order"];

function FilterFieldSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-background/75 p-4 shadow-xs">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-48 rounded-full" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

function CatalogCardSkeleton() {
  return (
    <Card
      className="h-full justify-between rounded-[1.75rem] border border-border/70 bg-card/90 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)]"
      size="sm"
    >
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-8 w-4/5 rounded-xl" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-3/4 rounded-full" />
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-12 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/60 pt-4">
        <Skeleton className="h-11 w-full rounded-full" />
      </CardFooter>
    </Card>
  );
}

export default function Loading() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top_left,rgba(180,102,48,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(14,116,144,0.14),transparent_34%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-[0_25px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur md:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-28 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full max-w-lg rounded-xl" />
                  <Skeleton className="h-4 w-full max-w-2xl rounded-full" />
                  <Skeleton className="h-4 w-full max-w-xl rounded-full" />
                </div>
              </div>
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded-[1rem]" />
              <Skeleton className="h-4 w-full max-w-xl rounded-full" />
            </div>

            <div className="grid w-full gap-4 md:grid-cols-2">
              {loadingFilterIds.map((filterId) => (
                <FilterFieldSkeleton key={filterId} />
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loadingCardIds.map((cardId) => (
            <CatalogCardSkeleton key={cardId} />
          ))}
        </div>
      </div>
    </main>
  );
}
