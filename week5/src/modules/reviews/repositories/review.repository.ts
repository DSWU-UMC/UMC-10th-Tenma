import { ResultSetHeader } from "mysql2";
import { pool } from "../../../db.config.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const addReview = async (data: CreateReviewRequest): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `
      INSERT INTO reviews (user_id, store_id, star, content)
      VALUES (?, ?, ?, ?)
      `,
      [data.userId, data.storeId, data.star, data.content]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 생성 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};