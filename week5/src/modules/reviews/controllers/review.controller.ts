import { Request, Response } from "express";
import { createReview } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const handleCreateReview = async (
  req: Request<{}, {}, CreateReviewRequest>,
  res: Response
): Promise<Response> => {
  try {
    const result = await createReview(req.body);

    return res.status(201).json({
      isSuccess: true,
      message: "리뷰 생성 성공",
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