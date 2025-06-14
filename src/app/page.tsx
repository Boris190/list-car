import SortSelect from "../components/SortSelect";
import CarCard from "../components/CarCard";
import Pagination from "../components/Pagination";

interface Car {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  photo: string;
  [key: string]: unknown;
}

async function getCars(searchParams: {
  page?: string;
  sort?: string;
  order?: string;
}) {
  const params = new URLSearchParams({
    _limit: "12",
    _page: searchParams.page || "1",
  });
  if (searchParams.sort && searchParams.order) {
    params.set("_sort", searchParams.sort);
    params.set("_order", searchParams.order);
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cars?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string; order?: string };
}) {
  const { data = [], meta = {} } = await getCars(searchParams);
  console.log(meta);

  const currentPage = Number(meta.page) || 1;
  const totalPages = Number(meta.last_page) || 1;
  return (
    <main className="container mx-auto p-4">
      <SortSelect currentOrder={searchParams.order} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {data.map((car: Car) => (
          <CarCard key={car.unique_id} car={car} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
