"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/src/components/HomeHero/Header";
import SearchForm from "@/src/components/searchForm";
import Card from "@/src/components/card";
import StyledMap from "@/src/components/StyledMap";

interface FlightSearchParams {
  tripType: "roundtrip" | "oneway" | "multicity";
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  cabinClass: "Economy" | "Premium Economy" | "Business" | "First";
  adults: number;
  children: number;
  infantsOnLap: number;
  infantsInSeat: number;
}



export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchData, setSearchData] = useState<FlightSearchParams | null>(null);

  const featuredDestinations = [
    {
        name: "Paris",
        date: "Oct 19-28",
        duration: "13h 47min",
        price: "722 €",
        direct: false,
        image: "city/paris.png"
    },
    {
        name: "New York",
        date: "Jul 3-12",
        duration: "3h 42min",
        price: "385 €",
        direct: true,
        image: "city/newYork.png"
    },
    {
        name: "London",
        date: "Aug 15-22",
        duration: "11h 30min",
        price: "65 €",
        direct: false,
        image: "city/london.png"
    },
    {
        name: "Singapore",
        date: "Sep 5-15",
        duration: "16h 20min",
        price: 890 + " €",
        direct: false,
        image: "city/singapore.png"
    }
];

  useEffect(() => {
    const params: FlightSearchParams = {
      tripType:
        (searchParams.get("tripType") as FlightSearchParams["tripType"]) ||
        "roundtrip",
      origin: decodeURIComponent(searchParams.get("origin") || ""),
      destination: decodeURIComponent(searchParams.get("destination") || ""),
      departureDate: searchParams.get("departureDate") || "",
      returnDate: searchParams.get("returnDate") || "",
      cabinClass:
        (searchParams.get("cabinClass") as FlightSearchParams["cabinClass"]) ||
        "Economy",
      adults: parseInt(searchParams.get("adults") || "0", 10),
      children: parseInt(searchParams.get("children") || "0", 10),
      infantsOnLap: parseInt(searchParams.get("infantsOnLap") || "0", 10),
      infantsInSeat: parseInt(searchParams.get("infantsInSeat") || "0", 10),
    };
    setSearchData(params);
  }, [searchParams]);
  

  if (!searchData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`w-full h-screen relative `}>
      <Header />
      <div className="flex flex-row h-full">
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 h-full overflow-y-auto p-4">
          <SearchForm hideSearchButton forceCompactLayout />
          <div className="flex flex-col gap-4 mt-4 pb-8">
            {featuredDestinations.map((destination, index) => (
            <Card
              key={index}
              direct={true}
              name={destination.name}
              date={destination.date}
              duration={destination.duration}
              price={destination.price}
              image={destination.image}
            />
            ))}
          </div>
        </div>
        
        {/* Contenedor derecho fijo con el mapa */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3 h-full fixed right-0 top-0">
          <StyledMap
            height={typeof window !== 'undefined' ? window.innerHeight : 600}
            query={searchData?.destination || "Santiago"}
            zoom={12}
          />
        </div>
      </div>
    </div>
  );
}