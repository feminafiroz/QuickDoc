import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_API } from '../../constants';
import { DoctorInterface } from '../../types/doctoInterface';
import { DepartmentInterface } from '../../types/departmentInterface';
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import axiosJWT from '../../utils/axiosService';
import { Rating } from "flowbite-react";
import { ReviewInterface } from '../../types/doctoInterface';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DoctorItemsShimmer from '../Shimmers/DoctorItemShimmer';

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const time = `${formattedHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
      const nextHour = minute === 30 ? (hour === 12 ? 1 : hour + 1) : hour;
      const nextMinute = minute === 30 ? "00" : "30";
      const nextPeriod = nextHour < 12 ? "AM" : "PM";
      const nextFormattedHour =
        nextHour > 12 ? nextHour - 12 : nextHour === 0 ? 12 : nextHour;
      const nextTime = `${nextFormattedHour
        .toString()
        .padStart(2, "0")}:${nextMinute} ${nextPeriod}`;
      const label = `${time} - ${nextTime}`;
      const value = `${formattedHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
      options.push(
        <option key={value} value={value}>
          {label}
        </option>
      );
    }
  }
  return options;
};

const DoctorListingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [departments, setDepartments] = useState<
    {
      _id: string;
      departmentName: string;
      isListed: boolean;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filtersUsed, setFiltersUsed] = useState<boolean>(false); // New state to track if any filters are used
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [departmentNames, setDepartmentNames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const timeSlots = generateTimeOptions();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/getallreviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const departmentResponse = await axiosJWT.get(
          `${USER_API}/department/list`
        );

        if (departmentResponse.data.success) {
          const listedDepartments =
            departmentResponse.data.departments.filter(
              (department: any) => department.isListed
            );

          const departmentMap = listedDepartments.reduce(
            (acc: { [key: string]: string }, dept: DepartmentInterface) => {
              acc[dept._id] = dept.departmentName;
              return acc;
            },
            {}
          );

          setDepartments(listedDepartments);

          const departmentIds = listedDepartments.map(
            (department: any) => department._id
          );

          const response = await axiosJWT.get(`${USER_API}/doctors`, {
            params: {
              searchQuery,
              department: selectedDepartment,
              selectedDate: selectedDate ? new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null,
              selectedTimeSlot,
              page: currentPage,
              limit: itemsPerPage,
            },
          });

          const filteredDoctors = response.data.doctors.filter(
            (doctor: any) =>
              departmentIds.includes(doctor.department) &&
              doctor.isApproved === true
          );

          const doctorsWithDepartments = filteredDoctors.filter(
            (doctor: DoctorInterface) =>
              departmentMap[doctor.department as string]
          );

          setDoctors(doctorsWithDepartments);
          setDepartmentNames(departmentMap);
          setTotalPages(Math.ceil(response.data.total / itemsPerPage));
          setFiltersUsed(
            searchQuery !== "" ||
            selectedDepartment !== "" ||
            selectedDate !== null ||
            selectedTimeSlot !== ""
          );
        } else {
          throw new Error("Failed to fetch department details");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchDoctors();
    fetchReviews();
  }, [
    searchQuery,
    selectedDepartment,
    selectedDate,
    selectedTimeSlot,
    currentPage,
    itemsPerPage,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedDate(null);
    setSelectedTimeSlot("");
    setCurrentPage(1); // reset to first page
    setFiltersUsed(false); // Reset the state to indicate no filters are used
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getAverageRating = (doctorId: string) => {
    const doctorReviews = reviews.filter(review => review.doctor === doctorId);
    if (doctorReviews.length === 0) return "4.1";

    const averageRating = (
      doctorReviews.reduce((acc, review) => acc + review.rating, 0) / doctorReviews.length
    ).toFixed(1);
    return averageRating;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mx-auto px-8 py-8 bg-gray-100">
      {/* Filter Section on the Left */}
      <div className="lg:w-1/4 mb-4 lg:mb-0 pt-10 lg:pr-14  ">
        <h2 className="text-2xl font-semibold mb-4">Filter</h2>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="border border-gray-300 shadow-lg flex items-center relative rounded-md w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded-md px-4 py-2 w-full"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer">
                <FaSearch />
              </div>
            </div>
          </div>
          {/* Department Dropdown */}
          <div className="border border-gray-300 shadow-lg rounded-md w-full">
            <select
              className="rounded-md px-4 py-2 w-full"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option
                  key={department._id}
                  className="text-gray-700"
                  value={department._id}
                >
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>
          {/* Time Slot Dropdown */}
          <div className="border border-gray-300 shadow-lg rounded-md w-full">
            <select
              className="rounded-md px-4 py-2 w-full"
              value={selectedTimeSlot}
              onChange={handleTimeSlotChange}
            >
              <option value="">Select Time Slot</option>
              {timeSlots}
            </select>
          </div>
          {/* Date Picker */}
          <div className="border border-gray-300 shadow-lg rounded-md w-full relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="rounded-md px-4 py-2 w-full pl-10"
              minDate={new Date()}
              placeholderText="Select Date"
            />
            <div className="absolute top-3 left-2 text-gray-700">
              <FaCalendarAlt />
            </div>
          </div>
          {/* Clear Filters Button */}
          {filtersUsed && (
            <button
              className="bg-green-700 hover:bg-green-600 text-white rounded-md px-4 py-2 w-full"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Doctor Cards on the Right */}
      {isLoading ? (
        <div className="lg:w-3/4">
          {Array.from({ length: 8 }).map((_, index) => (
            <DoctorItemsShimmer key={index} />
          ))}
        </div>
      ) : (
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold text-center mb-8">Find a Doctor</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
                <div key={doctor._id} className="doctor-card bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={doctor.profileImage || 'default_profile_image_url'}
                      alt={doctor.doctorName}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-semibold">{doctor.doctorName}</h2>
                    <p className="text-gray-600">
                      {departmentNames[doctor.department as string] || ""}
                    </p>
                    <div className="text-gray-600 font-semibold mb-2">
                      <Rating>
                        <Rating.Star className="text-orange-400" />
                        <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">
                          {getAverageRating(doctor._id)}
                        </p>
                      </Rating>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-green-700 text-white"
                    : "bg-white text-green-700 border border-green-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DoctorListingPage;
