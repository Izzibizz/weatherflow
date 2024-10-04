import { useForecastStore } from "../stores/useForecastStore";
import { useEffect } from "react"
import Lottie from "lottie-react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { IoMdEye } from "react-icons/io";
import { WiCloudyWindy } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { GiSunset } from "react-icons/gi";
import { GiSunrise } from "react-icons/gi";
import { IoIosCloudy } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import sunAnimation from "../assets/Animation-sun.json";
import cloudAnimation from "../assets/Animation-cloud.json";
import sunCloudAnimation from "../assets/Animation-sunCloud.json";
import rainAnimation from "../assets/Animation-rain.json";
import thunderRainAnimation from "../assets/Animation-thunderRain.json"
import thunderAnimation from "../assets/Animation-thunder.json"
import moonClearAnimation from "../assets/Animation-nightClear.json"
import moonCloudAnimation from "../assets/Animation-nightCloud.json"
import moonRainAnimation from "../assets/Animation-nightRain.json"
import moonSnowAnimation from "../assets/Animation-nightSnow.json"
import mistAnimation from "../assets/Animation-fog.json"

export const TodaysForecast = () => {
  const {
    forecastData,
    extentionIsVisible,
    setExtentionIsVisible,
    sunrise,
    sunset,
    timezone,
    city,
    itIsNight,
    setItIsNight
  } = useForecastStore();

  //weather virables
 

  const weatherNow = forecastData?.[0]?.weather?.[0]?.description;
  const temperatureNow = Math.round(forecastData?.[0]?.main?.temp);
  const minTemp = Math.round(forecastData?.[0]?.main?.temp_min);
  const maxTemp = Math.round(forecastData?.[0]?.main?.temp_max);
  const timezoneOffsetInMilliseconds = timezone * 1000
  const timeSunrise = new Date((sunrise * 1000) + timezoneOffsetInMilliseconds)
  .toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // Force UTC to avoid local timezone interference
  });
  const timeSunset = new Date((sunset * 1000) + timezoneOffsetInMilliseconds)
  .toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // Force UTC to avoid local timezone interference
  });
  const humidity = forecastData?.[0]?.main?.humidity;
  const clouds = forecastData?.[0]?.clouds?.all;
  const windGust = forecastData?.[0]?.wind?.gust;
  const windSpeed = forecastData?.[0]?.wind?.speed;
  const visibility = forecastData?.[0]?.visibility / 1000;

  const viewIsClear = visibility > 7;
  const foggy = visibility < 4;

  //hour by hour

  const filteredForecast = forecastData.slice(1, 11);

  useEffect(() => {
    // Get the current UTC time
    const currentUtcTime = new Date().getTime(); // UTC time in milliseconds
  
    // Calculate the local time by adjusting the UTC time with the city's timezone offset
    const localTime = new Date(currentUtcTime + timezoneOffsetInMilliseconds);
  
    // Get the hour of the local time (0-23) in UTC context (which now reflects the correct local time for that city)
    const localHour = localTime.getUTCHours(); // This should now give you the correct local hour of the city
  
    // Check if it's later than 20:00 (8 PM) or earlier than 6 AM
    if (localHour >= 20 || localHour < 7) {
      setItIsNight(true);  // Set night mode
    } else {
      setItIsNight(false); // Set day mode
    }
  
    // Debugging logs to verify
    console.log("Local Time: ", city, localTime.toUTCString());
    console.log("Local Hour: ", city, localHour);
  }, [timezone, city]);

  const videoByWeather = () => {
    if (weatherNow) {
      if (itIsNight) {
        if (weatherNow === "few clouds" || weatherNow === "scattered clouds" || weatherNow === "broken clouds") {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727981549/clouds-night_1_snqijt.mp4";
        } else if (weatherNow.includes("clouds") || weatherNow.includes("mist")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727984981/clouds-night_2_jdnazx.mov";
        } else if (weatherNow.includes("snow")) {
          return "hhttps://res.cloudinary.com/dbf8xygxz/video/upload/v1728031997/vecteezy_winter-scene-in-cold-night-with-snow-falling-in-4k_1616757_by1jfp.mp4";
        } else if (weatherNow.includes("rain")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727983934/nightrain_sa70rc.mp4";
        } else if (weatherNow.includes("clear")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727983930/fewcloudsnight_rzofg7.mov";
        } else if (weatherNow.includes("thunderstorm")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727985190/1449846-hd_1906_1080_28fps_1_rmr10w.mp4";
        }
        
      } else {
        if (weatherNow === "few clouds") {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146428/little-clouds_ne5eaw.mp4";
        } else if (weatherNow === "scattered clouds" || weatherNow === "broken clouds") {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146429/scattered-clouds_hymr9l.mp4";
        } else if (weatherNow.includes("clouds")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146427/broken-clouds_yabiso.mp4";
        } else if (weatherNow.includes("clear")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146442/clear_bpyvlj.mp4";
        } else if (weatherNow.includes("snow")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1727981557/snow-day_r8cawa.mp4";
        } else if (weatherNow.includes("thunderstorm")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146452/rain-thunder_pwnr4q.mov";
        } else if (weatherNow.includes("rain") || weatherNow.includes("drizzle")) {
          return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146440/rain_wgjndm.mov";
        }
      }
    }
    
    return "/clear.mp4"; // Default case
  };

  const animationByWeather = ( weather, isHourNight = itIsNight) => {
    if (weather) {
      if  (isHourNight && weather.includes("clear")) return moonClearAnimation;
      else if (weather.includes("clear")) return sunAnimation;
      else if (isHourNight && weather.includes("clouds")) return moonCloudAnimation;
      else if (isHourNight && weather.includes("snow")) return moonSnowAnimation
      else if (isHourNight && weather.includes("rain")) return moonRainAnimation
      else if (weather === "few clouds" || weatherNow === "scattered clouds")
        return sunCloudAnimation;
      else if (weather.includes("clouds")) return cloudAnimation;
      else if (weather.includes("thunderstorm") && weather.includes("rain")) return thunderRainAnimation;
      else if (weather.includes("rain")  || weatherNow.includes("drizzle")) return rainAnimation;
      else if (weather.includes("thunderstorm")) return thunderAnimation;
      else if (weather.includes("mist")) return mistAnimation;
    }
    return sunAnimation;
  };

  const textColorByWeather = () => {
    if (weatherNow) {
      if (
        itIsNight
      )
        return "text-white"
        if ( weatherNow.includes("clouds") ||
        weatherNow.includes("clear")
      )
        return "text-white";
      if (weatherNow === "overcast clouds") return "text-gray-800";
      if (weatherNow.includes("rain")) return "text-lightBlue";
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
        } h-full min-h-full object-cover w-full transform transition-all absolute z-10  duration-500 ease-in-out fadeIn tablet:rounded-t-[2.4rem] `}
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
            className={`flex flex-col transition-all duration-500 ease-in-out `}
          >
            <Lottie
              animationData={animationByWeather(weatherNow)}
              loop
              autoPlay
              style={{
                width: extentionIsVisible ? 120 : 100,
                height: extentionIsVisible ? 120 : 100,
                transition: "width 0.5s ease, height 0.5s ease",
              }}
              className={`pl-4 drop-shadow-xl ${
                weatherNow?.includes("rain") && "transform scale-x-[-1]"
              }`}
            />
            <div
              className={`flex flex-col gap-4 transition-all duration-500 ease-in-out ${
                extentionIsVisible ?
                "drop-shadow-xl bg-darkBlue bg-opacity-20 rounded-xl p-4 text-white" : "pl-4"
              } `}
            >
              <h3 className={`font-body tracking-widest text-sm text-center drop-shadow-xl`}>
                {weatherNow}
              </h3>
              
              </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 items-start">
          <h2
              className={` flex drop-shadow-xl text-[60px] pr-4 font-heading  transition-all duration-500 ease-in-out  ${
               extentionIsVisible ? "scale-[1.3]" : "scale-[1]"} `}
            >
              {temperatureNow}
              <span className="text-[30px] ">°</span>
            </h2>
            <div
              className={`flex items-center gap-2 text-sm w-fit transition-all duration-500 justify-center ease-in-out ${
                extentionIsVisible ?
                "bg-darkBlue bg-opacity-20 rounded-xl p-2 px-4 text-white drop-shadow-xl" : "pr-4"
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
        <div className="bg-darkBlue bg-opacity-20 rounded-xl p-4 h-fit text-white drop-shadow-xl overflow-x-auto hide-scrollbar">
          <ul className="flex gap-2 ">
            {filteredForecast.map((hour, index) => {
              // Extract the hour from dt_txt
              const hourDisplay = hour.dt_txt.split(" ")[1].split(":")[0];
              const isHourNight = hourDisplay >= 20 || hourDisplay < 7;
              return (
                <li key={index} className="flex flex-col gap-2 items-center">
                  <p>{hourDisplay}</p>
                  <Lottie
                    animationData={animationByWeather(
                      hour.weather[0]?.description, isHourNight
                    )}
                    loop
                    autoPlay
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    className={`${
                      hour.weather[0]?.description.includes("rain") &&
                      "transform scale-x-[-1]"
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
        className={`hover:scale-125 hover:cursor-pointer absolute z-40 left-9 flex justify-center items-center transform  transition-all duration-500 ease-in-out fadeIn
     flex ${
       extentionIsVisible
         ? " top-[80%] tablet:top-[90%] "
         : "top-[420px] phone:top-[450px] tablet:top-[410px]"
     }`}
      >
        <img
          src="/cicrle.svg"
          alt="circle see more"
          className="w-8 h-8 phone:w-10 phone:h-10 tablet:w-14 tablet:h-14  z-50"
        />
        <SlArrowDown
          className={`${
            extentionIsVisible ? "hidden" : "flex"
          } w-4 h-4 phone:w-5 phone:h-5 tablet:w-8 tablet:h-8 text-white absolute  z-50 fadeIn `}
        />
        <SlArrowUp
          className={`${
            extentionIsVisible ? "flex" : "hidden"
          } w-4 h-4 phone:w-5 phone:h-5 tablet:w-8 tablet:h-8 text-white absolute z-50 fadeIn`}
        />
      </div>

      <div
        className={`${
          extentionIsVisible ? "opacity-100 visible" : "opacity-0 invisible"
        } z-30 flex flex-col gap-6 transition-opacity duration-1000 ease-in-out h-fit mx-8 font-body text-white`}
      >
        <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-full flex gap-6 p-4 text-sm justify-evenly">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <GiSunrise />
              <p>{timeSunrise}</p>{" "}
            </div>
            <div className="flex gap-2">
              <GiSunset />
              <p>{timeSunset}</p>
            </div>
          </div>
          <div className="w-[2px] bg-white"></div>
          <div>
          <div className="flex gap-2">
          <WiHumidity />
            <p>{humidity} %</p></div>
            <div className="flex gap-2">
            <IoIosCloudy />
            <p>{clouds} %</p></div>
          </div>
        </div>
        <div className="flex gap-2 text-sm justify-end tablet:justify-between">
          <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-fit flex gap-6 p-4">
            <div className="flex flex-col">
              <h4>Wind</h4>
              <div className="flex gap-2">
                <WiCloudyWindy /> <p>{windGust} mm/s</p>
              </div>
              <div className="flex gap-2">
                {" "}
                <FiWind />
                <p>{windSpeed} mm/s</p>
              </div>
            </div>
          </div>
          <div className=" bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl w-fit flex gap-6 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <IoMdEye />
                <p>{visibility} km</p>
              </div>
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
