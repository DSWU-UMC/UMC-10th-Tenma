export interface CreateReviewRequest {
  userId: number;
  storeId: number;
  star: number;
  content: string;
}

export interface MyReviewResponse {
  reviewId: number;
  nickname: string;
  star: number;
  content: string;
  createdAt: Date;
}