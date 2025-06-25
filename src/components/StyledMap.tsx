"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/src/context/useTheme';

interface StyledMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string | number;
  query?: string;
}

const StyledMap = ({ 
  center = { lat: -33.4489, lng: -70.6693 }, // Santiago por defecto
  zoom = 10,
  height = '100%',
  query = 'Santiago' 
}: StyledMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const { theme } = useTheme();

  // Estilos para dark mode (basado en la documentación de Google Maps)
  const darkModeStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  // Estilos para light mode (estilo por defecto limpio)
  const lightModeStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapOptions: google.maps.MapOptions = {
      center,
      zoom,
      styles: theme === 'dark' ? darkModeStyles : lightModeStyles,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

    // Agregar marcador si hay una consulta específica
    if (query && mapInstanceRef.current) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: query }, (results, status) => {
        if (status === 'OK' && results && results[0] && mapInstanceRef.current) {
          const location = results[0].geometry.location;
          mapInstanceRef.current.setCenter(location);
          
          new google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: query,
          });
        }
      });
    }
  };

  // Actualizar estilos cuando cambia el tema
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setOptions({
        styles: theme === 'dark' ? darkModeStyles : lightModeStyles,
      });
    }
  }, [theme]);

  // Cargar Google Maps API si no está disponible
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Verificar si ya existe un script de Google Maps
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        existingScript.addEventListener('load', initMap);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [center, zoom, query]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '8px',
        overflow: 'hidden'
      }}
      className="shadow-lg"
    />
  );
};

export default StyledMap; 