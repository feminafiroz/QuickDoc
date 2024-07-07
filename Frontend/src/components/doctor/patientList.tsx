import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosJWT from "../../utils/axiosService";
import { DOCTOR_API } from "../../constants";
import { RootState } from "../../redux/reducer/reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import Calender from '../../assets/images/Calender.svg';

interface BookingDetail {
  _id: string;
  patientName: string;
  patientAge: number;
  date: string;
  timeSlot: string;
}

const AppointmentDetails: React.FC = () => {
  const id = useSelector((state: RootState) => state.DoctorSlice.id);
   const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosJWT.get(
          `${DOCTOR_API}/bookingdetails/${id}`
        );
        const bookingData = response.data.data.bookingDetails;
        console.log(bookingData)
        setBookingDetails(bookingData);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filteredAppointments = bookingDetails.filter((bookingDetail) => {
    if (!selectedDate) return true;
    return (
      new Date(bookingDetail.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Appointment List</h1>

      <div className="flex justify-start mb-4">
        <div className="w-full max-w-xs relative">
          <div className="border border-gray-500 shadow-lg rounded-md relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="rounded-md px-4 py-2 w-full pl-10"
              placeholderText="Select Date"
            />
            <div className="absolute top-3 left-2 text-gray-700">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
       <div className="flex flex-col items-center justify-center h-full">
       <p className="text-xl text-center mb-4">You have no appointments booked.</p>
       <img src={Calender} alt="calender pic" className="mx-auto" />
     </div>
       
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-800 text-white">
                <th className="py-2 px-4 border-b">Patient Name</th>               
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((bookingDetail) => (
                <tr
                  key={bookingDetail._id}
                  className="hover:bg-gray-200 cursor-pointer transition duration-300"
                >
                  <td className="py-2 px-4 border-b text-center">
                    {bookingDetail.patientName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(bookingDetail.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{bookingDetail.timeSlot}</td>
                  <td className="py-2 px-4 border-b text-center">
                  <button
                      className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => window.location.href = `/patient_details/${bookingDetail._id}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
