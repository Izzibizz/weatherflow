import { useState, useEffect } from "react";
import { useForecastStore } from "../stores/useForecastStore";

export const GetLocation = () => {
  const { userLocation, setUserLocation, fetchForecast } = useForecastStore() 
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        })
    } else {
      setError("Geolocation is not supported by this browser.");
      console.log(error)
    }
  };

  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      console.log("User location updated:", userLocation);
      fetchForecast(`lat=${userLocation.latitude}&lon=${userLocation.longitude}`)
    }
  }, [userLocation]);
  return (
    <button onClick={handleGetLocation}>
      <img
        src="/location2.svg"
        alt="geografic location"
        className="w-10 h-10 hover:scale-110"
      />
    </button>
  );
};
