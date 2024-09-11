import { Forecasts } from "./pages/Forecasts";
import { Searchbar } from "./components/Searchbar";
import { GetLocation } from "./components/GetLocation";

const App = () => {
  return (
    <div className=" w-screen min-h-screen max-w-screen h-screen bg-gradient-to-r from-[#0c1647] to-[#397495] flex flex-col justify-center items-center">
      <img src="/weatherflow-white.svg" alt="logo" className="w-full absolute top-10 tablet:top-2 tablet:right-4 tablet:w-1/3"/>
      <div className="w-full h-full bg-white tablet:h-[768px] tablet:w-[376px] tablet:mt-8 tablet:bg-iphone bg-cover bg-center flex flex-col tablet:p-[17px] tablet:rounded-[60px]">
        <header className="h-16 absolute mt-20 tablet:mt-10 ml-6 z-20 flex gap-4 justify-between items-center">
      < Searchbar />
      < GetLocation />
      </header>
      <main >
        < Forecasts />
      </main>
      </div>
      </div>
  );
};

export default App;
