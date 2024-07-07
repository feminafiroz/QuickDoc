import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import { ADMIN_API } from "../constants";
import { ReviewInterface } from "../types/ReviewInterface";

const useReviews = () => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/getallreviews")
      .then((response) => {
        console.log(response.data.reviews, "Backend response data"); // Log the response data
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return { reviews, setReviews };
};

export default useReviews;
