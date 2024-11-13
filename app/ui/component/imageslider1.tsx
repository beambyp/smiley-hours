import React, { useState, useEffect } from "react";

const photos = [
  "/slider1/slider1_1.jpg",
  "/slider1/slider1_2.jpg",
  "/slider1/slider1_3.jpg",
  "/slider1/slider1_4.jpg",
  "/slider1/slider1_5.jpg",
  "/slider1/slider1_6.jpg",
  "/slider1/slider1_7.jpg",
  "/slider1/slider1_8.jpg",
  "/slider1/slider1_9.jpg",
];

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const delay = 5000; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length); 
    }, delay);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {/* photo */}
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
            className="w-full h-full flex-shrink-0" 
          />
        ))}
    </div>

    {/* position dot */}
    <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 border-2 rounded-full cursor-pointer ${
              index === current
                ? "bg-white border-white"
                : "bg-transparent border-white"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
    </div>

    {/* position photo */}
    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-gray-700">
        {`รูปที่ ${current + 1} จาก ${photos.length}`}
    </div>
    </div>
  );
}
