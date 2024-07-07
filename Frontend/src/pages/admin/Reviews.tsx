import React, { useState } from "react";
import AdminHeader from "../../components/admin/HeadernSidebar/Header";
import AdminSidebar from "../../components/admin/HeadernSidebar/Sidebar";
import useReviews from "../../hooks/useReviews";
import ReviewData from "../../components/admin/ReviewData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toaster";

const ReviewList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;
  const { reviews, setReviews } = useReviews();

  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / usersPerPage);

  const currentReviews = reviews.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = (id: string) => {
    axiosJWT
      .delete(`${ADMIN_API}/reviews/remove/${id}`)
      .then((response) => {
        if (response.data.success) {
          showToast(response.data.message);
          setReviews(reviews.filter((b) => b._id !== id));
        } else {
          showToast(response.data.message);
        }
      })
      .catch(() => {
        console.error("An error occurred, please try again.");
        showToast("Oops! Something went wrong", "error")
      });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminHeader />
        <div className="p-6">
          <ToastContainer />
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold mb-4 text-center w-full ">
              Comments
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-3/4 mx-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left">Sl.No</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((review, index) => (
                  <ReviewData
                    // key={review._id}
                    serialNo={(currentPage - 1) * usersPerPage + index + 1}
                    review={review}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
