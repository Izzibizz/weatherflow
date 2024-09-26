import { useForecastStore } from "../stores/useForecastStore"
import Lottie from "lottie-react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import sunAnimation from "../assets/Animation-sun.json"
import cloudAnimation from "../assets/Animation-cloud.json"
import sunCloudAnimation from "../assets/Animation-sunCloud.json"
import rainAnimation from "../assets/Animation-rain.json"

export const TodaysForecast = () => {

  const { forecastData, city, extentionIsVisible, setExtentionIsVisible, sunrise, sunset } = useForecastStore()

  //weather virables
  const weatherNow = forecastData?.[0]?.weather?.[0]?.description
  const temperatureNow = Math.round(forecastData?.[0]?.main?.temp)
  const minTemp = Math.round(forecastData?.[0]?.main?.temp_min)
  const maxTemp = Math.round(forecastData?.[0]?.main?.temp_max)
  const timeSunrise = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const timeSunset = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  
  const videoByWeather = () => {
    if (weatherNow) {
      if (weatherNow === "few clouds") return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146428/little-clouds_ne5eaw.mp4";
      else if (weatherNow === "scattered clouds") return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146429/scattered-clouds_hymr9l.mp4";
      else if (weatherNow?.includes("clouds")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146427/broken-clouds_yabiso.mp4"; 
      else if (weatherNow?.includes("clear")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146442/clear_bpyvlj.mp4";
      else if (weatherNow?.includes("thunderstorm")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146452/rain-thunder_pwnr4q.mov";
      else if (weatherNow?.includes("rain")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146440/rain_wgjndm.mov";
    }
    return "/clear.mp4";
  };
  

  const animationByWeather = () => {
    if (weatherNow) {
      if (weatherNow.includes("clear")) return sunAnimation;
      else if (weatherNow === "few clouds" || weatherNow === "scattered clouds") return sunCloudAnimation;
      else if (weatherNow.includes("clouds")) return cloudAnimation;
      else if (weatherNow.includes("rain")) return rainAnimation;
    }
    return sunAnimation; 
  };

  const textColorByWeather = () => {
    if (weatherNow) {
      if (weatherNow.includes("clear")) return "text-white"; // Example color for clear weather
      if (weatherNow === "few clouds" || weatherNow === "scattered clouds") return "text-darkBlue"; // Example color for cloudy weather
      if (weatherNow.includes("clouds")) return "text-gray-800"; // Example color for overcast
      if (weatherNow.includes("rain")) return "text-lightBlue"; // Example color for rain
      // Add more conditions for other weather types as needed
    }
    return "text-darkBlue"; // Default text color
  };
  


  const handleArrowClick = () => {
    setExtentionIsVisible(!extentionIsVisible)
  }

  console.log(forecastData)


  return (
    <div className={`${extentionIsVisible ? " h-screen tablet:h-[734px] tablet:rounded-b-[2.4rem]" : "h-[400px] phone:h-[450px] tablet:h-[384px]"} gap-20 flex flex-col relative z-20 transform transition-all duration-500 ease-in-out fadeIn `}>
    <video className={`${extentionIsVisible ? " tablet:rounded-b-[2.4rem]" : "tablet:rounded-b-none"} h-full object-cover w-full transform transition-all absolute z-10  duration-500 ease-in-out fadeIn tablet:rounded-t-[2.4rem] `} 
     autoPlay
     muted
     loop
     src={videoByWeather()} />
<div className={`h-fit z-30 mt-[180px] tablet:mt-[140px] px-8 flex justify-between w-full ${textColorByWeather()}`}>
  <div className="flex flex-col uppercase justify-between">
      <h2 className={` flex pb-2  font-heading transition-all duration-500 ease-in-out drop-shadow-xl ${extentionIsVisible ? "ml-2 text-[70px]" : "text-[60px]"} tracking-wider `}>{temperatureNow}<span className="text-[30px] ">°C</span></h2>
      <div className={`flex flex-col gap-2 transition-all duration-500 ease-in-out ${extentionIsVisible && "drop-shadow-xl bg-darkBlue bg-opacity-20 rounded-xl p-4 text-white"} `}>
      <h3 className="font-body font-bold drop-shadow-xl ">{weatherNow}</h3>
      <p className="font-body text-sm drop-shadow-xl">{city}</p>
      </div>
      </div>
      <div className="flex flex-col items-center justify-between ">
      <Lottie
            animationData={animationByWeather()}
            loop
            autoPlay
            style={{
              width: extentionIsVisible ? 150 : 100, 
              height: extentionIsVisible ? 150 : 100,
              transition: "width 0.5s ease, height 0.5s ease"
            }}
          />
          <div className={`flex items-end gap-2 w-fit transition-all duration-500 ease-in-out ${extentionIsVisible && "bg-darkBlue bg-opacity-20 rounded-xl p-4 text-white drop-shadow-xl"}`}>
            <p>H: {maxTemp}<span className="text-[10px] align-super">°C</span></p> <span className="text-2xl">|</span>
            <p>L: {minTemp}<span className="text-[10px] align-super">°C</span></p>
          </div>
          </div>
      </div>
    <div onClick={handleArrowClick} className={ `hover:scale-125 hover:cursor-pointer absolute z-40 left-8 flex justify-center items-center transform  transition-all duration-500 ease-in-out fadeIn
     flex ${ extentionIsVisible ? " top-[85%] phone:top-[90%] " : "top-[380px] phone:top-[430px] tablet:top-[355px]"}`}
      >
  <img
    src="/cicrle.svg"
    alt="circle see more"
    className="w-14 h-14  z-50"
  />
  <SlArrowDown
    className={`${
      extentionIsVisible ? "hidden" : "flex"
    } w-8 h-8 text-white absolute  z-50 fadeIn `}
  />
  <SlArrowUp
    className={`${
      extentionIsVisible ? "flex" : "hidden"
    } w-8 h-8 text-white absolute z-50 fadeIn`}
  />
  </div>
  
    <div className={`${extentionIsVisible ? "opacity-100 visible" : "opacity-0 invisible"} z-30 transition-opacity duration-1000 ease-in-out p-4 mx-8 font-heading text-white bg-darkBlue drop-shadow-xl bg-opacity-20 rounded-xl`}>
      <p>Sunrise: {timeSunrise}</p>
      <p>Sunset: {timeSunset}</p>
</div>
 </div>
  )
}