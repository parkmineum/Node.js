// dtos/user.dto.js

// sign in response DTO
// 전달할 데이터! 
export const signinResponseDTO = (user, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].f_category_name);
    }
    return {"email": user[0].email, "name": user[0].user_name, "preferCategory": preferFood};
}


export const userMissionDTO = (mission) => {
	return {"user_id" : mission[0].id, "mission": mission[0].name, "content": mission[0].content, "progress": mission[0].progress };
}


// dtos/user.dto.js

export const previewReviewResponseDTO = (data) => {

    const reviews = [];
    for (let i = 0; i < data.length; i++) {
        reviews.push({
            "user_name": data[i].user_name,
            "rate": data[i].rate,
            "review_content": data[i].review_content,
            "create_date": formatDate(data[i].created_at)
        })
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].id};
}

const formatDate = (date) => {
    // 날짜 형식 유효성 검사
    if (typeof date !== 'string' || date.trim() === '') {
        throw new Error('Invalid date format');
    }

    // Date 객체로 변환 & 유효한 날짜인지 확인
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
    }

    return new Intl.DateTimeFormat('kr').format(dateObj).replaceAll(" ", "").slice(0, -1);
}