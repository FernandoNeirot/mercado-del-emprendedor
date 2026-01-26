"use client";

import React from "react";
import { VendorCard, type Vendor } from "./components/VendorCard";

interface VendorsSectionProps {
  vendors?: Vendor[];
  totalCount?: number;
  onContact?: (vendorId: string) => void;
  onLoadMore?: () => void;
}

const defaultVendors: Vendor[] = [
  {
    id: "1",
    name: "Masa Madre & Arte",
    location: "Quilmes",
    category: "PASTELERÍA",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu-mCavUUP7EsldU9ju-IDMj9oYvzv6NJ8XNcgsh9miM0AJFyT0yY-j7WkfVILrl6DP8nscbFaQmWSKtiYLzhysXv8noyBxneHONZ8I6-hnS9wdJK9QuOTYpYf7AAbveNIsi81aXXGtnVWOrxLeliQEhgVpdVdGpXEsPevExGeYmxHy3WNTgaST_XWR-_SNEKfvIJWACSaDAcl4u0KX9zwTxbaBfTntIB1zdwsah70N5Uyx5nZFUUSyE9JIWNNuwakcPpKLmFTp6YJ",
  },
  {
    id: "2",
    name: "Textiles del Sur",
    location: "Avellaneda",
    category: "TEXTILES",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkcSPhFE_qjZfWMSCIaaz3xxtxzR--jgnYKZFrPhwV89zuHnCdevga4OOiti-3ye3dusDD67KX9wJWMc4yUwUFHmVQSRzrxxdJUdX92FN5uGyj9msKCNbhyu721XiHkq1_lPi_KsYtqAt2X6gAvH9Yss0V-URDMeHBI0JRAywcNMGtrIrqTupec_1wIJBs47ROo6DvVA__qHu-QfGRaa0QiUus3MlwrUMfCBbixjgMjSwQV8R7AOlemMiiU6IqyqhJvknsOMjf9Lh",
  },
  {
    id: "3",
    name: "Eco Chic Boutique",
    location: "Bernal",
    category: "INDUMENTARIA",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrchIHaXhheTO9htRxGhq7jsLhhMLutL1o7Ad7hRnx5Q2GJzk5nTqthsdraAyqBMP-LUC3vVtBH9QWiNLAHrZ3_mPu0joXgwSiQYvSXjSQPU-4IqDZl6h0s1PDhfmpfyhSEEXeTD-YbehEUAgW3Gfefpzq8JnxutJ5kCZ0hzOJBCFqROc-qMK5fFFF3yuKpQVdSQcaH94wSsFG0NOTO6fxI5Uw9O8LmTbqfXCqyRM4LZhBFUEv89e4lLaXliHjtsZgAkQhwevJ_NOw",
  },
  {
    id: "4",
    name: "Taller Mara",
    location: "Avellaneda",
    category: "SERVICIOS",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmJ2f102w-eqG0Z6zvO6gxWlNe9Md9-H6Rjg_fdN4IidoWzezYo5zfgYuxUz31FeCvOb_AkfSpW8W3CiM2uFn5YDXzOFnlwPw2o1cgW7GA1MBFqYdYm8z-js0TYC_LICeI73tVLyG5vlD_mfTQBKz04y93ZRiHZttWqK_LrPSsje2-pmkt0otsg0g6eN_adPnzVS60ckQsOq5N1uJjhL64RVWZ5yf1YyUBAUAHRTReDIS8o_Mni-oEJoCBacrSmuUr9XK6g-vPfHWr",
  },
];

export function VendorsSection({
  vendors = defaultVendors,
  totalCount = 348,
  onContact,
  onLoadMore,
}: VendorsSectionProps) {
  return (
    <section className="px-5 md:px-0 mb-16">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-lg md:text-2xl font-extrabold md:font-bold text-slate-800 dark:text-slate-100">
          Descubrí Talentos
        </h2>
        <span className="text-[11px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">
          {totalCount} DISPONIBLES
        </span>
      </div>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[770px]:grid-cols-3 min-[1000px]:grid-cols-4 gap-4 md:gap-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onContact={onContact} />
        ))}
      </div>
      <div className="mt-8 md:mt-12 flex justify-center">
        <button
          onClick={onLoadMore}
          className="px-8 md:px-10 py-3 md:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full md:rounded-2xl text-xs md:text-sm font-black md:font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary transition-all shadow-sm"
        >
          Ver más emprendedores
        </button>
      </div>
    </section>
  );
}
