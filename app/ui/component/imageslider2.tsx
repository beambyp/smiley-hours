import React, { useState, useEffect } from "react";

const photos = [
  "/slider2/slider2_1.png",
  "/slider2/slider2_2.png",
  "/slider2/slider2_3.png",
  "/slider2/slider2_4.png",
  "/slider2/slider2_5.png",
  "/slider2/slider2_6.png",
];

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const delay = 6000; {/* delay time*/}

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length); //loop next photo
    }, delay);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {/* photo */}
        <div
            className="flex transition-transform duration-1000" // smooth slider 
            style={{
                transform: `translateX(-${current * 100}%)`, 
            }}
        >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Slide ${index + 1}`}
            className="w-full h-full flex-shrink-0" //fit photo 
          />
        ))}
    </div>

    {/* position dot */}
    <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 border-2 rounded-full cursor-pointer ${
              index === current
                ? "bg-white border-white"
                : "bg-transparent border-white"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
    </div>

    {/* position photo */}
    {/*}
    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-gray-700">
        {`รูปที่ ${current + 1} จาก ${photos.length}`}
    </div>
    */}
    </div>
  );
}
