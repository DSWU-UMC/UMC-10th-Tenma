import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

interface StoreRow extends RowDataPacket {
  id: number;
  category_id: number;
  region_id: number;
  name: string;
  address: string;
  avg_star: number;
  master_num: number;
}

export const addStore = async (data: CreateStoreRequest): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query<ResultSetHeader>(
      `
      INSERT INTO stores (category_id, region_id, name, address, master_num)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        data.categoryId,
        data.regionId,
        data.name,
        data.address,
        data.masterNum,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`가게 생성 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (
  storeId: number
): Promise<StoreRow | null> => {
  const conn = await pool.getConnection();

  try {
    const [stores] = await conn.query<StoreRow[]>(
      `
      SELECT * FROM stores WHERE id = ?
      `,
      [storeId]
    );

    return stores[0] ?? null;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};