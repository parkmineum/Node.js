import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO, userMissionsDTO } from "../dtos/user.dto.js"
import { addUser, getUser, getUserPreferToUserID, setPrefer, addUserMissions, getUserMissions } from "../models/user.dao.js";
import { addUserMission, getUserDoingMissions } from "../models/user.dao.js";
// 사용자 추가
export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;   // 선호도 정보 setPrefer를 통해 DB에 저장 
    
    const joinUserData = await addUser({
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': body.birth,
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    });

    if(joinUserData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        // 가입된 사용자의 정보, 선호도 반환
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }   
}



export const joinUserMissions = async (body) => {
    const UserMissionsData = await addUserMissions({
        'user_id': body.user_id,
        'mission_id': body.mission_id,
        "content" : body.content, 
        "progress" : body.progress 
    });


    if (UserMissionsData == -1) {  
        throw new BaseError(status.MISSION_ALREADY_EXIST);
    } else {
        const userMissions = await getUserMissions(body.user_id);
        return userMissionsDTO(userMissions);
    }
};
