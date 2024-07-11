import React from "react";
import { MdDateRange, MdList, MdPerson } from "react-icons/md";
import images from '../../assets/images/images.jpeg'
import { Link } from "react-router-dom";

const Body: React.FC = () => {
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
    // <div className="bg-gradient-to-r from-white-200 to-white-200 py-10 px-4 sm:px-8 lg:px-12 m-4 sm:m-8 lg:m-10 rounded-xl">
    //   {/* <h1 className="text-2xl font-bold mb-4">Our Doctors</h1> */}
    //   <h1 className="text-4xl font-bold text-dark text-center mb-10 py-5"></h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 justify-center pb-12">
    //     {/* Doctor Card 1 */}
    //     <Link to="/user/profile">
    //       <div className="bg-white rounded-lg shadow-lg items-center text-center flex flex-col doctor-card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    //         <img
    //           src="https://img.freepik.com/premium-vector/boy-girl-doing-id-registration_118167-6078.jpg?w=740"
    //           alt="Doctor"
    //           className="h-64 object-cover rounded-t-lg"
    //         />
    //         <div className="p-4">
    //           <h2 className="text-lg font-bold mb-2 text-center">
    //             KYC (Know Your Customer)
    //           </h2>
    //           {/* <p className="text-gray-600 font-semibold mb-2 text-center">Cardiology</p> */}
    //           <p className="text-gray-600 mb-4">
    //             Complete your KYC verification to unlock scheduling capabilities. Only verified doctors can manage time slots and appointments for efficient practice management.
    //           </p>
    //           <div className="text-center">
    //             {/* <button className="bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-green-600"> K Y C</button> */}
    //           </div>
    //         </div>
    //       </div>
    //     </Link>

    //     <div className="bg-white rounded-lg shadow-lg items-center text-center flex flex-col doctor-card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    //       <img
    //         src="https://img.freepik.com/premium-vector/virtual-communication-flat-illustration-financial-consultation_203633-2107.jpg?w=740"
    //         alt="Doctor"
    //         className="h-64 object-cover rounded-t-lg"
    //       />
    //       <div className="p-4">
    //         <h2 className="text-lg font-bold mb-2 text-center">Patient List</h2>
    //         {/* <p className="text-gray-600 font-semibold mb-2 text-center">Dermatologist</p> */}
    //         <p className="text-gray-600 mb-4 mx-2">
    //           View and manage your patient list to stay organized and provide timely care. Easily access patient information and appointments to streamline your practice.
    //         </p>
    //         <div className="text-center">
    //           {/* <button className="bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-green-600">Patients</button> */}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Doctor Card 2 */}
    //     <div className="bg-white rounded-lg shadow-lg items-center text-center flex flex-col doctor-card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    //       <img
    //         src="https://img.freepik.com/free-vector/flat-design-time-management-concept_23-2148813012.jpg?w=740&t=st=1715330463~exp=1715331063~hmac=de49e1c2cb9511e6a8ba299991ace5cd753a560899fb945012678470ad3cb210"
    //         alt="Doctor"
    //         className="h-64 object-cover rounded-t-lg"
    //       />
    //       <div className="p-4">
    //         <h2 className="text-lg font-bold mb-2 text-center">Time Slots</h2>
    //         {/* <p className="text-gray-600 font-semibold mb-2 text-center" >Orthopedics</p> */}
    //         <p className="text-gray-600 mb-4 mx-2">
    //           Keep your schedule up-to-date to provide the best service to your patients. Customize your availability effortlessly to suit your practice needs.
    //         </p>
    //         <div className="text-center">
    //           {/* <button className="items-center bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-green-600">Slots</button> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>

<main className="flex items-center justify-center w-full h-min py-20">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-4 sm:mx-8">
        <img src={images} alt="Center" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Portal</h2>
          <p className="text-gray-600 mb-1">Update your KYC</p>
          <p className="text-gray-600 mb-4">Find the patients and schedule slots easily.</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              to="/doctor/profile"
              className="flex items-center justify-center bg-green-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              <MdPerson className="w-6 h-6 mr-2" />
              K.Y.C
            </Link>
            <Link
              to="/doctor/slot"
              className="flex items-center justify-center bg-green-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              <MdDateRange className="w-6 h-6 mr-2" />
              Schedule Appointments
            </Link>
            <Link
              to="/doctor/patientList"
              className="flex items-center justify-center bg-green-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              <MdList className="w-6 h-6 mr-2" />
              Patients
            </Link>
          </div>
        </div>
      </div>
    </main>

    <div className="bg-white py-20 px-4 sm:px-8 lg:px-12">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-6 text-gray-700">Our Values</h2>
  <div className="flex flex-col md:flex-row justify-around items-center bg-white px-4 sm:px-8 lg:px-20">
    {values.map((value, index) => (
      <div key={index} className="flex flex-col items-center text-center m-4">
        <img src={value.icon} alt={value.title} className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mb-4" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 w-full sm:w-3/4">{value.title}</h3>
      </div>
    ))}
  </div>
</div>

</>
  
  );
};

export default Body;
