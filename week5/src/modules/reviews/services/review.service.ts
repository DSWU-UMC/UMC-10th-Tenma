import { getStoreById } from "../../stores/repositories/store.repository.js";
import { addReview } from "../repositories/review.repository.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const createReview = async (data: CreateReviewRequest) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new Error("리뷰를 추가할 가게가 존재하지 않습니다.");
  }

  const reviewId = await addReview(data);

  return {
    reviewId,
  };
};