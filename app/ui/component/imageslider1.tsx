import React, { useState, useEffect } from "react";

const photos = [
  "/slider1/slider1.1.jpg",
  "/slider1/slider1.2.jpg",
  "/slider1/slider1_3.jpg",
  "/slider1/slider1_4.jpg",
];

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const delay = 6000; // delay time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length); // loop next photo
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Photo */}
      <div
        className="flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Position Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 md:w-2 md:h-2 border-2 rounded-full cursor-pointer ${
              index === current
                ? "bg-white border-white"
                : "bg-transparent border-white"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>

      {/* Optional Photo Counter */}
      {/*}
      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-gray-700 text-sm md:text-base">
        {`รูปที่ ${current + 1} จาก ${photos.length}`}
      </div>
      */}
    </div>
  );
}
