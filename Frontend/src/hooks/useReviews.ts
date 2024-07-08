import { useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import { ADMIN_API } from "../constants";
import { ReviewInterface } from "../types/doctoInterface";

const useReviews = () => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/getallreviews")
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return { reviews, setReviews };
};

export default useReviews;
