import { create } from "zustand"

export const useForecastStore = create((set) => ({
    loading: false,
    error: false,
    forecastData: [],
    city: "",
    country: "",
    sunrise: "",
    sunset: "",
    timezone: "",
    userLocation: {},
    extentionIsVisible: false,
    showSearchField: false,
    searching: false,

    setCity: (input) => set({ city: input }),
    setUserLocation: (input) => set({ userLocation: input }),
    setExtentionIsVisible: (input) => set({ extentionIsVisible: input }), 
    setShowSearchField: (input) => set({ showSearchField: input }),
    setSearching: (input) => set({ searching: input }),
    setError: (input) => set({ error: input }),

    fetchForecast: async (city) => {
        set({ loading: true, error: false }); // Set loading and clear error
    
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
            sunset: data.city.sunset,
            timezone: data.city.timezone
          });
    
          console.log("main data", data);
        } catch (error) {
          console.log("error:", error);
          set({ error: true });
        } finally {
          set({extentionIsVisible: false, loading: false, searching: false, showSearchField: false })
        }
      },
      
    }));