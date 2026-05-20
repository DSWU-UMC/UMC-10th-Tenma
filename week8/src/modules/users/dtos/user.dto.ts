import { setPreference } from "../repositories/user.repository.js";

// 요청 DTO
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 이름 */
  name: string;
  gender: string;
  birth: Date;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  phoneNumber: string;
  password: string;
  /** 선호 음식 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

//응답 DTO
export interface UserSignUpResponse {
  userId: number;
  preferCategory: string[];
}