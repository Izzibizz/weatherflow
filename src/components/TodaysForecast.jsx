import { useForecastStore } from "../stores/useForecastStore"
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export const TodaysForecast = () => {

  const { forecastData, city, extentionIsVisible, setExtentionIsVisible } = useForecastStore()

  //weather virables
  const weatherNow = forecastData?.[0]?.weather?.[0]?.description
  const temperatureNow = forecastData?.[0]?.main?.temp?.toFixed(1)
  
  const videoByWeather = () => {
    if (weatherNow) {
      if (weatherNow === "few clouds") return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146428/little-clouds_ne5eaw.mp4";
      else if (weatherNow === "scattered clouds") return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146429/scattered-clouds_hymr9l.mp4";
      else if (weatherNow?.includes("clouds")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146427/broken-clouds_yabiso.mp4"; 
      else if (weatherNow?.includes("clear")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146442/clear_bpyvlj.mp4";
      else if (weatherNow?.includes("thunderstorm")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146452/rain-thunder_pwnr4q.mov";
      else if (weatherNow?.includes("rain")) return "https://res.cloudinary.com/dbf8xygxz/video/upload/v1726146440/rain_wgjndm.mov";
    }
    return "/clear.mp4"; // Fallback in case weatherNow is not available
  };
  
  const iconByWeather = () => {
    if (weatherNow) {
      if (weatherNow.includes("clear")) return "/sun.svg";
      else if (weatherNow.includes("clouds")) return "/clouds.svg";
      else if (weatherNow.includes("rain")) return "/rain.svg";
      else if (weatherNow.includes("thunderstorm")) return "/thunder.svg";
    }
    return "/clouds.svg"; // Default fallback
  };
  
  const handleArrowClick = () => {
    setExtentionIsVisible(!extentionIsVisible)
  }

  return (
    <div className={`${extentionIsVisible ? " h-screen tablet:h-[734px] tablet:rounded-b-[2.4rem]" : "h-[500px] tablet:h-[384px]"} relative z-20 transform transition-all duration-500 ease-in-out fadeIn `}>
    <video className={`${extentionIsVisible ? " tablet:rounded-b-[2.4rem]" : "tablet:rounded-b-none"} h-full object-cover w-full transform transition-all absolute z-10  duration-500 ease-in-out fadeIn tablet:rounded-t-[2.4rem] `} 
     autoPlay
     muted
     loop
     src={videoByWeather()} />
<div className="absolute h-[200px] z-30 top-[100px] tablet:top-1/3 p-8 flex flex-col w-full">
      <h2 className="text-2xl flex font-h ">{temperatureNow}<span className="text-sm ">°C</span></h2>
      <h3>{weatherNow}</h3>
      <p>{city}</p>
    <div onClick={handleArrowClick} className={ `hover:scale-125 hover:cursor-pointer absolute z-20 ml-6 flex justify-center items-center transform -translate-x-1/2 transition-all duration-500 ease-in-out fadeIn
     flex ${ extentionIsVisible ? " small:-top[90%] phone:top-[110%] tablet:top-[80%] laptop:top-[110%]" : "top-[100%]"}`}
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
  <img src={iconByWeather()} alt={weatherNow} className="w-20 h-20 ml-auto "/>
      <div className={`${extentionIsVisible ? "flex" : "hidden"} fadeIn mt-40 `}>
hello
</div>
</div>
 </div>
  )
}