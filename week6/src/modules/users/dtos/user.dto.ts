// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
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

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => ({
  email: body.email,
  name: body.name,
  gender: body.gender,
  birth: new Date(body.birth),
  address: body.address ?? "",
  phoneNumber: body.phoneNumber,
  password: body.password,
  preferences: body.preferences, // foodId[]
});

// 3. 서비스에서 받은 사용자 정보와 선호 카테고리 목록을 응답 DTO로 변환합니다.
export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}

export const responseFromUser = (
  data: { user: any; preferences: any[] }
): UserSignUpResponse => {
  const preferCategory = data.preferences.map((p) => p.food.name);
  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};

export interface UserParam {
  userId: number;
}