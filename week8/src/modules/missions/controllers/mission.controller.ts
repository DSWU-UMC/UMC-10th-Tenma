import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags, Response } from "tsoa";
import {
  createMission as createMissionService,
  challengeMission as challengeMissionService,
  completeMission as completeMissionService,
  listOngoingMissions as listOngoingMissionsService,
  listStoreMissions as listStoreMissionsService,
} from "../services/mission.service.js";
import {
  CreateMissionRequest,
  ChallengeMissionRequest,
  OngoingMissionListResponse,
  StoreMissionListResponse
} from "../dtos/mission.dto.js";
import { success, ApiResponse } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Mission")
export class MissionController {

  /**
   * 미션 생성 API
   * @summary 새로운 미션을 생성합니다.
   */
  @SuccessResponse("201", "미션 생성 성공")
  @Post()
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async createMission(
    @Body() body: CreateMissionRequest
  ): Promise<ApiResponse<{ missionId: number }>> {
    const result = await createMissionService(body);
    return success(result);
  }

  /**
   * 미션 도전 API
   * @summary 사용자가 미션에 도전합니다.
   */
  @Post("challenge/{userId}")
  @Response<ApiResponse<null>>(400, "이미 진행 중인 미션")
  @Response<ApiResponse<null>>(404, "미션 또는 사용자를 찾을 수 없음")
  public async challengeMission(
    /**
     * 미션에 도전할 사용자 ID
     */
    @Path() userId: number,
    @Body() body: ChallengeMissionRequest
  ): Promise<ApiResponse<{ userMissionId: number }>> {
    const result = await challengeMissionService(userId, body.missionId);
    return success(result);
  }

  /**
   * 미션 완료 API
   * @summary 진행 중인 미션을 완료 처리합니다.
   */
  @Post("complete/{userId}/{userMissionId}")
  @Response<ApiResponse<null>>(404, "진행 중인 미션을 찾을 수 없음")
  public async completeMission(
    /**
     * 미션을 완료할 사용자 ID
     */
    @Path() userId: number,
    /**
     * 진행 중인 사용자 미션 ID
     */
    @Path() userMissionId: number
  ): Promise<ApiResponse<{ userMissionId: number; completed: boolean }>> {
    const result = await completeMissionService(userId, userMissionId);
    return success(result);
  }

  /**
   * 진행 중인 미션 조회 API
   * @summary 사용자의 진행 중인 미션 목록을 조회합니다.
   */
  @Get("ongoing/{userId}")
  @Response<ApiResponse<null>>(404, "사용자를 찾을 수 없음")
  public async listOngoingMissions(
    /**
     * 조회할 사용자 ID
     */
    @Path() userId: number
  ): Promise<ApiResponse<OngoingMissionListResponse>> {
    const result = await listOngoingMissionsService(userId);
    return success(result);
  }

  /**
   * 가게 미션 목록 조회 API
   * @summary 특정 가게의 미션 목록을 조회합니다.
   */
  @Get("store/{storeId}")
  @Response<ApiResponse<null>>(404, "가게를 찾을 수 없음")
  public async listStoreMissions(
    /**
    * 미션 목록을 조회할 가게 ID
    */
    @Path() storeId: number
  ): Promise<ApiResponse<StoreMissionListResponse>> {
    const result = await listStoreMissionsService(storeId);
    return success(result);
  }
}