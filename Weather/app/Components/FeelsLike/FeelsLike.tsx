"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="w-full" style={{ height: "auto" }} />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col gap-4 
      dark:bg-dark-grey shadow-sm border-[#84a847ee] dark:shadow-none"
      style={{ minHeight: "12rem" }} // Allows dynamic height based on content
    >
      <div className="top">
        <h2
          className="flex items-center gap-2 font-medium bg-gradient-to-r 
          from-black to-[#84a847ee] text-transparent bg-clip-text 
          dark:text-white"
        >
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl" style={{ color: '#84a847ee' }}>
          {kelvinToCelsius(feels_like)}°
        </p>
      </div>

      <p
        className="text-sm dark:text-white bg-gradient-to-r from-black 
        to-[#84a847ee] text-transparent bg-clip-text"
      >
        {feelsLikeDescription}
      </p>
    </div>
  );
}

export default FeelsLike;
