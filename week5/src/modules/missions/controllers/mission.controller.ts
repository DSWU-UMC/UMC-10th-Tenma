import { Request, Response } from "express";
import {
  createMission,
  challengeMission,
} from "../services/mission.service.js";
import {
  CreateMissionRequest,
  ChallengeMissionRequest,
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
    console.error(err);
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

export const handleChallengeMission = async (
  req: Request<{}, {}, ChallengeMissionRequest>,
  res: Response
): Promise<Response> => {
  try {
    const result = await challengeMission(req.body);

    return res.status(200).json({
      isSuccess: true,
      message: "미션 도전 성공",
      result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};