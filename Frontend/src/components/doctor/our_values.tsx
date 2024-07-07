import React from "react";

const OurValues: React.FC = () => {
  const values = [
    {
      icon: "https://practices.hotdoc.com.au/wp-content/uploads/2020/08/Values_Empatheitc.png", // Replace with your own icon URL
      title: "Always be empathetic",
    },
    {
      icon: "https://practices.hotdoc.com.au/wp-content/uploads/2020/08/Values_Speak-Up.png", // Replace with your own icon URL
      title: "Speak Up",
    },
    {
      icon: "https://practices.hotdoc.com.au/wp-content/uploads/2020/08/Values_Ownership.png", // Replace with your own icon URL
      title: "Take Ownership",
    },
  ];

  return (
    <div className="bg-white py-20 px-20 sm:px-8 lg:px-12">
      <h2 className="text-5xl font-semibold text-center mb-6 text-gray-700">Our Values</h2>
      <div className="flex flex-col md:flex-row justify-around items-center bg-white px-20">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center text-center m-4">
            <img src={value.icon} alt={value.title} className="w-48 h-48 mb-4" />
            <h3 className="text-3xl font-medium text-gray-700 w-3/4 ">{value.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;
