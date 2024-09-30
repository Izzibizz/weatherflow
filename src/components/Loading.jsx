import Lottie from "lottie-react";
import loading from "../assets/Animation-round.json"

export const Loading = () => {
  return (
    <div className="h-screen tablet:h-[734px] tablet:rounded-[2.4rem] text-center flex justify-center items-center bg-white">
       <Lottie
            animationData={loading}
            loop
            autoPlay
            style={{
              width: 150 ,
              height: 150,
            }}
            className="absolute z-50"
          />
    </div>
  )
}


