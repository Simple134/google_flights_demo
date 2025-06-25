import { useTheme } from "@/src/context/useTheme";

interface CardProps {
  name: string;
  date: string;
  duration: string;
  price: string;
  direct: boolean;
  image: string;
}

const Card = ({ name, date, duration, price, direct, image }: CardProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full h-full flex flex-row md:flex-col overflow-hidden p-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="w-full h-full flex overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain rounded-lg"
          style={{
            aspectRatio: "4/3",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex flex-row justify-between items-center">
            <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {name}
            </h4>
            <p className={`text-md font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {price}
            </p>
        </div>
        
        <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {date}
            </p>
        </div>
        <div className="flex items-center gap-2">
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {duration}
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {direct ? "Direct" : "1 stop"}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
