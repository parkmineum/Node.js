// store.dao.js 

import { pool } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {insertStoreSql, confirmPhone, getStoreID, getMapStoreID, insertReviewSql, getReviewID, insertMissionSql, confirmMission, getMissionID} from "./store.sql.js"
import {getReviewByReviewIdAtFirst, getReviewByReviewId, getMissionByMissionId, getMissionByMissionIdAtFirst} from "./store.sql.js";

// Store 데이터 삽입
export const addStore = async (data) => {
    try{
		    // DB 연결 시도 
        const conn = await pool.getConnection();
        
        // 입력 받은 번호(data.phone)이 이미 존재하는지 확인인
        const [confirm] = await pool.query(confirmPhone, data.phone);
        if(confirm[0].isExistPhone){
            conn.release();      // 이미 존재한다면 DB 연결 끊기 
            return -1;
        }
				
				// 중복 없음이 확인되었으므로, 쿼리 실행 -> DB 삽입 
        const result = await pool.query(insertStoreSql, [ data.name, data.content, data.addr, data.specAddr, data.phone]);
        conn.release();
        return result[0].insertId;     // 등록한 가게 ID 반환 
        
     // 위 과정 중 어느 하나라도 예외 발생하면, BaseError throw
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 가게 정보 얻기
export const getStore = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const [store] = await pool.query(getStoreID, storeId);

        console.log(store);

        if(store.length == 0){
            return -1;
        }

        conn.release();
        return store;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//같은 지역에 있는 가게의 정보만 얻기 
export const mapStore = async(storeId) =>{
    try {
        const conn = await pool.getConnection();
        const [store] = await pool.query(getMapStoreID, storeId);

        console.log(store);

        if(store.length == 0){
            return -1;
        }

        conn.release();
        return store;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 리뷰 추가 
export const addReview = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        console.log(data);

        const result = await pool.query(insertReviewSql, [ data.user_id, data.store_id, data.content, data.grade, data.review_date]);
        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 리뷰 조회
export const getReivew = async(reviewId) => {
    try {
        const conn = await pool.getConnection();
        const [review] = await pool.query(getReviewID, reviewId);

        console.log(review);

        if(review.length == 0){
            return -1;
        }

        conn.release();
        return review;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 미션 추가
export const addMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        console.log(data);

        const [confirm] = await pool.query(confirmMission, [data.store_id, data.content]);
        if(confirm[0].isExistMission){  
            conn.release();
            return -1;
        }

        const result = await pool.query(insertMissionSql, [data.store_id, data.content, data.progress , data.created_at, data.deadline_at]);
        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 미션 조회 
export const getMission = async(missionId) => {
    try {
        const conn = await pool.getConnection();
        const [mission] = await pool.query(getMissionID, missionId);

        console.log(mission);

        if(mission.length == 0){
            return -1;
        }

        conn.release();
        return mission;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 10주차 
// 미션 조회 (DB에서 데이터 가져오기)
export const getPreviewReview = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();

        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return reviews;
    
        }
        // cursorId 정의된 경우 DB에서 데이터 가져오기 
        else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getPreviewMission = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getMissionByMissionIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return missions;
    
        }else{
            const [missions] = await pool.query(getMissionByMissionId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}