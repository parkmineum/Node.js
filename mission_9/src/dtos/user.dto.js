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