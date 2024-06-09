// dtos/store.dto.js  

// store 매개변수 받아서 정보 추출 후 새로운 객체 반환 
// 매개변수 : DAO 함수(Service 비동기 함수)
// 가게 추가( 점포명, 가게 정보, 가게 번호) 반환 -> 컨트롤러 
export const storeResponseDTO = (store) => {
    return {"name": store[0].store_name, "content": store_content, "phone": store[0].phone};
}

// 리뷰 추가 (작성자 ID, 리뷰 내용, 별점) 반환
export const storeReviewDTO = (review) => {
    return {"user_id" : review[0].user_id, "content": review[0].content, "grade": review[0].grade};
}

// 미션 추가 (미션명, 미션 내용, 진행 상태) 반환 
export const storeMissionDTO = (mission) => {
	return {"store": mission[0].name, "content": mission[0].content, "progress": mission[0].progress };
}