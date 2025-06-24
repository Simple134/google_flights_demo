"use client";
import { useState } from "react";
import PassengerSelector from "../passangerSelector";
import { Plane, ArrowLeftRight } from "lucide-react";
import SearchForm from "../searchForm";
import { useTheme } from "@/src/context/useTheme";

const FlightSearch = () => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const { theme } = useTheme();

  const handleSearch = () => {
    console.log("Flight search:", {
      tripType,
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
    });
  };

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
          className="w-full h-auto object-cover"
        />
        <h1 className="text-6xl font-google-sans absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Flights
        </h1>
      </div>
      <div className="w-full flex items-center justify-center p-12">
        <SearchForm />
      </div>
    </div>
  );
};

export default FlightSearch;
