export interface CreateStoreRequest {
  categoryId: number;
  regionId: number;
  name: string;
  address: string;
  masterNum: number;
}

export interface ListStoreReviewsRequest {
  storeId: number;
  cursor: number;
}

export interface ReviewItem {
  id: number;
  userName: string;
  star: number;
  content: string;
}

export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null;
  };
}

export interface StoreParam {
  storeId: number;
}

export const listStoreReviewsResponseDTO = (
  data: { id: number; star: number; content: string; user: { name: string } }[]
): ReviewListResponse => {
  const reviews: ReviewItem[] = data.map((review) => ({
    id: review.id,
    userName: review.user.name,
    star: review.star,
    content: review.content,
  }));

  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

