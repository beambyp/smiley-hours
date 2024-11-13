"use client"

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";

export default function Page() {

    return (
        <div>
          <TopHeader />
            <Navbar />
            <ImageSlider1 />
          <main className="container mx-auto py-8">
            <h1 className="text-2xl font-bold">Welcome to Smiley Hours</h1>
          </main>
        </div>
      );
};