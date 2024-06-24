// store.controller.js 

import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinStore, joinReview, joinMission } from "../services/store.service.js";
import {getReview} from "../providers/store.provider.js"


// 비동기 함수 addSignin의 회원가입 요청 처리 
export const newStore = async (req, res, next) => {
    console.log("요청하신 지역에 점포가 추가되었습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    // addStore 함수 비동기로 호출 & 작업 결과 기다림(await)
    // 클라이언트에게 응답 다시 반환 (성공 상태 코드, 작업 결과물) 
    // 비동기 함수(joinStore)작업 -> DTO 감싸기 -> 컨트롤러 반환  
    res.send(response(status.SUCCESS, await joinStore(req.body)));
} 

// 리뷰 추가 요청 처리 
export const newReview = async (req,res,next) => {
    console.log("요청하신 리뷰가 추가되었습니다.");
    res.send(response(status.SUCCESS, await joinReivew(req.body)));
}

// 미션 추가 요청 처리 
export const newMission = async (req,res, next)=>{
    console.log("가게에 미션 추가");
    res.send(response(status.SUCCESS, await joinMission(req.body)));
}

// 미션 조회 요청 처리 
export const reviewPreview = async (req, res, next) => {
    // 응답 객체 & 리뷰 데이터 가져옴 
    return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
}