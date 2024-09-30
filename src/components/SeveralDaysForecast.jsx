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
    className={`${bgColorByWeather()} w-full transition-all duration-500 fadeIn ease-in-out overflow-y-auto hide-scrollbar rounded-b-[2.4rem] p-8 py-10 font-body ${
      extentionIsVisible ? "h-0 opacity-0" : "h-fit tablet:h-[292px] opacity-100"
    }`}>
    <ul className="flex flex-col gap-8">
    {dailyForecasts.map((day, index) => {
        const forecastDate = new Date(day.date);
        const dayIndex = forecastDate.getDay();
        const weekday = weekdays[dayIndex];

           return (
            <li key={index} className="border-b pb-4 flex justify-evenly">
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
                 <p>{Math.round(day.minTemp)}°</p> 
                 <div className="w-[1px] h-[30px] bg-black"></div>
                 <p>{Math.round(day.maxTemp)}°</p>
            </li>
          );
        })}
    </ul>
    </div>
  )
}