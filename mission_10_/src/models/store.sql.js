// models/store.sql.js


// 가게 추가 
export const insertStoreSql = "INSERT INTO store (store_name, store_content, store_address, store_spec_address, store_phone) VALUES (?, ?, ?, ?, ?);";
 
export const getStoreID = "SELECT * FROM store WHERE id = ?";

export const confirmPhone = "SELECT EXISTS(SELECT 1 FROM store WHERE store_phone = ?) as isExistPhone";

// 특정 지역의 가게만 출력하도록 함 
export const getMapStoreID = "SELECT * FROM store WHERE store_address = (SELECT store_address FROM store WHERE id = ?)";


// 리뷰 추가
export const insertReviewSql = "INSERT INTO review (user_id, store_id, review_content, grade, review_date, deadline) VALUES (?, ?, ?, ?, ?,?)";

export const getReviewID = "SELECT * FROM review WHERE id = ?";
//  "SELECT user_id, store_id FROM review WHERE id = ?" 


// 미션 추가 
export const insertMissionSql = "INSERT INTO mission (store_id, content, progress , created_at, deadline_at) VALUES (?, ?, ?, ?, ?)";

export const getMissionID = "SELECT * FROM mission WHERE id = ?";

// store_id = ? AND content = ? : 해당 테이블에서 store_id와 content를 가진 레코드가 존재하는지 확인
export const confirmMission = "SELECT EXISTS(SELECT 1 FROM mission WHERE store_id = ? AND content = ?) as isExistMission";

