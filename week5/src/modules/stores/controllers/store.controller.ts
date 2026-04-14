import { Request, Response } from "express";
import { createStore } from "../services/store.service.js";
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