"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext, useGlobalContextUpdate } from "../context/globalContext"; // Import the context update hook

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext(); // Optional, if needed elsewhere
  const { setActiveCityCoords } = useGlobalContextUpdate(); // Get setActiveCityCoords from the context update

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          

          {/* Get Current Location Button */}
          <Button
  className="current-location-btn flex items-center gap-2"
  style={{ backgroundColor: '#84a847ee', color: '#fff' }} // Add color and text color
  onClick={() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveCityCoords([latitude, longitude]); // Update activeCityCoords in the context
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }}
>
  Get Current Location
</Button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
