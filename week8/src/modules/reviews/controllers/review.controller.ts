import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { success, ApiResponse } from "../../../common/responses/response.js";
import { createReview, listMyReviews } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

@Route("reviews")
@Tags("Review")
export class ReviewController extends Controller {

  @Post()
  @SuccessResponse("201", "Created")
  public async createReview(
    @Body() body: CreateReviewRequest
  ): Promise<ApiResponse<{ reviewId: number }>> {
    const result = await createReview(body);
    this.setStatus(201);

    return success(result);
  }

  @Get("users/{userId}")
  public async listMyReviews(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const result = await listMyReviews(userId, cursor);

    return success(result);
  }
}