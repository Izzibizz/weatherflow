import { useEffect } from "react"
import { useForecastStore } from "../stores/useForecastStore";

export const ErrorMessage = () => {

  const { error, setError } = useForecastStore()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, [error])

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-overlay backdrop-blur-sm  flex items-center justify-center z-50 ">
    <div className="w-10/12 tablet:w-[280px] mb-52 tablet:mb-72 laptop:mb-52 rounded-lg bg-white backdrop-blur-base px-2 py-6 tablet:p-8 relative flex flex-col items-center justify-center justify-between">
        <h2 className="font-body">Could not find city, try again</h2>
      </div>
      </div>
  )
}

