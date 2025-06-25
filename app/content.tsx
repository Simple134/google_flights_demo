import HomeHero from "@/src/components/HomeHero/FlightSearch"
import Header from "@/src/components/HomeHero/Header"
import MapComponent from "@/src/components/HomeHero/MapComponent"

interface ContentProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  nearbyAirports: any | null;
}

export default function Content({ location, nearbyAirports }: ContentProps) {
  return (
    <div>
      <Header />
      <HomeHero location={location} airports={nearbyAirports} />
      <MapComponent location={location} nearbyAirports={nearbyAirports} />
    </div>
  );
}
