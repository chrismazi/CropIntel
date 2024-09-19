"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Pressure() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="w-full" style={{ height: "auto" }} />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col gap-4 
        dark:bg-dark-grey shadow-sm border-[#84a847ee] dark:shadow-none"
      style={{ minHeight: "12rem" }} // Allows the box to expand based on content
    >
      <div className="top">
        <h2
          className="flex items-center gap-2 font-medium bg-gradient-to-r 
          from-black to-[#84a847ee] text-transparent bg-clip-text 
          dark:text-white"
        >
          {gauge} Pressure
        </h2>
        <p className="pt-4 text-2xl bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          {pressure} hPa
        </p>
      </div>

      <p className="text-sm bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
        {getPressureDescription(pressure)}.
      </p>
    </div>
  );
}

export default Pressure;
