import { prisma } from "../../../db.config.js";
import { CreateMissionRequest } from "../dtos/mission.dto.js";
import { Mission, UserMission } from "../../../generated/prisma/client.js";

export const addMission = async (data: CreateMissionRequest): Promise<number> => {
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: data.storeId,
        deadline: data.deadline,
        condition: data.condition,
        point: data.point,
      },
    });
    return mission.id;
  } catch (err) {
    throw new Error(`미션 생성 중 오류가 발생했어요: ${err}`);
  }
};

export const getMissionById = async (missionId: number): Promise<Mission | null> => {
  try {
    return await prisma.mission.findUnique({
      where: { id: missionId },
    });
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했어요: ${err}`);
  }
};

export const getUserMissionByUserIdAndMissionId = async (
  userId: number,
  missionId: number
): Promise<UserMission | null> => {
  try {
    return await prisma.userMission.findFirst({
      where: { userId, missionId },
    });
  } catch (err) {
    throw new Error(`도전 중 미션 조회 중 오류가 발생했어요: ${err}`);
  }
};

export const addUserMission = async (
  userId: number,
  missionId: number
): Promise<number> => {
  try {
    const userMission = await prisma.userMission.create({
      data: {
        userId,
        missionId,
        completed: false,
      },
    });
    return userMission.id;
  } catch (err) {
    throw new Error(`미션 도전 중 오류가 발생했어요: ${err}`);
  }
};

export const getUserMissionById = async (userMissionId: number) => {
  return prisma.userMission.findUnique({
    where: { id: userMissionId },
  });
};

export const completeUserMission = async (userMissionId: number) => {
  return prisma.userMission.update({
    where: { id: userMissionId },
    data: { completed: true },
  });
};

export const getOngoingMissionsByUserId = async (userId: number) => {
  return prisma.userMission.findMany({
    where: {
      userId,
      completed: false,
    },
    include: {
      mission: {
        select: {
          id: true,
          condition: true,
          point: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getMissionsByStoreId = async (storeId: number) => {
  return prisma.mission.findMany({
    where: { storeId },
    include: {
      store: {
        select: {
          name: true,
          category: true,
        },
      },
    },
    orderBy: {
      deadline: "asc",
    },
  });
};