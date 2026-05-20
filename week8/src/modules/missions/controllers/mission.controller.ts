import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
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

  @SuccessResponse("201", "미션 생성 성공")
  @Post()
  public async createMission(
    @Body() body: CreateMissionRequest
  ): Promise<ApiResponse<{ missionId: number }>> {
    const result = await createMissionService(body);
    return success(result);
  }

  @Post("challenge/{userId}")
  public async challengeMission(
    @Path() userId: number,
    @Body() body: ChallengeMissionRequest
  ): Promise<ApiResponse<{ userMissionId: number }>> {
    const result = await challengeMissionService(userId, body.missionId);
    return success(result);
  }

  @Post("complete/{userId}/{userMissionId}")
  public async completeMission(
    @Path() userId: number,
    @Path() userMissionId: number
  ): Promise<ApiResponse<{ userMissionId: number; completed: boolean }>> {
    const result = await completeMissionService(userId, userMissionId);
    return success(result);
  }

  @Get("ongoing/{userId}")
  public async listOngoingMissions(
    @Path() userId: number
  ): Promise<ApiResponse<OngoingMissionListResponse>> {
    const result = await listOngoingMissionsService(userId);
    return success(result);
  }

  @Get("store/{storeId}")
  public async listStoreMissions(
    @Path() storeId: number
  ): Promise<ApiResponse<StoreMissionListResponse>> {
    const result = await listStoreMissionsService(storeId);
    return success(result);
  }
}