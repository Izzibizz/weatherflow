import { Searchbar } from "./Searchbar";
import { GetLocation } from "./GetLocation";
import { useForecastStore } from "../stores/useForecastStore";

export const Header = () => {
    const { showSearchField, city } = useForecastStore()
  return (
    <header className={`h-16 absolute mt-10 w-full  z-50 flex items-center  ${showSearchField ? "justify-end" : "justify-between"} px-10 transition-all duration-500`}>
        {/*  <img src="/weatherflow-2.svg" alt="logo" className={`w-[140px] ${showSearchField ? "hidden " : "block animate-fadeIn"}`}/> */}
       <h2 className={`font-street text-white text-xl tracking-widest drop-shadow-xl  ${showSearchField ? "hidden " : "block animate-fadeIn"}`}>{city}</h2>
         <div className={` gap-2 ${showSearchField && "w-full justify-end"} flex`}>
            < Searchbar />
            < GetLocation />
            </div>
    </header>
  )
}


