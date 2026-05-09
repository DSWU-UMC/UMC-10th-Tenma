import process from "process";
import { prisma } from "../src/db.config.js";

async function main() {
  // 지역 데이터
  await prisma.region.createMany({
    data: [
      { name: "강남구" }, { name: "강동구" }, { name: "강북구" },
      { name: "강서구" }, { name: "관악구" }, { name: "광진구" },
      { name: "구로구" }, { name: "금천구" }, { name: "노원구" },
      { name: "도봉구" }, { name: "동대문구" }, { name: "동작구" },
      { name: "마포구" }, { name: "서대문구" }, { name: "서초구" },
      { name: "성동구" }, { name: "성북구" }, { name: "송파구" },
      { name: "양천구" }, { name: "영등포구" }, { name: "용산구" },
      { name: "은평구" }, { name: "종로구" }, { name: "중구" },
      { name: "중랑구" },
    ],
    skipDuplicates: true,
  });

  // 음식 데이터
  await prisma.food.createMany({
    data: [
      { name: "한식" }, { name: "중식" }, { name: "일식" },
      { name: "양식" }, { name: "분식" }, { name: "패스트푸드" },
    ],
    skipDuplicates: true,
  });

  // 카테고리 데이터
  await prisma.category.createMany({
    data: [
      { name: "한식당" }, { name: "중식당" }, { name: "일식당" },
      { name: "양식 레스토랑" }, { name: "분식집" }, { name: "패스트푸드점" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ seed 완료");
}

main()
  .catch((err) => {
    console.error("❌ seed 실패:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

// 실행 명령어
// node --loader ts-node/esm prisma/seed.ts