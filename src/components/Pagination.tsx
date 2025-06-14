"use client";
import { useRouter, useSearchParams } from "next/navigation";

function getPages(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (current > 3) {
    pages.push("...");
  }
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push("...");
  }
  if (total > 1) pages.push(total);
  // Убираем дубли
  return pages.filter((item, idx, arr) => arr.indexOf(item) === idx);
}

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeCurrent = Number(currentPage) || 1;
  const safeTotal = Number(totalPages) || 1;
  console.log({ currentPage });

  const goToPage = (page: number) => {
    if (page < 1 || page > safeTotal || page === safeCurrent) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push("?" + params.toString());
  };

  if (safeTotal <= 1) return null;

  const pages = getPages(safeCurrent, safeTotal);

  return (
    <div className="flex justify-center items-center gap-2 my-4">
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          safeCurrent === 1
            ? "bg-gray-200 text-gray-400 cursor-default"
            : "bg-white border text-blue-500"
        }`}
        onClick={() => goToPage(safeCurrent - 1)}
        disabled={safeCurrent === 1}
      >
        &lt;
      </button>
      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={page}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border transition
              ${
                page === safeCurrent
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-400 hover:bg-blue-100"
              }`}
            onClick={() => goToPage(page)}
            disabled={page === safeCurrent}
          >
            {page}
          </button>
        ) : (
          <span
            key={"dots-" + idx}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-200 text-gray-400 cursor-default"
          >
            ...
          </span>
        )
      )}
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          safeCurrent === safeTotal
            ? "bg-gray-200 text-gray-400 cursor-default"
            : "bg-white border text-blue-500"
        }`}
        onClick={() => goToPage(safeCurrent + 1)}
        disabled={safeCurrent === safeTotal}
      >
        &gt;
      </button>
    </div>
  );
}
