export interface CreateStoreRequest {

  /**
   * 가게 카테고리 ID
   * @example 1
   */
  categoryId: number;

  /**
   * 가게가 속한 지역 ID
   * @example 3
   */
  regionId: number;

  /**
   * 가게 이름
   * @example "맘스터치 성수점"
   */
  name: string;

  /**
   * 가게 주소
   * @example "서울특별시 성동구 성수동 123-45"
   */
  address: string;

  /**
   * 가게 전화번호
   * @example "0212345678"
   */
  masterNum: number;
}

export interface ListStoreReviewsRequest {

  /**
   * 리뷰를 조회할 가게 ID
   * @example 1
   */
  storeId: number;

  /**
   * 페이지네이션 커서 값
   * @example 10
   */
  cursor: number;
}

export interface ReviewItem {

  /**
   * 리뷰 ID
   * @example 1
   */
  id: number;

  /**
   * 리뷰 작성자 이름
   * @example "희주"
   */
  userName: string;

  /**
   * 별점
   * @example 5
   */
  star: number;

  /**
   * 리뷰 내용
   * @example "맛있어요!"
   */
  content: string;
}

export interface ReviewListResponse {

  /**
   * 리뷰 목록
   */
  data: ReviewItem[];

  pagination: {

    /**
     * 다음 페이지 조회용 커서
     * @example 15
     */
    cursor: number | null;
  };
}

export interface StoreParam {

  /**
   * 가게 ID
   * @example 1
   */
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

