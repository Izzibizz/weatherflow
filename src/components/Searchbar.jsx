import { useForecastStore } from "../stores/useForecastStore";
import { useState } from "react";
import Lottie from "lottie-react";
import loading from "../assets/Animation-round.json"

export const Searchbar = () => {
  const { fetchForecast, setUserLocation, userLocation, showSearchField, setShowSearchField, searching, setSearching, city } = useForecastStore();
  const [cityInput, setCityInput] = useState("");

  const handleCityInput = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    setSearching(true)
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
      className={` h-10 p-2 rounded-xl flex align-center  ${
        showSearchField ? "bg-white animate-fadeIn w-10/12" : "w-fit bg-transparent"
      }`}
      
    >
      {showSearchField && (
        <input
          type="text"
          value={cityInput}
          onChange={handleCityInput}
          className="w-[85%] font-body text-blue  text-xs focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap pl-2"
          placeholder= {city || "Search location"}
          style={{ fontSize: "16px" }}
        />
      )}
      {searching ? (
        <div className="flex justify-center items-center">
        <Lottie
        animationData={loading}
        loop
        autoPlay
        style={{
          width: 40,
          height: 40,
        }}
      />
      </div>
      ) : (
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
      )}
    </form>
  );
};
