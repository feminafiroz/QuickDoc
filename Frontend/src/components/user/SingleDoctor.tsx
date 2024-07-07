import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../utils/axiosService';
import { USER_API } from '../../constants';
import { FaCalendarAlt } from 'react-icons/fa';
import StarRating from '../user/Review/Review';
import ReviewSlider from './Review/ReviewSlider';
// import { DoctorInterface } from '../../../types/doctorInterface';
import { DoctorInterface, ReviewInterface } from '../../types/doctoInterface';
import { DepartmentInterface } from '../../types/departmentInterface';

interface Doctor {
  profileImage: string;
  department: string | { departmentName: string };
  tenture: string;
  doctorName: string;
  description: string;
  wokringHospital: string;
  rating: number;
}

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorsAndDepartments = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/doctor/${id}`);
        const doctorData = response.data.doctor;
        setDoctor(doctorData);
    
        // Fetch departments
        const deptResponse = await axiosJWT.get(`${USER_API}/department/list`);
        const listedDepartments = deptResponse.data.departments.filter(
          (dept: DepartmentInterface) => dept.isListed
        );
    
        const departmentMap = listedDepartments.reduce(
          (acc: { [key: string]: string }, dept: DepartmentInterface) => {
            acc[dept._id] = dept.departmentName;
            return acc;
          },
          {}
        );
        setDepartments(departmentMap);
    
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError('Failed to fetch doctor details. Please try again later.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/getallreviews/${id}`);
        const reviewsWithUserDetails = await Promise.all(response.data.data.map(async (review: ReviewInterface) => {
          const userResponse = await axiosJWT.get(`${USER_API}/user/${review.user}`);
          return { ...review, user: { id: review.user, name: userResponse.data.user.name } };
        }));
        setReviews(reviewsWithUserDetails);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews. Please try again later.');
      }
    };

    fetchDoctorsAndDepartments();
    fetchReviews();
  }, [id]);

  console.log(reviews);

  const calculatedStarRating = useMemo(() => {
    if (reviews.length) {
      return (
        reviews
          .map((review) => review.rating)
          .reduce((acc, curr) => acc + curr, 0) / reviews.length
      ).toFixed(1);
    }
    return '4.1'; // Default value
  }, [reviews]);


  const handleBookAppointment = () => {
    navigate(`/user/appoinment/${id}`);
  };

  const renderAppointmentButton = () => {
    return (
      <button
        onClick={handleBookAppointment}
        className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4 flex items-center hover:bg-green-700 transition-colors duration-300"
      >
        <FaCalendarAlt className="mr-2" /> Book Appointment
      </button>
    );
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-center py-8">Loading...</div>;
  }
    console.log(doctor,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

  return (
    <div className="container bg-gray-100 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Doctor Details</h1>
      <div className="flex flex-col md:flex-row items-center justify-center   ">
        {/* Left Section */}
        <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
          <img
            src={doctor.profileImage}
            alt="Doctor"
            className="h-96 w-96 rounded-lg shadow-md object-cover border-4 border-white"
          />
        </div>
        {/* Right Section */}
        <div className="md:w-2/3 md:pl-8">
          <div className="bg-white p-6 rounded-lg mb-4 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Dr. {doctor.doctorName}
            </h2>
            <span className="text-sl text-gray-700">
              {departments[doctor.department as string]} ,
            </span>
            {/* <p className="text-sl text-green-500 font-bold">Verified</p>
             */}
            {doctor.tenture && (
              <>
               <span className="text-sm text-gray-800 ">
                  {doctor.tenture} years of Experience
            </span>

              </>
            ) }
             {doctor.wokringHospital && (
              <>
               <h2 className="text-sm text-gray-800 mb-1">
                Working Hospital :  {doctor.wokringHospital} 
              </h2>
              </>
            ) }
            {/* Add Star Rating Component */}
            <div className="flex items-center gap-2">
              <StarRating
                value={parseFloat(calculatedStarRating)}
                className="flex"
              />
              <div className="flex items-center">
                <p className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {calculatedStarRating} out of 5
                </p>
              </div>
            </div>
            <p className="text-lg text-green-500 font-bold mb-4">Consultation Fee - ₹200</p>
            {renderAppointmentButton()}
          </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">About</h3>
              <p className="text-lg text-gray-700">{doctor.description}</p>
            </div>
        </div>
      </div>
      {reviews.length ? (
        <div className="bg-gray-100 px-10 pt-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Feedback from  Paitents</h3>
          <ReviewSlider ratings={reviews} />
        </div>
      ) : null}
    </div>
  );
};

export default DoctorDetailsPage;
