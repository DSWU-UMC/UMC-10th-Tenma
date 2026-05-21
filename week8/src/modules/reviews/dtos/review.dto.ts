export interface CreateReviewRequest {

  /**
   * 리뷰 작성 사용자 ID
   * @example 1
   */
  userId: number;

  /**
   * 리뷰를 작성할 가게 ID
   * @example 3
   */
  storeId: number;

  /**
   * 별점
   * @example 5
   */
  star: number;

  /**
   * 리뷰 내용
   * @example "치킨이 맛있어요!"
   */
  content: string;
}

export interface MyReviewResponse {

  /**
   * 리뷰 ID
   * @example 1
   */
  reviewId: number;

  /**
   * 작성자 닉네임
   * @example "희주"
   */
  nickname: string;

  /**
   * 별점
   * @example 4
   */
  star: number;

  /**
   * 리뷰 내용
   * @example "재방문 의사 있습니다."
   */
  content: string;

  /**
   * 리뷰 작성 시간
   * @example "2026-05-21T10:00:00.000Z"
   */
  createdAt: Date;
}