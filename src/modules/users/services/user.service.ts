import bcrypt from "bcrypt";
import { UserSignUpRequest, UserSignUpResponse, UpdateMyInfoRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../auth.config.js";
import { prisma } from "../../../db.config.js";

const SALT_ROUNDS = 10;

export const userSignUp = async (data: UserSignUpRequest) => {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  // DB 저장
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,   // 해싱된 값 저장
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const userId = user!.id;
  const preferCategory = (await getUserPreferencesByUserId(joinUserId)).map(
    (obj) => obj.food.name,
  );
  const accessToken = generateAccessToken({
    id: userId,
    email: user!.email,
  });

  const refreshToken = generateRefreshToken({
    id: userId,
  });

  return <UserSignUpResponse>{
    userId,
    preferCategory,
    accessToken,
    refreshToken
  };
};

export const updateMyInfo = async (
  userId: number,
  body: UpdateMyInfoRequest
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: body,
  });
  return {
    userId: updatedUser.id,
  };
}