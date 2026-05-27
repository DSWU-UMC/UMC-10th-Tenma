import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags, Security, Response } from "tsoa";
import { createStore, listStoreReviews } from "../services/store.service.js";
import { CreateStoreRequest, ReviewListResponse } from "../dtos/store.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Store")
export class StoreController extends Controller {

  /**
   * 가게 생성 API
   * @summary 새로운 가게를 생성합니다.
   */
  @Security("jwt")
  @SuccessResponse("201", "가게 생성 성공")
  @Post()
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async createStore(
    @Body() body: CreateStoreRequest
  ): Promise<ApiResponse<{ storeId: number }>> {
    const result = await createStore(body);
    this.setStatus(201);

    return success(result);
  }

  /**
   * 가게 리뷰 목록 조회 API
   * @summary 특정 가게의 리뷰 목록을 조회합니다.
   */
  @Get("{storeId}/reviews")
  @SuccessResponse("200", "가게 리뷰 목록 조회 성공")
  @Response<ApiResponse<null>>(404, "가게를 찾을 수 없음")
  public async listStoreReviews(
    /**
     * 리뷰를 조회할 가게 ID
     */
    @Path() storeId: number,
    /**
     * 커서 기반 페이지네이션 값
     */
    @Query() cursor?: number
  ): Promise<ApiResponse<ReviewListResponse>> {
    const result = await listStoreReviews(storeId, cursor ?? 0);

    return success(result);
  }
}