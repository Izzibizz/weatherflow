import { useForecastStore } from "../stores/useForecastStore"
import { useState } from "react"

export const Searchbar = () => {
  
  const { fetchForecast, setUserLocation, userLocation } = useForecastStore()
  const [ cityInput, setCityInput ] = useState("")

  const handleCityInput = (e) => {
    setCityInput(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchForecast(`q=${cityInput}`); // Fetch the forecast for the entered city
    setCityInput("")
    setUserLocation({})
    console.log(userLocation)
  };



  return (
    <form onSubmit={handleSearch} className=" w-11/12 h-12 p-2 rounded-xl flex align-center bg-white">
    <input
      type="text"
      value={cityInput}
      onChange={handleCityInput}
      className="w-[85%] font-body text-blue text-sm focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap pl-2"
      placeholder="Search location"
    />
    <button type="submit" disabled={!cityInput} className={`w-[15%] flex justify-center items-center ${
          !cityInput ? "opacity-40 cursor-not-allowed" : "hover:scale-110"
        }`}>
      <img src="/search.svg" className="w-6 h-6 hover:scale-110" alt="search icon" />
    </button>
  </form>
  )
}
