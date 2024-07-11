// src/pages/doctor/profile.tsx
import React from 'react';
import Navbar from '../../components/doctor/Navbar/Navbar';
import Footer from '../../components/doctor/Footer/Footer';
import { MdOutlineModeEdit } from "react-icons/md";
import useDoctorProfile from "../../hooks/useDoctorProfile";


const Profile: React.FC = () => {
  const {
    profile,
    formData,
    error,
    imagePreview,
    certificatePreview,
    isSubmitting,
    departments ,
    handleInputChange,
    handleSubmit,
  } = useDoctorProfile() 

  let statusMessage = '';

  switch (formData?.status) {
    case 'pending':
      statusMessage = "Please update the profile with all fields for verification and wait for admin to verify.";
      break;
    case 'rejected':
      statusMessage = "Verification of Doctor Rejected";
      break;
    case 'approved':
      statusMessage = "Verified Doctor";
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-100 min-h-screen w-full">
        <div className="container mx-auto px-4 py-10 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-6">K.Y.C Update</h2>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full md:w-3/4 mx-auto flex flex-col items-center">
            <div className="bg-white w-full p-4 md:p-6 mb-3 rounded-lg shadow-lg">
            <p className={formData?.status === 'approved' ? 'text-green-700 font-bold pl-10 pb-4' : formData?.status === 'rejected' ? 'text-red-600 font-bold pl-10 pb-4' : 'text-yellow-600 font-bold pl-10 pb-4'}>
                {statusMessage}
              </p>
              <div className="flex flex-col md:flex-row items-start mb-6">
                
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                
                  <div className="relative">
                    <img
                      src={imagePreview ? imagePreview : profile?.profileImage ?? "https://picsum.photos/200/"}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-white text-black rounded-full cursor-pointer border border-gray-300 p-1"
                    >
                      <MdOutlineModeEdit />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      name="imageFile"
                      className="hidden"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex-grow w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-2">
                      <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="doctorName"
                        value={formData?.doctorName ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData?.email ?? ""}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                        disabled
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number:</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData?.phoneNumber ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="department" className="block text-gray-700 font-semibold">Department:</label>
                      <select
                        id="department"
                        name="department"
                        value={formData?.department ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      >
                        <option className="text-gray-700" value=""></option>
                        {departments.map((department: any) => (
                          <option key={department._id} className="text-gray-700" value={department._id}>
                            {department.departmentName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="education" className="block text-gray-700 font-semibold">Education:</label>
                      <input
                        type="text"
                        id="education"
                        name="education"
                        value={formData?.education ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="tenture" className="block text-gray-700 font-semibold">Tenture:</label>
                      <input
                        type="text"
                        id="tenture"
                        name="tenture"
                        value={formData?.tenture ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="wokringHospital" className="block text-gray-700 font-semibold">Working Hospital:</label>
                      <input
                        type="text"
                        id="wokringHospital"
                        name="wokringHospital"
                        value={formData?.wokringHospital ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
                      <input
                        id="description"
                        name="description"
                        value={formData?.description ?? ""}
                        onChange={handleInputChange}
                        className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="lisenceCertificate" className="block text-gray-700 font-semibold">Doctor License Certificate:</label>
                <input
                  type="file"
                  id="lisenceCertificate"
                  name="lisenceCertificate"
                  className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-green-500"
                  onChange={handleInputChange}
                />
                <img
                  src={certificatePreview ? certificatePreview : profile?.lisenceCertificate}
                  alt="License Certificate Preview"
                  className="mt-2 w-48 h-32 object-cover"
                />
              </div>

              {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Error message rendering */}

              

              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 mt-5 rounded-md hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring focus:border-green-500"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
