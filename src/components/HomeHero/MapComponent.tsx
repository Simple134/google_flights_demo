"use client";

import { useEffect, useState } from 'react';
import { useTheme } from '@/src/context/useTheme';
import Card from '../card';
import StyledMap from '../StyledMap';

interface Location {
    name: string;
    date: string;
    duration: string;
    price: string;
    direct: boolean;
    image: string;
}

interface MapComponentProps {
    location: {
        latitude: number;
        longitude: number;
    } | null;
    nearbyAirports: any | null;
}

const featuredDestinations: Location[] = [
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

const MapComponent = ({ location, nearbyAirports }: MapComponentProps) => {
    const { theme } = useTheme();

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4 py-8 space-y-8">
            {/* Title Section */}
            <p className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Find cheap flights from {nearbyAirports?.data?.current?.presentation?.title} to anywhere
            </p>
 

            {/* Map Section */}
            <div className="w-full flex items-center justify-center h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
                <StyledMap
                    center={location ? { lat: location.latitude, lng: location.longitude } : undefined}
                    height={400}
                    zoom={10}
                    query={nearbyAirports?.data?.current?.presentation?.title || ''}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                {featuredDestinations.map((destination, index) => (
                    <Card key={index} {...destination} />
                ))}
            </div>
        </div>
    );
};

export default MapComponent;