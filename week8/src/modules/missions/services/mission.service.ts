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
import { StoreNotFoundError, MissionNotFoundError, MissionAlreadyChallengedError, UserMissionNotFoundError, ForbiddenMissionAccessError, MissionAlreadyCompletedError } from "../../../common/errors/error.js";


export const createMission = async (data: CreateMissionRequest) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new StoreNotFoundError(data.storeId);
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
    throw new MissionNotFoundError(missionId);
  }

  const existing = await getUserMissionByUserIdAndMissionId(userId, missionId);

  if (existing) {
    throw new MissionAlreadyChallengedError(missionId);
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
    throw new UserMissionNotFoundError(userMissionId);
  }

  if (userMission.userId !== userId) {
    throw new ForbiddenMissionAccessError(userId, userMissionId);
  }

  if (userMission.completed) {
    throw new MissionAlreadyCompletedError(userMissionId);
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
    storeCategory: m.store.category.name,
    condition: m.condition,
    point: m.point,
    deadline: m.deadline,
  }));

  return { data };
};