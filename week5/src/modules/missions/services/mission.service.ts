import { getStoreById } from "../../stores/repositories/store.repository.js";
import {
  addMission,
  getMissionById,
  getUserMissionByUserIdAndMissionId,
  addUserMission,
} from "../repositories/mission.repository.js";
import {
  CreateMissionRequest,
  ChallengeMissionRequest,
} from "../dtos/mission.dto.js";

export const createMission = async (data: CreateMissionRequest) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new Error("미션을 추가할 가게가 존재하지 않습니다.");
  }

  const missionId = await addMission(data);

  return {
    missionId,
  };
};

export const challengeMission = async (data: ChallengeMissionRequest) => {
  const mission = await getMissionById(data.missionId);

  if (!mission) {
    throw new Error("도전할 미션이 존재하지 않습니다.");
  }

  const userMission = await getUserMissionByUserIdAndMissionId(
    data.userId,
    data.missionId
  );

  if (userMission) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await addUserMission(data.userId, data.missionId);

  return {
    userMissionId,
  };
};