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


// 아래는 10주차 코드 
import {getPreviewReview} from "../models/store.dao"
export const getReview = async (storeId, query) => {
    // DTO 내부에서 함수를 호출하여 리뷰 데이터 가져와 DTO에 전달 -> 응답 DTO 생성 & 반환 
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}

export const previewReviewResponseDTO = (data) => {

    const reviews = [];
    for (let i = 0; i < data.length; i++) {
        // 추출한 정보 배열에 추가 
        reviews.push({
            "user_name": data[i].user_name,
            "rate": data[i].rate,
            "review_body": data[i].review_content,
            "create_date": formatDate(data[i].created_at)
        })
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].review_id};
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}



// 특정 가게 미션 조회
export const previewMissionResponseDTO = (data) => {
    const missions = [];
    for (let i = 0; i < data.length; i++) {
        missions.push({
            "store_name": data[i].store_name,
            "storeId": data[i].id,
            "content": data[i].content,
            "date":data[i].date,
            "point": data[i].mission_point,
        })
    }
    return {"missionData": missions, "cursorId": data[data.length-1].id};
}
