import bcrypt from "bcrypt";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

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
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};