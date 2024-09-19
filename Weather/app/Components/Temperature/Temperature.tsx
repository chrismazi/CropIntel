"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formattedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between shadow-sm border-[#84a847ee] 
        dark:bg-dark-grey dark:text-white"
    >
      {/* Date and Time */}
      <p className="flex justify-between items-center bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white font-medium">
        <span>{currentDay}</span>
        <span>{localTime}</span>
      </p>

      {/* Location */}
      <p className="pt-2 flex gap-1 bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white font-medium">
        <span>{name}</span>
        <span className="text-3xl">{navigation}</span>
      </p>

      {/* Temperature */}
      <p className="py-10 text-9xl font-medium self-center" style={{ color: '#84a847ee' }}>
        {temp}°
      </p>

      {/* Weather Details */}
      <div>
        <div className="flex items-center">
          <span className="text-5xl">{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium bg-gradient-to-r from-black to-[#84a847ee] text-transparent bg-clip-text dark:text-white">
            {description}
          </p>
        </div>

        {/* High and Low Temperatures */}
        <p className="flex items-center gap-2 text-black dark:text-white font-medium">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
