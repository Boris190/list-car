import SortSelect from "@/components/SortSelect";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { Metadata } from "next";

interface Car {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  photo: string;
  [key: string]: unknown;
}

export const metadata: Metadata = {
  title: "Cars List",
  description: "List of cars with pagination and sorting",
};

type SearchParams = {
  page?: string;
  sort?: string;
  order?: string;
};

async function getCars(searchParams: SearchParams) {
  const params = new URLSearchParams({
    _limit: "12",
    _page: searchParams.page || "1",
  });

  if (searchParams.sort && searchParams.order) {
    params.set("_sort", searchParams.sort);
    params.set("_order", searchParams.order);
  }

  const isServer = typeof window === "undefined";

  const baseUrl = isServer
    ? process.env.BASE_URL_SERVER || "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const res = await fetch(`${baseUrl}/api/cars?${params.toString()}`, {
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Ошибка от API:", res.status, text);
      return { data: [], meta: { page: 1, last_page: 1 } };
    }

    return await res.json();
  } catch (error) {
    console.error("🔥 Ошибка при fetch /api/cars:", error);
    return { data: [], meta: { page: 1, last_page: 1 } };
  }
}

type Props = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const { data = [], meta = {} } = await getCars(searchParams);
  const currentPage = Number(meta.page) || 1;
  const totalPages = Number(meta.last_page) || 1;

  return (
    <main className="container mx-auto p-4">
      <SortSelect currentOrder={searchParams.order} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-4 my-4">
        {data.map((car: Car) => (
          <CarCard key={car.unique_id} car={car} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
