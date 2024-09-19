"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="w-full" style={{ height: "auto" }} />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col gap-4 
        dark:bg-dark-grey shadow-sm border-[#84a847ee] dark:shadow-none"
      style={{ minHeight: "12rem" }} // Allows the box to expand based on content
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          {formatNumber(city.population)}
        </p>
      </div>
      <p className="text-sm bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
        Latest UN population data for {city.name}.
      </p>
    </div>
  );
}

export default Population;
