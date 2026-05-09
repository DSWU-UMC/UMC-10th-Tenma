import { Request, Response } from "express";
import {
  createMission,
  challengeMission,
  completeMission,
  listOngoingMissions,
} from "../services/mission.service.js";
import {
  CreateMissionRequest,
  ChallengeMissionRequest,
  CompleteMissionRequest,
} from "../dtos/mission.dto.js";

export const handleCreateMission = async (
  req: Request<{}, {}, CreateMissionRequest>,
  res: Response
): Promise<Response> => {
  try {
    const result = await createMission(req.body);

    return res.status(201).json({
      isSuccess: true,
      message: "미션 생성 성공",
      result,
    });
  } catch (err: any) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

export const handleChallengeMission = async (
  req: Request<{ userId: string }, {}, ChallengeMissionRequest>,
  res: Response
): Promise<Response> => {
  try {
    const userId = Number(req.params.userId);
    const { missionId } = req.body;

    const result = await challengeMission(userId, missionId);

    return res.status(200).json({
      isSuccess: true,
      message: "미션 도전 성공",
      result,
    });
  } catch (err: any) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

export const handleCompleteMission = async (
  req: Request<{ userId: string; userMissionId: string }, {}, CompleteMissionRequest>,
  res: Response
): Promise<Response> => {
  try {
    const userId = Number(req.params.userId);
    const userMissionId = Number(req.params.userMissionId);

    const result = await completeMission(userId, userMissionId);

    return res.status(200).json({
      isSuccess: true,
      message: "미션 완료 성공",
      result,
    });
  } catch (err: any) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

export const handleListOngoingMissions = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const userId = Number(req.params.userId);

    const result = await listOngoingMissions(userId);

    return res.status(200).json({
      isSuccess: true,
      message: "진행 중 미션 조회 성공",
      result,
    });

  } catch (err: any) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

import { listStoreMissions } from "../services/mission.service.js";

export const handleListStoreMissions = async (
  req: Request<{ storeId: string }>,
  res: Response
): Promise<Response> => {
  try {
    const storeId = Number(req.params.storeId);
    const result = await listStoreMissions(storeId);

    return res.status(200).json({
      isSuccess: true,
      message: "가게 미션 조회 성공",
      result,
    });
  } catch (err: any) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};