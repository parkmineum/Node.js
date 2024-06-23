// models/user.sql.js



export const insertUserSql = "INSERT INTO user (email, user_name, gender, birth, user_address, user_spec_address, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM user WHERE user_id = ?";

export const connectFoodCategory = "INSERT INTO user_favor_category (f_category_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";

// export const getPreferredFoodCategories = 
// "SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name " +
// "FROM user_favor_category ufc " +
// "JOIN food_category_list fcl ON ufc.f_category_id = fcl.f_category_id " +
// "WHERE ufc.user_id = ? " +
// "ORDER BY ufc.f_category_id ASC;";

// user가 선호하는 음식 카테고리 정보 조회
export const getPreferToUserID =
"SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
+ "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";


// 미션 추가 
// models/user.sql.js


export const insertUserMissionSql = "INSERT INTO mission_table (user_id, mission_id, progress) VALUES (?, ?, ?)";

export const getAddMissionID = "SELECT m.*"+
"FROM mission_table mt"+
"JOIN mission m ON mt.mission_id = m.id"+
"WHERE mt.user_id = ?"
;

// mission_table에 mission 존재하는지 
export const confirmUserMission = "SELECT EXISTS(SELECT 1 FROM mission_table WHERE user_id = ? AND mission_id = ?) as isExistMission";



// user 리뷰 목록 조회 

export const getReviewByReviewId = 
"SELECT u.name, u.id, r.id, r.grade, r.review_content, r.review_date "
+ "FROM review r JOIN user u on r.user_id = u.id  "
+ "WHERE r.user_id = ? AND r.id < ? "
+ "ORDER BY r.id DESC LIMIT ? ;"

export const getReviewByReviewIdAtFirst = 
"SELECT u.name, u.id, r.id, r.grade, r.review_content, r.review_date "
+ "FROM review r JOIN user u on r.user_id = u.id  "
+ "WHERE r.user_id = ? "
+ "ORDER BY r.id DESC LIMIT ? ;"


// 진행중인 미션 목록 조회

export const getMissionByMissionId = 
"SELECT u.name, u.id, m.id, m.content, m.date, m.mission_point "
+ "FROM mission_table mt "
+ "JOIN mission m ON mt.mission_id = m.id "
+ "JOIN user u ON mt.user_id = u.id "
+ "WHERE mt.user_id = ? AND m.id < ? AND mt.complete = 0 "
+ "ORDER BY m.id DESC LIMIT ? ;"

export const getMissionByMissionIdAtFirst = 
"SELECT u.name, u.id, m.id, m.content, m.date, m.mission_point "
+ "FROM mission_table mt "
+ "JOIN mission m ON mt.mission_id = m.id "
+ "JOIN user u ON mt.user_id = u.id "
+ "WHERE mt.user_id = ? AND mt.complete = 0 "
+ "ORDER BY m.id DESC LIMIT ? ;"