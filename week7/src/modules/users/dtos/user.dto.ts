import { setPreference } from "../repositories/user.repository.js";

// 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  phoneNumber: string;
  password: string;
  preferences: number[];
}

//응답 DTO
export interface UserSignUpResponse {
  userId: number;
  preferCategory: string[];
}