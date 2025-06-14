import {
  AiOutlineCar,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsSpeedometer2 } from "react-icons/bs";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { RiGasStationLine } from "react-icons/ri";
import { MdOutlineColorLens } from "react-icons/md";

interface Car {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  photo?: string;
  complectation?: string;
  price_per_month?: number;
  engine?: string;
  power?: string;
  transmission?: string;
  mileage?: number;
  fuel?: string;
  color?: string;
  year?: number;
  images?: { image: string[] };
  [key: string]: unknown;
}

export default function CarCard({ car }: { car: Car }) {
  const imageUrl = car.images?.image?.[0] || car.photo || "/no-image.png";
  console.log({ car });

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col min-w-[260px]">
      <img
        src={imageUrl}
        alt={car.mark_id + " " + car.folder_id}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <div className="font-bold text-lg mb-1">
        {car.mark_id} {car.folder_id}
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-blue-700 font-semibold text-xl">
          {car.price?.toLocaleString()} ₽
        </span>
        {car.price_per_month && (
          <span className="text-gray-500 text-sm">
            от {car.price_per_month?.toLocaleString()} ₽/мес
          </span>
        )}
      </div>
      <div className="text-sm flex items-center gap-2 mb-1 text-gray-700">
        <AiOutlineCar />
        <span>{car.engine || "X 1.6 AT (123 л.с.)"}</span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
        <div className="flex items-center gap-1">
          <BsSpeedometer2 />
          <span>{car.mileage ? car.mileage.toLocaleString() : "8 117"} км</span>
        </div>
        <div className="flex items-center gap-1">
          <HiOutlineSwitchHorizontal />
          <span>{car.transmission || "Автоматическая"}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiGasStationLine />
          <span>{car.fuel || "Бензин"}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlineColorLens />
          <span>{car.color || "Серый"}</span>
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineCalendar />
          <span>{car.year || "2022"}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-auto">
        <button className="bg-gray-100 rounded p-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="#888"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10 6v4l2 2"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="bg-gray-100 rounded p-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <rect
              x="4"
              y="4"
              width="12"
              height="12"
              rx="2"
              stroke="#888"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
        <button className="bg-blue-600 text-white rounded px-4 py-2 ml-auto font-semibold hover:bg-blue-700 transition">
          КУПИТЬ
        </button>
      </div>
    </div>
  );
}
