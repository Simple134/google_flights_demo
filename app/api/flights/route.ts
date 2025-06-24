import { NextResponse } from 'next/server';
import type { FlightSearchParams } from '../../../src/api/flights/types';

const API_KEY = process.env.SKYSCRAPPER_API_KEY;
const API_HOST = 'sky-scrapper.p.rapidapi.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params: FlightSearchParams = {
      origin: searchParams.get('origin') || '',
      destination: searchParams.get('destination') || '',
      departureDate: searchParams.get('departureDate') || '',
      returnDate: searchParams.get('returnDate') || undefined,
      adults: parseInt(searchParams.get('adults') || '1'),
      currency: searchParams.get('currency') || 'USD'
    };

    const response = await fetch(`https://${API_HOST}/api/v1/flights/search`, {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': API_KEY || '',
        'X-RapidAPI-Host': API_HOST,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flights' },
      { status: 500 }
    );
  }
} 