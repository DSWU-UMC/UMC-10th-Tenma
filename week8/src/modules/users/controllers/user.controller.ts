import { Body, Controller, Post, Route, Tags } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
// tsoa에서 온 Response는 'TsoaResponse'로 부르겠다고 약속!
import { Response as TsoaResponse } from "tsoa"; 
// express에서 온 Response는 'ExpressResponse'로 부르겠다고 약속!
import { Response as ExpressResponse } from "express";

@Route("users") // 라우트 경로
@Tags("Users") // Swagger 태그
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup") // 엔드포인드 정의
  @TsoaResponse<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @TsoaResponse<ApiResponse<null>>(400, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호출
    return success(user); //성공 응답 보내기
  }
}
