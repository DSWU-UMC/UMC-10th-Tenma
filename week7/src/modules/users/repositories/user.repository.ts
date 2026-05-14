import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) return null;

  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      phoneNumber: data.phoneNumber,
      password: data.password,
    },
  });

  return createdUser.id;
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({
    where: { id: userId },
  });
};


// 3. 음식 선호 매핑
export const setPreference = async (
  userId: number,
  foodId: number
) => {
  await prisma.userFood.create({
    data: {
      userId,
      foodId,
    },
  });
};

// 4. 사용자 선호 음식 반환
export const getUserPreferencesByUserId = async (userId: number) => {
  const preferences = await prisma.userFood.findMany({
    where: { userId },
    include: {
      food: true,
    },
    orderBy: {
      foodId: "asc",
    },
  });

  return preferences;
};

export const getReviewsByUserId = async (
  userId: number,
  cursor: number,
  take: number = 10
) => {
  return await prisma.review.findMany({
    where: { userId },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
    include: {
      store: {
        select: { name: true, address: true },
      },
    },
  });
};

export const getMissionsByUserId = async (
  userId: number,
  cursor: number,
  take: number = 10
) => {
  return await prisma.userMission.findMany({
    where: { userId, completed: false },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: "asc" },
    include: {
      mission: {
        include: {
          store: { select: { name: true } },
        },
      },
    },
  });
};