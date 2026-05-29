import { Body, Controller, Post, Get, Patch, Route, Security, Tags, Request, Response } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse, UpdateMyInfoRequest } from "../dtos/user.dto.js";
import { userSignUp, updateMyInfo } from "../services/user.service.js";
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

  /**
   * 마이페이지 조회 API
   * @summary 로그인한 사용자의 정보를 조회합니다.
   */
  @Security("jwt")
  @Get("mypage")
  @Response<ApiResponse<null>>(401, "인증 실패")
  public async getMyPage(
    @Request() req: Express.Request,
  ): Promise<ApiResponse<any>> {
    const user = req.user as any;
    return success(user);
  }

  /**
   * 내 정보 수정 API
   * @summary 로그인한 사용자의 정보를 수정합니다.
   */
  @Security("jwt")
  @Patch("me")
  @Response<ApiResponse<{ userId: number }>>(200, "회원 정보 수정 성공")
  @Response<ApiResponse<null>>(401, "인증 실패")
  public async handleUpdateMyInfo(
    @Request() req: Express.Request,
    @Body() body: UpdateMyInfoRequest,
  ): Promise<ApiResponse<{ userId: number }>> {
    const user = req.user as any;
    const result = await updateMyInfo(
      user.id,
      body,
    );
    return success(result);
  }
}
