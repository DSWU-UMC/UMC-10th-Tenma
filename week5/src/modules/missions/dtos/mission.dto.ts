export interface CreateMissionRequest {
  storeId: number;
  deadline: Date;
  condition: string;
  point: number;
}

export interface ChallengeMissionRequest {
  userId: number;
  missionId: number;
}