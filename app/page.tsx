import Content from './content';
import { getCloseAirport } from '../src/api/flights/getCloseAirport';

async function getLocationFromIP() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      latitude: data.lat,
      longitude: data.lon
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}

async function getNearbyAirports(lat: number, lon: number) {
  try {
    const response = await getCloseAirport(lat, lon);
    try {
      return response;
    } catch (e) {
        console.error('Failed to parse JSON response:', response);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error('Error fetching nearby airports:', error);
    return null;
  }
}

export default async function Page() {
  const location = await getLocationFromIP();
  let nearbyAirports = null;
  
  if (location) {
    nearbyAirports = await getNearbyAirports(location.latitude, location.longitude);
  }

  return <Content location={location } nearbyAirports={nearbyAirports} />;
}
