import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { createStore, listStoreReviews } from "../services/store.service.js";
import { CreateStoreRequest, ReviewListResponse } from "../dtos/store.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Store")
export class StoreController extends Controller {

  // 가게 생성
  @SuccessResponse("201", "Created")
  @Post()
  public async createStore(
    @Body() body: CreateStoreRequest
  ): Promise<ApiResponse<{ storeId: number }>> {
    const result = await createStore(body);
    this.setStatus(201);

    return success(result);
  }

  // 가게 리뷰 목록 조회
  @Get("{storeId}/reviews")
  public async listStoreReviews(

    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<ReviewListResponse>> {
    const result = await listStoreReviews(storeId, cursor ?? 0);

    return success(result);
  }
}