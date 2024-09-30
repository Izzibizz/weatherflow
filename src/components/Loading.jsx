import Lottie from "lottie-react";
import loading from "../assets/Circle-loading-Animation.json"

export const Loading = () => {
  return (
    <div className="h-screen tablet:h-[734px] text-center flex justify-center items-center">
    <video
        className={` h-full object-cover w-full transform transition-all duration-500 ease-in-out fadeIn tablet:rounded-[2.4rem] `}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        src="/clear.mp4"
      />
       <Lottie
            animationData={loading}
            loop
            autoPlay
            style={{
              width: 150 ,
              height: 150,
            }}
            className="absolute z-20"
          />
    </div>
  )
}


