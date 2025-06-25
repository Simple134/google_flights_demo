export async function getCloseAirport(lat: number, lon: number) {
  const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  if (!rapidApiKey) {
    return { error: 'RapidAPI key is not configured' };
  }
  try {
    const response = await fetch(`https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${lat}&lng=${lon}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      }
    });
    const result = await response.json();
    console.log(result, "result");
    return result;
  } catch (error) {
    console.error('Error fetching nearby airports:', error);
    return { error: 'Failed to fetch nearby airports' };
  }
}
