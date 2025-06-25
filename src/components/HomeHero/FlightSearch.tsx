"use client";
import SearchForm from "../searchForm";
import { useTheme } from "@/src/context/useTheme";

interface FlightSearchProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  airports: any | null;
}

const FlightSearch = ({ location, airports }: FlightSearchProps) => {

  const { theme } = useTheme();
  const imageUrl =
    theme === "dark"
      ? "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
      : "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg";

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative flex flex-col items-center w-full">
        <img
          src={imageUrl}
          alt="Flights illustration"
          className="w-full h-full object-cover"
        />
        <h1 className="text-6xl font-google-sans absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Flights
        </h1>
      </div>
      <div className="w-full flex justify-center my-12 max-w-6xl px-4">
        <SearchForm location={location} nearbyAirports={airports} />
      </div>
    </div>
  );
};

export default FlightSearch;
