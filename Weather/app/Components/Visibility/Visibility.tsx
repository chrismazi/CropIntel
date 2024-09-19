"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { eye } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col 
        gap-8 dark:bg-dark-grey shadow-sm border-[#84a847ee] dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
          {Math.round(visibility / 1000)} km
        </p>
      </div>

      <p className="text-sm bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
        {getVisibilityDescription(visibility)}.
      </p>
    </div>
  );
}

export default Visibility;
