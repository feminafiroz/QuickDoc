import React, { useState } from "react";
import { ReviewInterface } from "../../types/doctoInterface";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ReviewDataProps {
  serialNo: number;
  review: ReviewInterface;
  onDelete: (id: string) => void;
}

const ReviewData: React.FC<ReviewDataProps> = ({ serialNo, review, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>('');

  const handleConfirm = () => {
    if (actionType === 'delete') {
      onDelete(review._id);
    }
    setShowConfirmModal(false);
  };

  const handleDeleteClick = () => {
    setActionType('delete');
    setShowConfirmModal(true);
  };

  return (
    <>
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Confirm {actionType === "delete" ? "delete" : "not delete"}
            </h2>
            <p className="mb-4">
              Are you sure you want to {actionType} the review?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white truncate" style={{ maxWidth: '50px' }}>
          {serialNo}
        </td>
        <td className="px-6 py-4 text-left ">{review.reviewText}</td>
        <td className="px-6 py-4 text-left">
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ReviewData;
