import { prisma } from "../../../db.config.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

export const addReview = async (data: CreateReviewRequest): Promise<number> => {
  try {
    const review = await prisma.review.create({
      data: {
        userId: data.userId,
        storeId: data.storeId,
        star: data.star,
        content: data.content,
      },
    });

    return review.id;
  } catch (err) {
    throw new Error(`리뷰 생성 중 오류가 발생했어요: ${err}`);
  }
};

export const getReviewsByUserId = async (
  userId: number,
  cursor?: number,
  take: number = 10
) => {
  return prisma.review.findMany({
    where: { userId },
    take,
    skip: cursor !== undefined ? 1 : 0,
    cursor: cursor !== undefined ? { id: cursor } : undefined,
    orderBy: { id: "desc" },
    select: {
      id: true,
      star: true,
      content: true,
      createdAt: true,
      user: { select: { name: true } }
    }
  });
};