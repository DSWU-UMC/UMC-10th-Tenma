export interface CreateReviewRequest {
  userId: number;
  storeId: number;
  star: number;
  content: string;
}