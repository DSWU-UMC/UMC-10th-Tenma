import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { CreateMissionRequest } from "../dtos/mission.dto.js";

interface MissionRow extends RowDataPacket {
  id: number;
  store_id: number;
  deadline: Date;
  condition: string;
  point: number;
}

interface UserMissionRow extends RowDataPacket {
  id: number;
  user_id: number;
  mission_id: number;
  completed: boolean;
}

export const addMission = async (
  data: CreateMissionRequest
): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `
      INSERT INTO missions (store_id, deadline, \`condition\`, point)
      VALUES (?, ?, ?, ?)
      `,
      [data.storeId, data.deadline, data.condition, data.point]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`미션 생성 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (
  missionId: number
): Promise<MissionRow | null> => {
  const conn = await pool.getConnection();

  try {
    const [missions] = await conn.query<MissionRow[]>(
      `
      SELECT * FROM missions WHERE id = ?
      `,
      [missionId]
    );

    return missions[0] ?? null;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getUserMissionByUserIdAndMissionId = async (
  userId: number,
  missionId: number
): Promise<UserMissionRow | null> => {
  const conn = await pool.getConnection();

  try {
    const [userMissions] = await conn.query<UserMissionRow[]>(
      `
      SELECT * 
      FROM user_missions
      WHERE user_id = ? AND mission_id = ?
      `,
      [userId, missionId]
    );

    return userMissions[0] ?? null;
  } catch (err) {
    throw new Error(`도전 중 미션 조회 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addUserMission = async (
  userId: number,
  missionId: number
): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `
      INSERT INTO user_missions (user_id, mission_id, completed)
      VALUES (?, ?, false)
      `,
      [userId, missionId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`미션 도전 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};