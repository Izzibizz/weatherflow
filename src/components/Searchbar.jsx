import { useForecastStore } from "../stores/useForecastStore"
import { useState } from "react"

export const Searchbar = () => {
  
  const { fetchForecast, setUserLocation, userLocation } = useForecastStore()
  const [ isTyping, setIsTyping ] = useState(false)
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
    <form onSubmit={handleSearch} className="w-5/6 border h-12 p-2 border-red rounded-xl flex align-center bg-white">
    <input
      type="text"
      value={cityInput}
      onChange={handleCityInput}
      onBlur={() => setIsTyping(false)}
      className="w-[85%] focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap pl-2"
      placeholder="Search location"
    />
    <button type="submit">
      <img src="/search.svg" className="w-6 h-6 hover:scale-110" alt="search icon" />
    </button>
  </form>
  )
}
