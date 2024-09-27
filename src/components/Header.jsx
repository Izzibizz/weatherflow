import { Searchbar } from "./Searchbar";
import { GetLocation } from "./GetLocation";
import { useForecastStore } from "../stores/useForecastStore";

export const Header = () => {
    const { showSearchField } = useForecastStore()
  return (
    <header className={`h-16 absolute mt-10 w-full  z-50 flex items-center ${showSearchField ? "gap-6 px-12 " : "gap-2 px-6"} transition-all duration-500`}>
         <img src="/weatherflow-white.svg" alt="logo" className={`absolute top-4 left-10 w-1/3 z-30 ${showSearchField ? "hidden " : "block animate-fadeIn"}`}/>
            < Searchbar />
            < GetLocation />
    </header>
  )
}


