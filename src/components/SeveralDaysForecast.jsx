import { useForecastStore } from "../stores/useForecastStore"


export const SeveralDaysForecast = () => {

  const { extentionIsVisible, forecastData } = useForecastStore()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const filteredForecast = forecastData.filter((day) => 
    day.dt_txt.includes('12:00'))
    const fourDaysForecast = filteredForecast.slice(1)

    const weatherNow = forecastData?.[0]?.weather?.[0]?.description;
  // background

  const bgColorByWeather = () => {
    if (weatherNow) {
      if (weatherNow.includes("clear")) return "bg-white"; // Example color for clear weather
      if (weatherNow === "few clouds" || weatherNow === "scattered clouds")
        return "bg-lightBlue"; // Example color for cloudy weather
      if (weatherNow.includes("clouds")) return "bg-gray-600"; // Example color for overcast
      if (weatherNow.includes("rain")) return "bg-darkBlue"; // Example color for rain
      // Add more conditions for other weather types as needed
    }
    return "text-darkBlue"; // Default text color
  };

  return (
    <div
    className={`${bgColorByWeather()} w-full transition-all duration-500 fadeIn ease-in-out overflow-hidden rounded-b-[2.4rem] p-8 ${
      extentionIsVisible ? "h-0 opacity-0" : "h-[292px] opacity-100"
    }`}>
    <ul className="flex flex-col gap-8">
    {fourDaysForecast.map((day, index) => {
           const forecastDate = new Date(day.dt_txt);
           const dayIndex = forecastDate.getDay();
           const weekday = weekdays[dayIndex];

           return (
            <li key={index} className="border-b pb-4">
              {`${weekday}: ${day.weather[0].description}`}
            </li>
          );
        })}
    </ul>
    </div>
  )
}