import { useForecastStore } from "../stores/useForecastStore";
import Lottie from "lottie-react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import sunAnimation from "../assets/Animation-sun.json";
import cloudAnimation from "../assets/Animation-cloud.json";
import sunCloudAnimation from "../assets/Animation-sunCloud.json";
import rainAnimation from "../assets/Animation-rain.json";
import { useSwipeable } from "react-swipeable";

export const TodaysForecast = () => {
  const {
    forecastData,
    city,
    extentionIsVisible,
    setExtentionIsVisible,
    sunrise,
    sunset,
  } = useForecastStore();

  //weather virables
  const weatherNow = forecastData?.[0]?.weather?.[0]?.description;
  const temperatureNow = Math.round(forecastData?.[0]?.main?.temp);
  const minTemp = Math.round(forecastData?.[0]?.main?.temp_min);
  const maxTemp = Math.round(forecastData?.[0]?.main?.temp_max);
  const timeSunrise = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeSunset = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const humidity = forecastData?.[0]?.main?.humidity;
  const clouds = forecastData?.[0]?.clouds?.all;
  const windGust = forecastData?.[0]?.wind?.gust;
  const windSpeed = forecastData?.[0]?.wind?.speed;
  const visibility = forecastData?.[0]?.visibility / 1000;

  const viewIsClear = visibility > 7;
  const foggy = visibility < 4;

  //hour by hour

  const filteredForecast = forecastData.slice(1, 9);

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("Swiped Left!"),
    onSwipedRight: () => console.log("Swiped Right!"),
  });

  const videoByWeather = () => {
    if (weatherNow) {
      if (weatherNow === "few clouds")
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146428/little-clouds_ne5eaw.mp4";
      else if (weatherNow === "scattered clouds")
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146429/scattered-clouds_hymr9l.mp4";
      else if (weatherNow?.includes("clouds"))
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146427/broken-clouds_yabiso.mp4";
      else if (weatherNow?.includes("clear"))
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146442/clear_bpyvlj.mp4";
      else if (weatherNow?.includes("thunderstorm"))
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146452/rain-thunder_pwnr4q.mov";
      else if (weatherNow?.includes("rain"))
        return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146440/rain_wgjndm.mov";
    }
    return "/clear.mp4";
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

  const textColorByWeather = () => {
    if (weatherNow) {
      if (weatherNow.includes("clear")) return "text-white"; // Example color for clear weather
      if (weatherNow === "few clouds" || weatherNow === "scattered clouds")
        return "text-darkBlue"; // Example color for cloudy weather
      if (weatherNow.includes("clouds")) return "text-gray-800"; // Example color for overcast
      if (weatherNow.includes("rain")) return "text-lightBlue"; // Example color for rain
      // Add more conditions for other weather types as needed
    }
    return "text-darkBlue"; // Default text color
  };

  const handleArrowClick = () => {
    setExtentionIsVisible(!extentionIsVisible);
  };

  console.log(forecastData);

  return (
    <div
      className={`${
        extentionIsVisible
          ? "h-screen tablet:h-[734px] tablet:rounded-b-[2.4rem]"
          : "h-[440px] phone:h-[470px] tablet:h-[440px]"
      } gap-4 flex flex-col relative z-20 transform transition-all duration-500 ease-in-out fadeIn `}
    >
      <video
        className={`${
          extentionIsVisible
            ? " tablet:rounded-b-[2.4rem]"
            : "tablet:rounded-b-none"
        } h-full object-cover w-full transform transition-all absolute z-10  duration-500 ease-in-out fadeIn tablet:rounded-t-[2.4rem] `}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        src={videoByWeather()}
      />
      <div
        className={`h-fit z-30 mt-[120px] px-8 transition-all duration-500 ease-in-out flex-col gap-4 flex w-full ${textColorByWeather()}`}
      >
        <div className="flex justify-between">
          <div
            className={`flex flex-col transition-all duration-500 ease-in-out font-heading`}
          >
            <h2
              className={` flex drop-shadow-xl text-[60px] tracking-wider transition-all duration-500 ease-in-out  ${
                extentionIsVisible && "ml-4"
              }`}
            >
              {temperatureNow}
              <span className="text-[30px] ">°</span>
            </h2>
            <div
              className={`flex flex-col gap-2 transition-all duration-500 ease-in-out ${
                extentionIsVisible &&
                "drop-shadow-xl bg-darkBlue bg-opacity-20 rounded-xl p-4 text-white"
              } `}
            >
              <h3 className={`font-body font-bold drop-shadow-xl uppercase`}>
                {weatherNow}
              </h3>
              <p className="font-body drop-shadow-xl">{city}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Lottie
              animationData={animationByWeather(weatherNow)}
              loop
              autoPlay
              style={{
                width: extentionIsVisible ? 140 : 100,
                height: extentionIsVisible ? 140 : 100,
                transition: "width 0.5s ease, height 0.5s ease",
              }}
              className={`${
                weatherNow?.includes("rain") && "transform scale-x-[-1]"
              }`}
            />
            <div
              className={`flex items-center gap-2 text-sm w-fit transition-all duration-500 justify-center ease-in-out ${
                extentionIsVisible &&
                "bg-darkBlue bg-opacity-20 rounded-xl p-4 text-white drop-shadow-xl"
              }`}
            >
              <p>
                H: {maxTemp}
                <span className="text-[10px] align-super">°</span>
              </p>{" "}
              <div className="w-[2px] h-[30px] bg-white"></div>
              <p>
                L: {minTemp}
                <span className="text-[10px] align-super">°</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-darkBlue bg-opacity-20 rounded-xl p-4 h-fit text-white drop-shadow-xl overflow-x-auto hide-scrollbar"
          {...handlers}
        >
          <ul className="flex gap-2 ">
            {filteredForecast.map((hour, index) => {
              // Extract the hour from dt_txt
              const hourDisplay = hour.dt_txt.split(" ")[1].split(":")[0];
              return (
                <li key={index} className="flex flex-col gap-2 items-center">
                  <p>{hourDisplay}</p>
                  <Lottie
                    animationData={animationByWeather(hour.weather[0]?.description)}
                    loop
                    autoPlay
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    className={`${
                      hour.weather[0]?.description.includes("rain") && "transform scale-x-[-1]"
                    }`}
                  />
                  <p>{Math.round(hour.main.temp)}°</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        onClick={handleArrowClick}
        className={`hover:scale-125 hover:cursor-pointer absolute z-40 left-8 flex justify-center items-center transform  transition-all duration-500 ease-in-out fadeIn
     flex ${
       extentionIsVisible
         ? " top-[83%] tablet:top-[90%] "
         : "top-[420px] phone:top-[450px] tablet:top-[410px]"
     }`}
      >
        <img
          src="/cicrle.svg"
          alt="circle see more"
          className="w-10 h-10 tablet:w-14 tablet:h-14  z-50"
        />
        <SlArrowDown
          className={`${
            extentionIsVisible ? "hidden" : "flex"
          } w-5 h-5 tablet:w-8 tablet:h-8 text-white absolute  z-50 fadeIn `}
        />
        <SlArrowUp
          className={`${
            extentionIsVisible ? "flex" : "hidden"
          } w-5 h-5 tablet:w-8 tablet:h-8 text-white absolute z-50 fadeIn`}
        />
      </div>

      <div
        className={`${
          extentionIsVisible ? "opacity-100 visible" : "opacity-0 invisible"
        } z-30 flex flex-col gap-6 transition-opacity duration-1000 ease-in-out h-fit mx-8 font-body text-white`}
      >
        <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-full flex gap-6 p-4 text-sm justify-evenly">
          <div className="flex flex-col">
            <p>Sunrise: {timeSunrise}</p>
            <p>Sunset: {timeSunset}</p>
          </div>
          <div className="w-[2px] bg-white"></div>
          <div>
            <p>Humidity: {humidity} %</p>
            <p>Clouds: {clouds} %</p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-fit flex gap-6 p-4">
            <div className="flex flex-col">
              <h4>Wind</h4>
              <p>Gust: {windGust} mm/s</p>
              <p>Speed: {windSpeed} mm/s</p>
            </div>
          </div>
          <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-fit flex gap-6 p-4">
            <div className="flex flex-col">
              <p>Visibility: {visibility} km</p>
              <p>
                The view is{" "}
                {viewIsClear ? "clear" : foggy ? "foggy" : "uncertain"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
