"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermo } from "@/app/utils/Icons";
import { airQulaityIndexText } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  // Check if airQuality is available and necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2
       border-[#84a847ee] bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}
        <span className="bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          Air Pollution
        </span>
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress bg-[#84a847ee]" />
      <p className="text-sm bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
        Air quality is {filteredIndex?.description}.
      </p>
    </div>
  );
}

export default AirPollution;
