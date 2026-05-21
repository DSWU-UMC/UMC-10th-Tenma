import { Body, Controller, Post, Route, Tags, Response } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("users") // 라우트 경로
@Tags("Users") // Swagger 태그
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 사용자의 회원가입을 처리합니다.
   */
  @Post("signup") // 엔드포인드 정의
  @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @Response<ApiResponse<null>>(400, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호출
    return success(user); //성공 응답 보내기
  }
}
