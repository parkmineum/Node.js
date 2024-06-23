// store.service.js
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

import { storeResponseDTO, storeReviewDTO, storeMissionDTO } from "../dtos/store.dto.js"
import {addStore, getStore, mapStore, addReview, getReivew, addMission, getMission} from "../models/store.dao.js";



// 가게 추가
// 여기서 body 는 클라이언트로부터 받은 HTTP 요청 본문에 해당 
export const joinStore = async (body) => {

    // 가게 정보 DB에 추가 
    const joinStoreData = await addStore({
        'name': body.name,
        'content' : body.content,
        'phone': body.phone,
        'addr' : body.addr, 
        'specAddr': body.specAddr,
    });

    if(joinStoreData == -1){
        throw new BaseError(status.STORE_ALREADY_EXIST);
    }else{
        // 가입된 사용자의 정보, 등록한 가게 정보 반환 
        return storeResponseDTO(await mapStore(joinStoreData));
        // 여기서 어떤 기능을 구현할지 결정됨
        // mapStore 대신 getStore 사용하였다면, 가게를 추가하는 기능의 코
    }
}

// 리뷰 추가
export const joinReivew = async (body) => {
    const nowdate = new Date();
    
    const joinReviewData = await addReview({
        'user_id': body.user_id,
        'store_id': body.store_id,
        'content': body.content,
        'grade':body.grade,
        'review_date': body.nowdate, 
        'deadline' : body.deadline
    });
    //리뷰는 같은 사람이 같은 가게에 여러번 쓸 수 있으므로 
    return storeReviewDTO(await getReivew(joinReviewData)); 
}

// 미션 추가 
export const joinMission = async(body)=>{

    const nowdate = new Date();
    const deaddate = new Date(nowdate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 현재 날짜로부터 7일 후
    
    // 날짜 포맷을 명시적으로 지정 (예: 'YYYY-MM-DD')
    function formatDate(date) {
      let month = '' + (date.getMonth() + 1),
          day = '' + date.getDate(),
          year = date.getFullYear();
    
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
    
      return [year, month, day].join('-');
    }
    
    const joinMissionData = await addMission({
        'store_id': body.store_id,
        'content': body.content,
        'progress' : body.progress, 
        'created_at': formatDate(nowdate), // 현재 날짜를 'YYYY-MM-DD' 포맷으로 변환하여 전달
        'deadline_at': formatDate(deaddate), // 데드라인을 'YYYY-MM-DD' 포맷으로 변환하여 전달
    });

// 동일 미션 존재 시 -> throw error
    if(joinMissionData == -1){ 
        throw new BaseError(status.MISSION_ALREADY_EXIST); 
    }else{
    return storeMissionDTO(await getMission(joinMissionData)); 
    }
}