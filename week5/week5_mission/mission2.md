### Controller → Service → Repository → DB로 이어지는 요청 흐름

1. 사용자가 POST `/api/v1/users/signup` 요청을 보냄 (회원가입 정보 + preferences 포함)
2. **Controller**에서 요청을 받아 `req.body`를 DTO 형태로 변환 (`bodyToUser`)
3. Controller가 **Service**의 `userSignUp()`을 호출하여 비즈니스 로직 처리 위임
4. **Service**에서 Repository의 `addUser()`를 호출해 users 테이블에 사용자 정보 저장
5. Service에서 preferences를 순회하며 `setPreference()`를 호출해 `user_foods` 테이블에 선호 음식 매핑 저장
6. 모든 저장이 끝나면 Service가 결과를 반환하고, Controller가 응답을 클라이언트에 전달
