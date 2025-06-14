"use client";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { label: "Не выбрана", value: "" },
  { label: "Цена по возрастанию", value: "asc" },
  { label: "Цена по убыванию", value: "desc" },
];

export default function SortSelect({
  currentOrder,
}: {
  currentOrder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (order) {
      params.set("sort", "price");
      params.set("order", order);
    } else {
      params.delete("sort");
      params.delete("order");
    }
    params.set("page", "1");
    router.push("?" + params.toString());
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Сортировка:</label>
      <select
        className="border rounded px-2 py-1"
        value={currentOrder || ""}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
