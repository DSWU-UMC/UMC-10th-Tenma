import { getStoreById } from "../../stores/repositories/store.repository.js";
import {
  addMission,
  getMissionById,
  getUserMissionByUserIdAndMissionId,
  addUserMission,
  getUserMissionById,
  completeUserMission,
  getOngoingMissionsByUserId,
  getMissionsByStoreId
} from "../repositories/mission.repository.js";
import { CreateMissionRequest } from "../dtos/mission.dto.js";

export const createMission = async (data: CreateMissionRequest) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new Error("미션을 추가할 가게가 존재하지 않습니다.");
  }

  const missionId = await addMission(data);
  return { missionId };
};

export const challengeMission = async (
  userId: number,
  missionId: number
) => {
  const mission = await getMissionById(missionId);

  if (!mission) {
    throw new Error("도전할 미션이 존재하지 않습니다.");
  }

  const existing = await getUserMissionByUserIdAndMissionId(userId, missionId);

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await addUserMission(userId, missionId);

  return { userMissionId };
};

export const completeMission = async (
  userId: number,
  userMissionId: number
) => {
  const userMission = await getUserMissionById(userMissionId);

  if (!userMission) {
    throw new Error("존재하지 않는 유저 미션입니다.");
  }

  if (userMission.userId !== userId) {
    throw new Error("본인의 미션만 완료할 수 있습니다.");
  }

  if (userMission.completed) {
    throw new Error("이미 완료된 미션입니다.");
  }

  await completeUserMission(userMissionId);

  return {
    userMissionId,
    completed: true,
  };
};

export const listOngoingMissions = async (userId: number) => {
  const missions = await getOngoingMissionsByUserId(userId);

  const data = missions.map((m) => ({
    userMissionId: m.id,
    point: m.mission.point,
    storeName: m.mission.store.name,
    condition: m.mission.condition,
  }));

  return { data };
};

export const listStoreMissions = async (storeId: number) => {
  const missions = await getMissionsByStoreId(storeId);

  const data = missions.map((m) => ({
    missionId: m.id,
    storeName: m.store.name,
    storeCategory: m.store.category,
    condition: m.condition,
    point: m.point,
    deadline: m.deadline,
  }));

  return { data };
};