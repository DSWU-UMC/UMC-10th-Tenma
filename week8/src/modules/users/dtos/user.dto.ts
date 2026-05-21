// 요청 DTO
export interface UserSignUpRequest {

  /**
   * 유저 이메일 (로그인 시 사용)
   * @example "test@example.com"
   */
  email: string;

  /**
   * 유저 이름
   * @example "희주"
   */
  name: string;

  /**
   * 성별
   * @example "FEMALE"
   */
  gender: string;

  /**
   * 생년월일
   * @example "2000-01-01T00:00:00.000Z"
   */
  birth: Date;

  /**
   * 주소
   * @example "서울특별시 강북구"
   */
  address?: string;

  /**
   * 전화번호
   * @example "01012345678"
   */
  phoneNumber: string;

  /**
   * 비밀번호
   * @example "qwer1234!"
   */
  password: string;

  /**
   * 선호 음식 카테고리 ID 배열
   * @example [1, 2]
   */
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {

  /**
   * 생성된 사용자 ID
   * @example 1
   */
  userId: number;

  /**
   * 선호 카테고리 이름 목록
   * @example ["일식", "중식"]
   */
  preferCategory: string[];
}