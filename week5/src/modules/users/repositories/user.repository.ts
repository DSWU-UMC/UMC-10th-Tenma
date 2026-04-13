import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// users 테이블 조회 타입
interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  gender: string;
  birth_date: Date;
  email: string;
  phone_num: string;
  address: string;
  point: number;
  count_pass: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

// user_foods + foods 조인 조회 타입
interface UserFoodPreferenceRow extends RowDataPacket {
  id: number;
  user_id: number;
  food_id: number;
  name: string;
}

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS isExistEmail;`,
      [data.email]
    );

    if (confirm[0]?.isExistEmail) {
      return null;
    }

    const [result] = await conn.query<ResultSetHeader>(
      `
      INSERT INTO users
        (email, name, gender, birth_date, address, phone_num)
      VALUES
        (?, ?, ?, ?, ?, ?);
      `,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address ?? "",
        data.phoneNumber,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number): Promise<UserRow | null> => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query<UserRow[]>(
      `SELECT * FROM users WHERE id = ?;`,
      [userId]
    );

    const foundUser = user[0];

    if (!foundUser) {
      return null;
    }

    return foundUser;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 3. 음식 선호 매핑
export const setPreference = async (
  userId: number,
  foodId: number
): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `
      INSERT INTO user_foods (user_id, food_id)
      VALUES (?, ?);
      `,
      [userId, foodId]
    );
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 4. 사용자 선호 음식 반환
export const getUserPreferencesByUserId = async (
  userId: number
): Promise<UserFoodPreferenceRow[]> => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query<UserFoodPreferenceRow[]>(
      `
      SELECT
        uf.id,
        uf.user_id,
        uf.food_id,
        f.name
      FROM user_foods uf
      JOIN foods f ON uf.food_id = f.id
      WHERE uf.user_id = ?
      ORDER BY uf.food_id ASC;
      `,
      [userId]
    );

    return preferences;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};