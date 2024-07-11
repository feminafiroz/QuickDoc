import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_API } from "../../constants";
import "../../index.css";
import axios from "axios";
import { BannerInterface } from "../../types/BannerInterface";

const Advertisement: React.FC = () => {
 
  const [currentIndex, setcurrentIndex] = useState(0);
  const [banners, setBanners] = useState<BannerInterface[]>([]);
  
  useEffect(() => {
    axios
      .get(USER_API + "/banners")
      .then(({ data }) => setBanners(data.banners))
      .catch(() =>
        console.log("error in the advertisement comming , go nd check ")
      );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

 



  return (
    <>

{banners.length > 0 && (
  <section className="home py-10 mt-20 bg-white overflow-hidden sm:px-20">
    <div
      className="container flex flex-col md:flex-row items-center justify-center mx-auto px-4 md:px-12"
      key={currentIndex}
    >
      <div className="w-full md:w-2/5 flex items-center justify-center bg-white md:ml-20 md:pl-20 ">
        <img
          src={banners[currentIndex]?.image}
          alt="Banner image"
          className="border-t border-b border-l border-r border-gray-400 w-full md:w-440px h-auto max-h-48 object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center bg-white md:mr-20 md:pr-20 p-4 h-auto md:h-48 border-t border-b border-r border-l border-gray-400">
        <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold mb-4 text-center md:text-left">
          {banners[currentIndex]?.title}
        </h1>
        <p className="text-xl  font-normal text-gray-500 font-medium mb-4 text-center md:text-left">
          {banners[currentIndex]?.description}
        </p>
        <div className="flex items-center justify-between mb-2 mt-6">
        <p className="inline-block px-3 py-1 text-white bg-green-700 rounded-full text-sm font-medium">
  New
</p>
          <Link
            to={`${banners[currentIndex]?.advertisementUrl}`} target="_blank"
            className="text-green-700 text-xl font-semibold"
          >
            Learn more {">"}
          </Link>
        </div>
      </div>
    </div>
  </section>
)}
      

    </>
  );
};

export default Advertisement;
