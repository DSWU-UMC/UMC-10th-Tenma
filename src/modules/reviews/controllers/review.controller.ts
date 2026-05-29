import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags, Security, Response } from "tsoa";
import { success, ApiResponse } from "../../../common/responses/response.js";
import { createReview, listMyReviews } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

@Route("reviews")
@Tags("Review")
export class ReviewController extends Controller {

  /**
   * 리뷰 생성 API
   * @summary 리뷰를 작성합니다.
   */
  @Security("jwt")
  @Post()
  @SuccessResponse("201", "리뷰 생성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async createReview(
    @Body() body: CreateReviewRequest
  ): Promise<ApiResponse<{ reviewId: number }>> {
    const result = await createReview(body);
    this.setStatus(201);

    return success(result);
  }

  /**
   * 내가 작성한 리뷰 조회 API
   * @summary 특정 사용자의 리뷰 목록을 조회합니다.
   */
  @Get("users/{userId}")
  @Response<ApiResponse<null>>(404, "사용자를 찾을 수 없음")
  public async listMyReviews(
    /**
     * 리뷰를 조회할 사용자 ID
     */
    @Path() userId: number,
    /**
     * 커서 기반 페이지네이션 값
     */
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const result = await listMyReviews(userId, cursor);

    return success(result);
  }
}