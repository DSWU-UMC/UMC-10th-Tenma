import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleCreateStore, handleListsStoreReviews } from "./modules/stores/controllers/store.controller.js";
import { handleCreateReview, handleListMyReviews } from "./modules/reviews/controllers/review.controller.js";
import { handleCreateMission,handleChallengeMission, handleCompleteMission, handleListOngoingMissions, handleListStoreMissions } from "./modules/missions/controllers/mission.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 4. 사용자 API
app.post("/api/users/signup", handleUserSignUp); // 회원가입
app.get("/api/users/:userId/reviews", handleListMyReviews); // 내가 작성한 리뷰 목록 조회
app.get("/api/users/:userId/missions", handleListOngoingMissions); // 내가 도전 중인 미션 목록 조회

// 5. 가게 API
app.post("/api/stores", handleCreateStore); // 가게 추가
app.get("/api/stores/:storeId/reviews", handleListsStoreReviews); // 가게 리뷰 목록 조회
app.get("/api/stores/:storeId/missions", handleListStoreMissions); // 가게 미션 목록 조회

// 6. 리뷰 API
app.post("/api/reviews", handleCreateReview); // 리뷰 작성

// 7. 미션 API
app.post("/api/missions", handleCreateMission); // 미션 추가
app.post("/api/users/:userId/missions", handleChallengeMission); // 미션 도전
app.patch("/api/users/:userId/missions/:userMissionId", handleCompleteMission); // 미션 성공

// 8. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});