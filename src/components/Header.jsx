import { Searchbar } from "./Searchbar";
import { GetLocation } from "./GetLocation";
import { useForecastStore } from "../stores/useForecastStore";

export const Header = () => {
    const { showSearchField } = useForecastStore()
  return (
    <header className={`h-16 absolute mt-10 w-full  z-50 flex items-center  ${showSearchField ? "justify-end" : "justify-between"} px-10 transition-all duration-500`}>
         <img src="/weatherflow-white.svg" alt="logo" className={`w-[130px] ${showSearchField ? "hidden " : "block animate-fadeIn"}`}/>
        <div className="flex  gap-2">
            < Searchbar />
            < GetLocation />
            </div>
    </header>
  )
}


