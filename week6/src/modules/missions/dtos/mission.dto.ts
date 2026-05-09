export interface CreateMissionRequest {
  storeId: number;
  deadline: Date;
  condition: string;
  point: number;
}

export interface ChallengeMissionRequest {
  missionId: number;
}

export interface CompleteMissionRequest {
  missionId: number;
}