"use client";

import { useState, useEffect, useRef } from "react";
import {
    ArrowLeftRight,
    User,
    ChevronDown,
    ChevronUp,
    ArrowRightLeft,
    Check,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Search,
} from "lucide-react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from "@ubilabs/react-geosuggest";
import PassengerSelector from "./passangerSelector";
import { useTheme } from "@/src/context/useTheme";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";

interface SearchFormProps {
    location?: {
        latitude: number;
        longitude: number;
    } | null;
    nearbyAirports?: any | null;
    hideSearchButton?: boolean;
    forceCompactLayout?: boolean;
}

const SearchForm = ({ location, nearbyAirports, hideSearchButton, forceCompactLayout }: SearchFormProps) => {
    const [tripType, setTripType] = useState<
        "roundtrip" | "oneway" | "multicity"
    >("roundtrip");
    const [passengers, setPassengers] = useState({
        adults: 0,
        children: 0,
        infantsOnLap: 0,
        infantsInSeat: 0,
    });
    const [cabinClass, setCabinClass] = useState<
        "Economy" | "Premium Economy" | "Business" | "First"
    >("Economy");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [tripTypeOpen, setTripTypeOpen] = useState(false);
    const [cabinClassOpen, setCabinClassOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datesSelected, setDatesSelected] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { theme } = useTheme();
    const originGeoSuggestRef = useRef<any>(null);
    const destinationGeoSuggestRef = useRef<any>(null);
    const [passengerSelectorOpen, setPassengerSelectorOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const searchAirports = async () => {
        try {
            const url = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '62dabbf527mshe4b52669796bad4p175a6bjsn0c270882ef0b',
                    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
                }
            };
            
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error('Error searching airports:', error);
                return null;
            }
        }
        searchAirports();
    }, []);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        if (nearbyAirports?.status) {
            setOrigin(nearbyAirports.data.current.presentation.title);
        }
    }, [nearbyAirports]);

    const handleOriginSelect = (suggest: any) => {
        if (suggest) {
            setOrigin(suggest.label);
        }
    };

    const handleDestinationSelect = (suggest: any) => {
        if (suggest) {
            setDestination(suggest.label);
        }
    };

    const handleOriginChange = (value: string) => {
        setOrigin(value);
        if (value.length > 2) {
        }
    };

    const handleDestinationChange = (value: string) => {
        setDestination(value);
        if (value.length > 2) {
        }
    };

    const [dateState, setDateState] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const formatDate = (date?: Date): string => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };
    const handleTripTypeChange = (
        newType: "roundtrip" | "oneway" | "multicity"
    ) => {
        setTripType(newType);
        setTripTypeOpen(false);
    };

    const handleCabinClassChange = (
        newClass: "Economy" | "Premium Economy" | "Business" | "First"
    ) => {
        setCabinClass(newClass);
        setCabinClassOpen(false);
    };

    const handleDateNavigation = (direction: 'left' | 'right', dateType: 'start' | 'end') => {
        setDateState(prevState => {
            const newState = [...prevState];
            if (dateType === 'start') {
                const currentStartDate = newState[0].startDate as Date;
                newState[0].startDate = direction === 'left'
                    ? addDays(currentStartDate, -1)
                    : addDays(currentStartDate, 1);
            } else {
                const currentEndDate = newState[0].endDate as Date;
                newState[0].endDate = direction === 'left'
                    ? addDays(currentEndDate, -1)
                    : addDays(currentEndDate, 1);
            }
            return newState;
        });
    };

    const handleSearch = () => {
        // Create URL parameters
        const params = new URLSearchParams({
            tripType,
            origin: encodeURIComponent(origin),
            destination: encodeURIComponent(destination),
            departureDate: dateState[0]?.startDate?.toISOString() || '',
            returnDate: dateState[0]?.endDate?.toISOString() || '',
            cabinClass,
            adults: passengers.adults.toString(),
            children: passengers.children.toString(),
            infantsOnLap: passengers.infantsOnLap.toString(),
            infantsInSeat: passengers.infantsInSeat.toString()
        });

        // Redirect to search page with parameters
        router.push(`/search?${params.toString()}`);
    };

    const renderSuggestItem = (suggest: any) => {
        return (
            <div 
                key={suggest.placeId || suggest.label}
                className={`p-2 cursor-pointer ${theme === "dark" ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-700"}`}
            >
                {suggest.description || suggest.label}
            </div>
        );
    };

    return (
        <div
            className={`relative w-full p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-[#303134]" : "bg-white"
                } flex flex-col items-center`}
        >
            {/* Trip type and passenger selection row */}
            <div className="flex items-center gap-4 mb-4 w-full">
                <div className="flex items-center gap-4 w-full">
                    <div
                        className={`flex relative items-center gap-2 cursor-pointer ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} p-2 rounded-lg`}
                        onClick={() => setTripTypeOpen(!tripTypeOpen)}
                    >
                        <ArrowRightLeft className="w-5 h-5 text-gray-500" />
                        <p className={`${theme === "dark" ? "text-white" : "text-gray-700"}`}>
                            {tripType === "roundtrip"
                                ? "Round trip"
                                : tripType === "oneway"
                                    ? "One way"
                                    : "Multi-city"}
                        </p>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                        {tripTypeOpen && (
                            <div className={`absolute -bottom-25 left-0 w-full ${theme === "dark" ? "bg-gray-800" : "bg-white"} p-2 rounded-lg flex flex-col gap-2 shadow-lg z-10`}>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleTripTypeChange("roundtrip")}
                                >
                                    <span>Round trip</span>
                                    {tripType === "roundtrip" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleTripTypeChange("oneway")}
                                >
                                    <span>One way</span>
                                    {tripType === "oneway" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleTripTypeChange("multicity")}
                                >
                                    <span>Multi-city</span>
                                    {tripType === "multicity" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                    onClick={() => setPassengerSelectorOpen(!passengerSelectorOpen)}
                    className={`flex relative items-center gap-2 cursor-pointer ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} p-2 rounded-lg`}>
                        <User className="w-5 h-5 text-gray-500" />
                        {passengers.adults + passengers.children + passengers.infantsInSeat + passengers.infantsOnLap}
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                        {passengerSelectorOpen && (
                            <PassengerSelector
                                passengers={passengers}
                                onChange={setPassengers}
                                onClose={() => setPassengerSelectorOpen(false)}
                            />
                        )}
                    </div>
                    <div
                        className={`relative flex items-center gap-2 cursor-pointer p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} `}
                        onClick={() => setCabinClassOpen(!cabinClassOpen)}
                    >
                        <p className={`${theme === "dark" ? "text-white hover:text-gray-300" : "text-gray-700 hover:text-gray-500 "}`}>{cabinClass}</p>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                        {cabinClassOpen && (
                            <div className={`absolute -bottom-25 left-0 w-48 ${theme === "dark" ? "bg-gray-800" : "bg-white"} p-2 rounded-lg flex flex-col gap-2 shadow-lg z-10`}>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleCabinClassChange("Economy")}
                                >
                                    <span>Economy</span>
                                    {cabinClass === "Economy" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleCabinClassChange("Premium Economy")}
                                >
                                    <span>Premium Economy</span>
                                    {cabinClass === "Premium Economy" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleCabinClassChange("Business")}
                                >
                                    <span>Business</span>
                                    {cabinClass === "Business" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                                <div
                                    className={`text-gray-500 flex items-center justify-between p-2 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} rounded cursor-pointer`}
                                    onClick={() => handleCabinClassChange("First")}
                                >
                                    <span>First</span>
                                    {cabinClass === "First" && (
                                        <Check className="w-5 h-5 text-blue-500" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full mb-4">
                <div className={`flex flex-col ${forceCompactLayout ? "" : "md:flex-row"} items-center gap-8 w-full max-w-4xl`}>
                    <div className="flex items-center gap-4 flex-1 w-full">
                        <div className="flex-1 p-3 rounded-lg border border-gray-300 relative">
                            <ReactGoogleMapLoader
                                params={{
                                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                                    libraries: "places",
                                }}
                                render={(googleMaps) => {
                                    if (googleMaps) {
                                        return (
                                            <Geosuggest
                                                key={origin}
                                                ref={originGeoSuggestRef}
                                                placeholder="Where from?"
                                                inputClassName="border-none outline-none text-gray-700 w-full"
                                                className="geosuggestDiv !m-0"
                                                renderSuggestItem={renderSuggestItem}
                                                style={{
                                                    input: {
                                                        border: "0px",
                                                        color: "gray",
                                                        padding: "0",
                                                        margin: "0",
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "0",
                                                        boxShadow: "none",
                                                        transition: "none",
                                                        background: "transparent",
                                                    },
                                                    suggests: {
                                                        width: "100%",
                                                    },
                                                }}
                                                initialValue={origin}
                                                onChange={handleOriginChange}
                                                onSuggestSelect={handleOriginSelect}
                                                autoComplete="off"
                                            />
                                        );
                                    } else {
                                        return (
                                            <input
                                                type="text"
                                                placeholder="Where from?"
                                                value={origin}
                                                onChange={(e) => setOrigin(e.target.value)}
                                                className="w-full border-none outline-none text-gray-700"
                                            />
                                        );
                                    }
                                }}
                            />
                        </div>
                        <div className="flex-1 p-3 rounded-lg border border-gray-300">
                            <ReactGoogleMapLoader
                                params={{
                                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                                    libraries: "places",
                                }}
                                render={(googleMaps) => {
                                    if (googleMaps) {
                                        return (
                                            <Geosuggest
                                                key={destination}
                                                ref={destinationGeoSuggestRef}
                                                placeholder="Where to?"
                                                inputClassName="border-none outline-none w-full placeholder:text-gray-500"
                                                className="geosuggestDiv !m-0"
                                                renderSuggestItem={renderSuggestItem}
                                                style={{
                                                    input: {
                                                        border: "0px",
                                                        padding: "0",
                                                        color: "gray",
                                                        margin: "0",
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "0",
                                                        boxShadow: "none",
                                                        transition: "none",
                                                        background: "transparent",
                                                    },
                                                    suggests: {
                                                        width: "100%",
                                                    },
                                                }}
                                                initialValue={destination}
                                                onChange={handleDestinationChange}
                                                onSuggestSelect={handleDestinationSelect}
                                                autoComplete="off"
                                            />
                                        );
                                    } else {
                                        return (
                                            <input
                                                type="text"
                                                placeholder="Where to?"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                className="w-full border-none outline-none text-gray-700"
                                            />
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={`flex items-center gap-4 w-full ${forceCompactLayout ? "" : "md:w-1/2"} border border-gray-300 p-3 rounded-lg relative`}>
                        <div
                            className="flex items-center cursor-pointer w-full"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                            <div className="flex items-center gap-2 w-full justify-between">
                                <div className={`text-gray-700 flex items-center gap-2 w-full justify-center ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    {datesSelected
                                        ? formatDate(dateState[0]?.startDate)
                                        : "Departure"}
                                    {datesSelected && (
                                        <div className={`text-gray-400 items-center gap-2 ${forceCompactLayout ? "hidden" : "hidden md:flex"}`}>
                                            <ChevronLeft
                                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDateNavigation('left', 'start');
                                                }}
                                            />
                                            <ChevronRight
                                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDateNavigation('right', 'start');
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={`text-gray-700 flex items-center gap-2 w-full justify-center ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
                                    <span className="text-gray-400 mx-2"> | </span>
                                    {datesSelected
                                        ? formatDate(dateState[0]?.endDate)
                                        : "Return"}
                                    {datesSelected && (
                                        <div className={`text-gray-400 items-center gap-2 ${forceCompactLayout ? "hidden" : "hidden md:flex"}`}>
                                            <ChevronLeft
                                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDateNavigation('left', 'end');
                                                }}
                                            />
                                            <ChevronRight
                                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDateNavigation('right', 'end');
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {showDatePicker && (
                            <div className="absolute top-10 right-1/2 translate-x-40 mt-2 z-50 shadow-lg rounded-lg">
                                <DateRange
                                    editableDateInputs={true}
                                    months={forceCompactLayout || isMobile ? 1 : 2}
                                    onChange={(item) => {
                                        if (item.selection) {
                                            setDateState([item.selection]);
                                            setDatesSelected(true);
                                            if (
                                                item.selection.startDate &&
                                                item.selection.endDate &&
                                                item.selection.startDate.getTime() !== item.selection.endDate.getTime()
                                            ) {
                                                setShowDatePicker(false);
                                            }
                                        }
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateState}
                                    direction="horizontal"
                                    minDate={new Date()}
                                    rangeColors={theme === "dark" ? ["#3d91ff"] : ["#3d91ff"]}
                                    className={`${theme === "dark" ? "dark-theme" : ""}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!hideSearchButton && (
                <button
                    onClick={handleSearch}
                    className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 p-4 h-10 rounded-full cursor-pointer ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-600 text-white"} `}
                >
                    <Search className="w-5 h-5" />
                    Search 
                </button>
            )}
        </div>
    );
};

export default SearchForm;
