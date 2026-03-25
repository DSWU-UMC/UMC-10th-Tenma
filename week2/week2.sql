-- 1. 내가 진행중, 진행 완료한 미션 모아서 보는 쿼리 (페이징 포함)
-- offset
SELECT
  um.id           AS user_mission_id,
  um.is_complete  AS is_complete,
  m.id            AS mission_id,
  m.store_id      AS store_id,
  m.condition     AS condition,
  m.point         AS point
FROM user_mission um
JOIN mission m ON m.id = um.mission_id
WHERE um.user_id = :userId AND um.is_complete = :isComplete
LIMIT :limit OFFSET :offset;
-- cursor
SELECT
SELECT
  um.id           AS user_mission_id,
  um.is_complete  AS is_complete,
  m.id            AS mission_id,
  m.store_id      AS store_id,
  m.`condition`   AS `condition`,
  m.point         AS point
FROM user_mission um
JOIN mission m ON m.id = um.mission_id
WHERE um.user_id = :userId
  AND um.is_complete = :isComplete
  -- 커서(이전 페이지 마지막 um.id)
  AND ( :cursorId IS NULL OR um.id < :cursorId )
ORDER BY um.id DESC
LIMIT :limit;

-- 2. 리뷰 작성하는 쿼리 (이미지 제외)
INSERT INTO
    review (
        user_id,
        store_id,
        star,
        content
    )
VALUES (
        1,
        10,
        5,
        '음식이 맛있고 가게도 매우 깨끗했습니다.'
    );

-- 3. 홈 화면 쿼리 (현재 선택된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
-- 현재 지역 이름
SELECT r.name AS region_name FROM region r WHERE r.id = :regionId;

-- 내가 달성한 미션 개수
SELECT COUNT(*) AS completed_count
FROM user_mission
WHERE user_id = :userId AND is_complete = 1;

-- 현재 선택된 지역의 도전 가능한 미션 목록 (offset 페이징)
SELECT
  s.name  AS store_name,
  m.deadline,
  c.name  AS category_name,
  m.`condition` AS `condition`,
  m.point
FROM mission m
JOIN store s ON s.id = m.store_id
LEFT JOIN category c ON c.id = s.category_id
WHERE s.region_id = :regionId
  AND (m.deadline IS NULL OR m.deadline >= NOW())
  AND NOT EXISTS (
        SELECT 1
        FROM user_mission um
        WHERE um.user_id = :userId
          AND um.mission_id = m.id
          AND um.is_complete = 1
      )
ORDER BY m.deadline ASC, m.id ASC
LIMIT :limit OFFSET :offset;

-- 현재 선택된 지역의 도전 가능한 미션 목록 (cursor 페이징)
SELECT s.name AS store_name, m.deadline, c.name AS category_name,
       m.`condition` AS `condition`, m.point, m.id AS mission_id
FROM mission m
JOIN store s ON s.id = m.store_id
LEFT JOIN category c ON c.id = s.category_id
WHERE s.region_id = :regionId
  AND NOT EXISTS (
    SELECT 1 FROM user_mission um
    WHERE um.user_id=:userId AND um.mission_id=m.id AND um.is_complete=1
  )
  AND ( :cursorId IS NULL OR m.id > :cursorId )
ORDER BY m.id ASC
LIMIT :limit;

-- 4. 마이 페이지 화면 쿼리
SELECT name, email, phone_num, point FROM user WHERE id = :userId;