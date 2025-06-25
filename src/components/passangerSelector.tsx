import { useState, useEffect } from "react";
import { useTheme } from "@/src/context/useTheme";

interface PassengerCount {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface PassengerSelectorProps {
  passengers: PassengerCount;
  onChange: (passengers: PassengerCount) => void;
  onClose: () => void;
}

const PassengerSelector = ({
  passengers,
  onChange,
  onClose,
}: PassengerSelectorProps) => {
  const { theme } = useTheme();
  const [tempPassengers, setTempPassengers] = useState<PassengerCount>(passengers);

  // Reset temp passengers when the component opens
  useEffect(() => {
    setTempPassengers(passengers);
  }, [passengers]);

  const updatePassengerCount = (
    type: keyof PassengerCount,
    increment: boolean
  ) => {
    const newPassengers = { ...tempPassengers };
    if (increment) {
      newPassengers[type]++;
    } else if (newPassengers[type] > 0) {
      if (type === "adults" && newPassengers[type] === 1) return;
      newPassengers[type]--;
    }
    setTempPassengers(newPassengers);
  };

  const handleDone = () => {
    onChange(tempPassengers);
    onClose();
  };

  const handleCancel = () => {
    setTempPassengers(passengers); // Reset to original state
    onClose();
  };

  return (
    <div
      className={`flex justify-center items-center z-50 absolute top-0 left-0 w-full h-full`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`w-full h-full `}>
        <div
          className={`w-80 p-6 ${theme === "dark" ? "bg-[#303134]" : "bg-white"}  shadow-lg rounded-lg z-50`}
        >
          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Adults
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updatePassengerCount("adults", false)}
                  disabled={tempPassengers.adults <= 1}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {tempPassengers.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengerCount("adults", true)}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-blue-500"
                      : "bg-blue-200 text-blue-700"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Children
                </div>
                <div className="text-sm text-gray-500">Ages 2-11</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updatePassengerCount("children", false)}
                  disabled={tempPassengers.children <= 0}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {tempPassengers.children}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengerCount("children", true)}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-blue-500"
                      : "bg-blue-200 text-blue-700"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants in Seat */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Infants
                </div>
                <div className="text-sm text-gray-500">In Seat</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updatePassengerCount("infantsInSeat", false)}
                  disabled={tempPassengers.infantsInSeat <= 0}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {tempPassengers.infantsInSeat}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengerCount("infantsInSeat", true)}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-blue-500"
                      : "bg-blue-200 text-blue-700"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants on Lap */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Infants
                </div>
                <div className="text-sm text-gray-500">On lap</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updatePassengerCount("infantsOnLap", false)}
                  disabled={tempPassengers.infantsOnLap <= 0}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {tempPassengers.infantsOnLap}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengerCount("infantsOnLap", true)}
                  className={`w-8 h-8 p-0 rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-blue-500"
                      : "bg-blue-200 text-blue-700"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-between w-full items-center">
              <button 
                onClick={handleCancel}
                className={`w-full py-2 px-4 rounded-lg ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={handleDone}
                className={`w-full py-2 px-4 rounded-lg ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerSelector;
