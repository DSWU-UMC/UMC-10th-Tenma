import { AppError } from "./app.error.js";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

export class StoreNotFoundError extends AppError {
  constructor(storeId: number) {
    super({
      errorCode: "S001",
      statusCode: 404,
      message: "존재하지 않는 가게입니다.",
      data: { storeId },
    });
  }
}

export class MissionNotFoundError extends AppError {
  constructor(missionId: number) {
    super({
      errorCode: "M001",
      statusCode: 404,
      message: "존재하지 않는 미션입니다.",
      data: { missionId },
    });
  }
}

export class UserMissionNotFoundError extends AppError {
  constructor(userMissionId: number) {
    super({
      errorCode: "M002",
      statusCode: 404,
      message: "존재하지 않는 유저 미션입니다.",
      data: { userMissionId },
    });
  }
}

export class StoreMissionNotFoundError extends AppError {
  constructor(storeId: number) {
    super({
      errorCode: "M003",
      statusCode: 404,
      message: "해당 가게의 미션이 존재하지 않습니다.",
      data: { storeId },
    });
  }
}

export class MissionAlreadyChallengedError extends AppError {
  constructor(missionId: number) {
    super({
      errorCode: "M004",
      statusCode: 409,
      message: "이미 도전 중인 미션입니다.",
      data: { missionId },
    });
  }
}

export class ForbiddenMissionAccessError extends AppError {
  constructor(userId: number, userMissionId: number) {
    super({
      errorCode: "M005",
      statusCode: 403,
      message: "본인의 미션만 완료할 수 있습니다.",
      data: { userId, userMissionId },
    });
  }
}

export class MissionAlreadyCompletedError extends AppError {
  constructor(userMissionId: number) {
    super({
      errorCode: "M006",
      statusCode: 409,
      message: "이미 완료된 미션입니다.",
      data: { userMissionId },
    });
  }
}