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
      <section className="home py-10 mt-20 bg-white overflow-hidden h-80 pt-2 ">
        <div
          className="container flex flex-col bg-white h-72 md:flex-row items-center justify-center mx-auto px-10 md:px-12"
          key={currentIndex}
        >
          <div className="lg:w-2/5 flex items-center justify-center bg-white ml-20 pl-20">
            <img
              src={banners[currentIndex]?.image}
              alt="Banner image"
              className="border-t border-b border-l border-gray-400"
              style={{ width: "440px", height: "192px", objectFit: "cover" }} // Adjust dimensions as necessary
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center bg-white  mr-20 pr-20 pl-4 h-48 border-t border-b border-r border-gray-400">
            <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold mb-4">
              {banners[currentIndex]?.advertisementName}
            </h1>
            <p className="text-xl font-normal  text-gray-500 font-medium mb-4">
              {banners[currentIndex]?.description}
            </p>
            <div className="flex items-center justify-between mb-2 mt-6">
              <p className="text-sm text-gray-600 font-medium">Add</p>
              <Link
                to={`/${banners[currentIndex]?.advertisementUrl}`}
                className="text-green-700 text-xl text-semibold"
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
