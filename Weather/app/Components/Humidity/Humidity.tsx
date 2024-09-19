"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="w-full" style={{ height: "auto" }} />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30)
      return "Low Humidity: Best for drought-resistant crops like Millet.";
    if (humidity >= 30 && humidity < 50)
      return "Moderate Humidity: Ideal for staple crops like Wheat.";
    if (humidity >= 50 && humidity < 70)
      return "High Humidity: Best for water-intensive crops like Rice.";
    if (humidity >= 70)
      return "Very High Humidity: Ideal for tropical crops like Bananas.";
    return "Unavailable: Humidity data not available.";
  };

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
      gap-4 dark:bg-dark-grey shadow-sm border-[#84a847ee] dark:shadow-none"
      style={{ minHeight: "12rem" }} // Allows dynamic height based on content
    >
      <div className="top">
        <h2
          className="flex items-center gap-2 font-medium bg-gradient-to-r 
          from-black to-[#84a847ee] text-transparent bg-clip-text 
          dark:text-white"
        >
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl" style={{ color: '#84a847ee' }}>
          {humidity}%
        </p>
      </div>

      <p
        className="text-sm dark:text-white bg-gradient-to-r from-black 
        to-[#84a847ee] text-transparent bg-clip-text"
      >
        {getHumidityText(humidity)}
      </p>
    </div>
  );
}

export default Humidity;
