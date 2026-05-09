import { Request, Response } from "express";
import { createReview, listMyReviews } from "../services/review.service.js";
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


export const handleListMyReviews = async (
  req: Request<{ userId: string }, {}, {}, { cursor?: string }>,
  res: Response
): Promise<Response> => {
  try {
    const userId = Number(req.params.userId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;

    const result = await listMyReviews(userId, cursor);

    return res.status(200).json({
      isSuccess: true,
      message: "내 리뷰 목록 조회 성공",
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