export interface CreateMissionRequest {

  /**
   * 미션이 등록될 가게 ID
   * @example 1
   */
  storeId: number;

  /**
   * 미션 마감일
   * @example "2026-12-31T23:59:59.000Z"
   */
  deadline: Date;

  /**
   * 미션 수행 조건
   * @example "5000원 이상 주문하기"
   */
  condition: string;

  /**
   * 미션 성공 시 지급 포인트
   * @example 500
   */
  point: number;
}

export interface ChallengeMissionRequest {

  /**
   * 도전할 미션 ID
   * @example 2
   */
  missionId: number;
}

export interface CompleteMissionRequest {

  /**
   * 완료 처리할 미션 ID
   * @example 2
   */
  missionId: number;
}

export interface OngoingMissionItem {

  /**
   * 사용자 미션 ID
   * @example 1
   */
  userMissionId: number;

  /**
   * 획득 가능 포인트
   * @example 500
   */
  point: number;

  /**
   * 가게 이름
   * @example "버거킹 성수점"
   */
  storeName: string;

  /**
   * 미션 조건
   * @example "세트 메뉴 주문하기"
   */
  condition: string;
}

export interface OngoingMissionListResponse {

  /**
   * 진행 중인 미션 목록
   */
  data: OngoingMissionItem[];
}

export interface StoreMissionItem {

  /**
   * 미션 ID
   * @example 1
   */
  missionId: number;

  /**
   * 가게 이름
   * @example "교촌치킨 성수점"
   */
  storeName: string;

  /**
   * 가게 카테고리
   * @example "패스트푸드"
   */
  storeCategory: string;

  /**
   * 미션 조건
   * @example "2만원 이상 주문하기"
   */
  condition: string;

  /**
   * 보상 포인트
   * @example 1000
   */
  point: number;

  /**
   * 미션 마감일
   * @example "2026-06-30T23:59:59.000Z"
   */
  deadline: Date;
}

export interface StoreMissionListResponse {

  /**
   * 가게 미션 목록
   */
  data: StoreMissionItem[];
}