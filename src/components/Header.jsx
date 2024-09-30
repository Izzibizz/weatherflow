import { Searchbar } from "./Searchbar";
import { GetLocation } from "./GetLocation";
import { useForecastStore } from "../stores/useForecastStore";

export const Header = () => {
    const { showSearchField } = useForecastStore()
  return (
    <header className={`h-16 absolute mt-10 w-full  z-50 flex items-center  ${showSearchField ? "justify-end" : "justify-between"} px-10 transition-all duration-500`}>
         <img src="/weatherflow-1.png" alt="logo" className={`w-[140px] ${showSearchField ? "hidden " : "block animate-fadeIn"}`}/>
         <div className={` gap-2 ${showSearchField && "w-full justify-end"} flex`}>
            < Searchbar />
            < GetLocation />
            </div>
    </header>
  )
}


