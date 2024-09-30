import { TodaysForecast } from "../components/TodaysForecast"
import { SeveralDaysForecast } from "../components/SeveralDaysForecast"
import { useEffect } from "react"
import { useForecastStore } from "../stores/useForecastStore"
import { Loading } from "../components/Loading"

export const Forecasts = () => {

  const { fetchForecast, forecastData, loading, error, city } = useForecastStore()

  useEffect(() => {
    if (city === "" ) {
    fetchForecast((`q=stockholm`));  // Fetch forecast on mount
    }
  }, []); // Empty dependency array

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      {forecastData ? (
        <>
          <TodaysForecast />  
          <SeveralDaysForecast /> 
        </>
      ) : (
        <div>No forecast data available</div>
      )}
    </div>
  );
};