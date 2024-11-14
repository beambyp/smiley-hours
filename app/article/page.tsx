"use client"

import TopHeader from "../ui/component/topheader";
import Navbar from "../ui/component/navbar";
import ImageSlider1 from "../ui/component/imageslider1";
import Footer from "../ui/component/footer";


export default function Page() {

    return (
        <div>
          <TopHeader />
            <Navbar />
            <ImageSlider1 />
          <main className="container bg-foreground justify-center mx-auto px-10 py-20">
            <h1 className="text-2xl font-bold">Welcome to Smiley Hours</h1>
          </main>
          <Footer/>
        </div>
      );
};