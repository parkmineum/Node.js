// models/user.dao.js

import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {insertUserSql, getUserID, connectFoodCategory, confirmEmail,getPreferToUserID, insertUserMissionSql,  getAddMissionID, confirmUserMission  } from "./store.sql.js"
// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();    // DB 연결 획득 
        const [confirm] = await pool.query(confirmEmail, data.email);  // 입력 받은 이메일이 DB에 존재하는지,

        if(confirm[0].isExistEmail){
            conn.release();   // 중복일 경우, DB 연결 반환 & 함수 종료
            return -1;
        }
        
        // 'intsertUserSql'에 새 user 정보 추가
        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
    }catch (err) {
        // 함수 실행 중 오류가 발생하면 BaseError를 throw하여 상위 레벨에서 처리할 수 있도록
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 사용자 미션 추가 
export const addUserMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        // 동일한 미션이 있는지 확인 
        const [confirm] = await pool.query(confirmUserMission, [data.user_id, data.mission_id, data.content, data.progress]);
        
        // 있다면 연결 종료 
        if(confirm[0].isExistMission){
            conn.release();
            return -1;
        }

				// 없다면 데이터 추가 
        const result = await pool.query(insertUserMissionSql, [data.user_id, data.mission_id, data.content, data.progress]);
        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자가 도전중인 미션 목록 조회
export const getUserDoingMissions = async (user_id) => {
    try {
        const conn = await pool.getConnection();
        const [mission] = await pool.query(getAddMissionID, user_id);

        conn.release();
        return [mission];
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}