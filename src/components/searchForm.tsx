"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  User,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft,
  Check
} from "lucide-react";
import PassengerSelector from "./passangerSelector";
import { useTheme } from "@/src/context/useTheme";

const SearchForm = () => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "multicity">("roundtrip");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState<"Economy" | "Premium Economy" | "Business" | "First">("Economy");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripTypeOpen, setTripTypeOpen] = useState(false);
  const [cabinClassOpen, setCabinClassOpen] = useState(false);
  const { theme } = useTheme();

  const handleTripTypeChange = (newType: "roundtrip" | "oneway" | "multicity") => {
    setTripType(newType);
    setTripTypeOpen(false);
  };

  const handleCabinClassChange = (newClass: "Economy" | "Premium Economy" | "Business" | "First") => {
    setCabinClass(newClass);
    setCabinClassOpen(false);
  };

  const handleSearch = () => {
    console.log("Search:", {
      tripType,
      passengers,
      cabinClass,
      origin,
      destination,
      departureDate,
      returnDate,
    });
  };

  return (
    <div
      className={`w-screen p-4 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-[#303134]" : "bg-white"
      } flex flex-col items-center`}
    >
      {/* Trip type and passenger selection row */}
      <div className="flex items-center gap-4 mb-4 w-full">
        <div className="flex items-center gap-4  w-1/2">
          <div
            className="relative flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg"
            onClick={() => setTripTypeOpen(!tripTypeOpen)}
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-500" />
            <p className="text-gray-500">{tripType === 'roundtrip' ? 'Round trip' : tripType === 'oneway' ? 'One way' : 'Multi-city'}</p>
            <ChevronDown className="w-5 h-5 text-gray-500" />
            {tripTypeOpen && (
              <div className="absolute -bottom-25 left-0 w-full bg-white dark:bg-gray-800 p-2 rounded-lg flex flex-col gap-2 shadow-lg z-10">
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleTripTypeChange("roundtrip")}
                >
                  <span>Round trip</span>
                  {tripType === "roundtrip" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleTripTypeChange("oneway")}
                >
                  <span>One way</span>
                  {tripType === "oneway" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleTripTypeChange("multicity")}
                >
                  <span>Multi-city</span>
                  {tripType === "multicity" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg">
            <User className="w-5 h-5 text-gray-500" />
            {passengers.adults}
          </div>
          <div
            className="relative flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg"
            onClick={() => setCabinClassOpen(!cabinClassOpen)}
          >
            <p className="text-gray-500">{cabinClass}</p>
            <ChevronDown className="w-5 h-5 text-gray-500" />
            {cabinClassOpen && (
              <div className="absolute -bottom-25 left-0 w-48 bg-white dark:bg-gray-800 p-2 rounded-lg flex flex-col gap-2 shadow-lg z-10">
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleCabinClassChange("Economy")}
                >
                  <span>Economy</span>
                  {cabinClass === "Economy" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleCabinClassChange("Premium Economy")}
                >
                  <span>Premium Economy</span>
                  {cabinClass === "Premium Economy" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleCabinClassChange("Business")}
                >
                  <span>Business</span>
                  {cabinClass === "Business" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
                <div 
                  className="text-gray-500 flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleCabinClassChange("First")}
                >
                  <span>First</span>
                  {cabinClass === "First" && <Check className="w-5 h-5 text-blue-500" />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Where from?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 "
          />
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 p-3 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="flex-1 p-3 bg-transparent"
          />

          {tripType === "roundtrip" && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="flex-1 p-3 bg-transparent"
            />
          )}
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search flights
      </button>
    </div>
  );
};

export default SearchForm;
