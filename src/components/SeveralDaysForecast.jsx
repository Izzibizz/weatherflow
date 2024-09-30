import { useForecastStore } from "../stores/useForecastStore"
import sunAnimation from "../assets/Animation-sun.json";
import cloudAnimation from "../assets/Animation-cloud.json";
import sunCloudAnimation from "../assets/Animation-sunCloud.json";
import rainAnimation from "../assets/Animation-rain.json";
import Lottie from "lottie-react";


export const SeveralDaysForecast = () => {

  const { extentionIsVisible, forecastData } = useForecastStore()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

   // Group forecast data by date
   const groupedForecast = forecastData.reduce((acc, day) => {
    const dateKey = day.dt_txt.split(" ")[0]; // Get the date part (YYYY-MM-DD)
    if (!acc[dateKey]) {
      acc[dateKey] = []; // Create a new array for this date if it doesn't exist
    }
    acc[dateKey].push(day); // Push the day's data into the corresponding date array
    return acc;
  }, {});

  // Convert the grouped object back to an array
  const dailyForecasts = Object.entries(groupedForecast).map(([date, days]) => {
    const minTemp = Math.min(...days.map(day => day.main.temp));
    const maxTemp = Math.max(...days.map(day => day.main.temp));
    const weatherDescription = days[0].weather[0].description; // Get the weather from the first entry
    return {
      date,
      minTemp,
      maxTemp,
      weatherDescription,
    };
  });

    const weatherNow = forecastData?.[0]?.weather?.[0]?.description;

  const animationByWeather = (weather) => {
    if (weather) {
      if (weather.includes("clear")) return sunAnimation;
      else if (weather === "few clouds" || weatherNow === "scattered clouds")
        return sunCloudAnimation;
      else if (weather.includes("clouds")) return cloudAnimation;
      else if (weather.includes("rain")) return rainAnimation;
    }
    return sunAnimation;
  };

  return (
    <div
    className={`bg-white w-full transition-all duration-500 fadeIn ease-in-out hide-scrollbar rounded-b-[2.4rem] p-8 py-10 font-body ${
      extentionIsVisible ? "h-0 opacity-0" : "h-fit tablet:h-[292px] opacity-100"
    }`}>
    <ul className="flex flex-col gap-4">
    {dailyForecasts.map((day, index) => {
        const forecastDate = new Date(day.date);
        const dayIndex = forecastDate.getDay();
        const weekday = weekdays[dayIndex];

           return (
            <li key={index} className="border-b-2 border-dotted pb-4 flex justify-evenly items-center">
              <p>{weekday}</p>
              <Lottie
                    animationData={animationByWeather(day.weatherDescription)}
                    loop
                    autoPlay
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    className={`${
                      day.weatherDescription.includes("rain") && "transform scale-x-[-1]"
                    }`}
                  />
                  <div className="p-2 px-4 flex bg-gray-400 bg-opacity-20 rounded-xl gap-2 items-center">
                 <p>{Math.round(day.minTemp)}°</p> 
                 <div className="w-[1px] h-[20px] bg-black"></div>
                 <p>{Math.round(day.maxTemp)}°</p>
                 </div>
            </li>
          );
        })}
    </ul>
    </div>
  )
}