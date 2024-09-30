import { TodaysForecast } from "../components/TodaysForecast"
import { SeveralDaysForecast } from "../components/SeveralDaysForecast"
import { useEffect } from "react"
import { useForecastStore } from "../stores/useForecastStore"
import { Loading } from "../components/Loading"
import { ErrorMessage } from "../components/ErrorMessage"

export const Forecasts = () => {

  const { fetchForecast, forecastData, loading, error, city } = useForecastStore()

  useEffect(() => {
    if (city === "" ) {
    fetchForecast((`q=stockholm`));  // Fetch forecast on mount
    }
  }, [city, fetchForecast]); // Empty dependency array

  if (!city && loading) return <Loading />;

  return (
    <div className="flex flex-col">
      {forecastData && (
        <>
          <TodaysForecast />  
          <SeveralDaysForecast /> 
        </>
      )} 
      { error && (
        <ErrorMessage/>
      )}
    </div>
  );
};