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

export interface OngoingMissionItem {
  userMissionId: number;
  point: number;
  storeName: string;
  condition: string;
}

export interface OngoingMissionListResponse {
  data: OngoingMissionItem[];
}

export interface StoreMissionItem {
  missionId: number;
  storeName: string;
  storeCategory: string;
  condition: string;
  point: number;
  deadline: Date;
}

export interface StoreMissionListResponse {
  data: StoreMissionItem[];
}