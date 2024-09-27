import { useForecastStore } from "../stores/useForecastStore";
import { useState } from "react";

export const Searchbar = () => {
  const { fetchForecast, setUserLocation, userLocation, showSearchField, setShowSearchField } = useForecastStore();
  const [cityInput, setCityInput] = useState("");

  const handleCityInput = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    fetchForecast(`q=${cityInput}`); // Fetch the forecast for the entered city
    setCityInput("");
    setUserLocation({});
    console.log(userLocation);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (showSearchField && cityInput) {
          handleSearch();
        }
      }}
      className={`w-10/12 h-10 p-2 rounded-xl flex align-center  ${
        showSearchField && "bg-white animate-fadeIn"
      }`}
    >
      {showSearchField && (
        <input
          type="text"
          value={cityInput}
          onChange={handleCityInput}
          className="w-[85%] font-body text-blue  text-xs focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap pl-2"
          placeholder="Search location"
        />
      )}
      <button
        type="submit"
        onClick={() => {
          if (!showSearchField) {
            setShowSearchField(true);
          } else if (!cityInput && showSearchField) {
            setShowSearchField(false);
          }
        }}
        className={`${
          showSearchField ? "w-[15%] justify-center items-center " : "w-full justify-end"
        } flex  ${
          !cityInput && showSearchField ? "opacity-40" : "opacity-100"
        }`}
      >
        <img
          src="/search.svg"
          className="w-6 h-6 hover:scale-110"
          alt="search icon"
        />
      </button>
    </form>
  );
};
