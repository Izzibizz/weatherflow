import { create } from "zustand"

export const useForecastStore = create((set) => ({
    loading: false,
    error: "",
    forecastData: [],
    city: "",
    country: "",
    sunrise: "",
    sunset: "",
    userLocation: {},
    extentionIsVisible: false,

    setCity: (input) => set({ city: input }),
    setUserLocation: (input) => set({ userLocation: input }),
    setExtentionIsVisible: (input) => set({ extentionIsVisible: input }), 

    fetchForecast: async (city) => {
        set({ loading: true, error: null }); // Set loading and clear error
    
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${city}&units=metric&appid=9fd58fe4bdef8641db37b66e72207fcb`, {
            method: "GET",
          });
    
          if (!response.ok) {
            throw new Error("Could not fetch");
          }
    
          const data = await response.json();
    
          // Update state immutably
          set({
            forecastData: data.list,
            city: data.city.name,
            country: data.city.country,
            sunrise: data.city.sunrise,
            sunset: data.city.sunset
          });
    
          console.log(data);
        } catch (error) {
          console.log("error:", error);
          set({ error: error });
        } finally {
          set({ loading: false }); // Set loading to false when done
        }
      },
      
    }));