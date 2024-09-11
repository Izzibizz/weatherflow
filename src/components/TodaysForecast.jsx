import { useForecastStore } from "../stores/useForecastStore"
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export const TodaysForecast = () => {

  const { forecastData, city, extentionIsVisible, setExtentionIsVisible } = useForecastStore()

  //weather virables
  const weatherNow = forecastData?.[0]?.weather?.[0]?.description
  const temperatureNow = forecastData?.[0]?.main?.temp?.toFixed(1)
  
  const handleArrowClick = () => {
    setExtentionIsVisible(!extentionIsVisible)
  }

  return (
    <>
    <div className={`bg-[#6FB6DE] w-full h-[54vh] tablet:h-[384px] pt-40 p-10 tablet:rounded-t-[2.4rem] `}>
      <h2 className="text-2xl flex ">{temperatureNow}<span className="text-sm ">°C</span></h2>
      <h3>{weatherNow}</h3>
      <p>{city}</p>
    </div>
    <div onClick={handleArrowClick} className={`hover:scale-125 hover:cursor-pointer absolute z-20 ml-14 flex justify-center items-center transform -translate-x-1/2 transition-all duration-500 ease-in-out
     flex ${ extentionIsVisible ? " top-[85%] tablet:top-[70%] laptop:top-[65%]" : "top-[50%]"}`}
      >
  <img
    src="/cicrle.svg"
    alt="circle see more"
    className="w-14 h-14  z-10"
  />
  <SlArrowDown
    className={`${
      extentionIsVisible ? "hidden" : "flex"
    } w-8 h-8 text-white absolute  z-20 fadeIn`}
  />
  <SlArrowUp
    className={`${
      extentionIsVisible ? "flex" : "hidden"
    } w-8 h-8 text-white absolute z-20 `}
  />
</div>
    <div className={`${extentionIsVisible ? "h-[46vh] tablet:h-[350px]" : "h-0"} bg-[#6FB6DE] w-full transform transition-all duration-500 ease-in-out tablet:rounded-b-[2.4rem] fadeIn`}>

    </div>
    </>
  )
}

