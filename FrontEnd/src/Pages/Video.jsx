import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 min-h-screen flex flex-col items-center overflow-hidden relative px-4 sm:px-6 md:px-10 lg:px-20 mt-40 sm:mt-10 md:mt-30 lg:mt-40 xl:mt-42">
      {/* Admin Button - Responsive Top Right */}
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-100 text-red-700 font-bold px-4 sm:px-5 py-2 sm:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm hover:bg-red-200 shadow-sm z-20"
      >
        Are you Admin?
      </button>

      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-8 mt-16 lg:mt-0">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/food.png"
            alt="Delicious food"
            className="rounded-lg shadow-lg border-2 border-orange-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 leading-tight">
            🍽️ Feeling Hungry?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
            Discover a digital mall of food stalls—order what you love, fast and contactless.
          </p>

          <button
            onClick={() => navigate("/stalls")}
            className={`bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-lg font-bold shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-orange-600 ${
              animate ? "animate-bounce" : ""
            }`}
          >
            HUNGRY? TOUCH HERE TO ORDER
          </button>

          <p className="mt-4 text-sm text-gray-500 italic">
            Walk through our digital food court with just a tap!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
