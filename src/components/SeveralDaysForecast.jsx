import { useForecastStore } from "../stores/useForecastStore"


export const SeveralDaysForecast = () => {

  const { extentionIsVisible } = useForecastStore()
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div
    className={`bg-white w-full transition-all duration-500 fadeIn ease-in-out overflow-hidden rounded-b-[2.4rem] ${
      extentionIsVisible ? "h-0 opacity-0" : "h-[350px] opacity-100"
    }`}
  >
      
    </div>
  )
}