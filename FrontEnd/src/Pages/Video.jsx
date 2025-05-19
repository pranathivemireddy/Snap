import { useEffect, useState } from "react";

const Video = () => {
  const handleClick = () => {
    window.location.href = "/stalls";
  };

  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    setAnimateButton(true);
  }, []);

  return (
    <div className="bg-white h-screen w-full flex items-center justify-center">
      {/* Laptop & large screen view */}
      <div className="hidden lg:flex flex-row h-screen items-center justify-center px-20">
        <div className="w-1/2 flex justify-center">
          <video
            src="/video.mp4"
            width="480"
            height="240"
            controls
            autoPlay
            loop
            className="rounded-lg shadow-md"
          ></video>
        </div>
        <div className="w-1/2 text-left mt-6 lg:mt-0">
          <h1 className="text-4xl font-bold mb-4 text-orange-600">
            Feeling Hungry?
          </h1>
          <p className="text-lg mb-6 text-gray-700">
            Explore our digital stalls and order your favorite dishes—fresh,
            fast, and contactless!
          </p>
          <button
            onClick={handleClick}
            className={`bg-orange-500 text-white px-6 py-4 rounded-md text-lg font-semibold shadow-lg hover:bg-orange-600`}
          >
            HUNGRY? TOUCH HERE TO ORDER
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col lg:hidden items-center justify-center px-4">
        <video
          src="/video.mp4"
          width="320"
          height="180"
          controls
          autoPlay
          loop
        ></video>
        <button
          className="bg-orange-500 px-6 py-3 text-white font-semibold shadow"
          onClick={handleClick}
        >
          HUNGRY? TOUCH HERE TO ORDER
        </button>
      </div>
    </div>
  );
};

export default Video;
