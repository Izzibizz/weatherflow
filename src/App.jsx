import { Forecasts } from "./pages/Forecasts";
import { Header } from "./components/Header"

const App = () => {
  return (
    <div className=" w-screen min-h-screen max-w-screen h-screen bg-gradient-to-r from-[#0c1647] to-[#397495] flex flex-col justify-center items-center">
      <img src="/weatherflow-1.png" alt="logo" className="absolute top-10 tablet:top-6 right-2 tablet:right-6 tablet:w-1/4 laptop:1/3 z-30 hidden tablet:block"/>
      <h1 className="font-heading text-white absolute top-16 laptop:top-[10%] tablet:right-10 hidden tablet:block z-50">We Follow the Flow of the Weather</h1>
      <div className="w-full h-full bg-white tablet:h-[768px] tablet:w-[376px] tablet:mt-8 tablet:bg-iphone bg-cover bg-center flex flex-col tablet:p-[17px] tablet:rounded-[60px]">
        <div className="w-full h-full relative">
        <Header/>
      <main >
        < Forecasts />
      </main>
      </div>
      </div>
      </div>
  );
};

export default App;
