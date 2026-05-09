import { Request, Response } from "express";
import { createStore, listStoreReviews } from "../services/store.service.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

export const handleCreateStore = async (
  req: Request<{}, {}, CreateStoreRequest>,
  res: Response
): Promise<Response> => {
  try {
    const result = await createStore(req.body);

    return res.status(201).json({
      isSuccess: true,
      message: "가게 생성 성공",
      result,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

export const handleListsStoreReviews = async (
  req: Request<{ storeId: string }>,
  res: Response
) => {
  const storeId = parseInt(req.params.storeId);
  const cursor = parseInt(req.query.cursor as string) || 0;

  if (isNaN(storeId)) {
    return res.status(400).json({ isSuccess: false, message: "유효하지 않은 storeId예요." });
  }

  try {
    const result = await listStoreReviews(storeId, cursor);
    return res.status(200).json({ isSuccess: true, message: "리뷰 조회 성공", result });
  } catch (err: any) {
    return res.status(400).json({ isSuccess: false, message: err.message });
  }
};