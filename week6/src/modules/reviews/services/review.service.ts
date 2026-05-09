import { getStoreById } from "../../stores/repositories/store.repository.js";
import { addReview, getReviewsByUserId } from "../repositories/review.repository.js";
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

export const listMyReviews = async (userId: number, cursor?: number) => {
  const reviews = await getReviewsByUserId(userId, cursor);

  const data = reviews.map(r => ({
    reviewId: r.id,
    nickname: r.user.name,
    star: r.star,
    content: r.content,
    createdAt: r.createdAt
  }));

  const lastReview = reviews.at(-1);

  return {
    data,
    nextCursor: lastReview ? lastReview.id : null
  };
};