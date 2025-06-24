import { useState } from "react";

import { ChevronDown } from "lucide-react";

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerSelectorProps {
  passengers: PassengerCount;
  onChange: (passengers: PassengerCount) => void;
}

const PassengerSelector = ({ passengers, onChange }: PassengerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updatePassengerCount = (type: keyof PassengerCount, increment: boolean) => {
    const newPassengers = { ...passengers };
    if (increment) {
      newPassengers[type]++;
    } else if (newPassengers[type] > 0) {
      if (type === "adults" && newPassengers[type] === 1) return;
      newPassengers[type]--;
    }
    onChange(newPassengers);
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Passengers</p>
      <div>
          <button
            className="h-14 w-full justify-between border-gray-300 hover:border-blue-500 text-base rounded-lg"
          >
            <span>{totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        <div className="w-80 p-6 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Adults</div>
                <div className="text-sm text-gray-500">Ages 18+</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updatePassengerCount("adults", false)}
                  disabled={passengers.adults <= 1}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{passengers.adults}</span>
                <button
                  onClick={() => updatePassengerCount("adults", true)}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Children</div>
                <div className="text-sm text-gray-500">Ages 2-17</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updatePassengerCount("children", false)}
                  disabled={passengers.children <= 0}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{passengers.children}</span>
                <button
                  onClick={() => updatePassengerCount("children", true)}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Infants</div>
                <div className="text-sm text-gray-500">Under 2</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updatePassengerCount("infants", false)}
                  disabled={passengers.infants <= 0}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{passengers.infants}</span>
                <button
                  onClick={() => updatePassengerCount("infants", true)}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
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