import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinUser, getReview, getMission. missionComplete } from "../services/user.service.js";

// 회원가입 요청 처리 
export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    // joinUser 함수 비동기로 호출 & 작업 결과 기다림(await)
    res.send(response(status.SUCCESS, await joinUser(req.body)));
}


// 리뷰 추가 요청 처리
export const viewReview = async(req,res,next)=>{
  console.log("User의 목록에 새 리뷰가 추가됩니다.");
  res.send(response(status.SUCCESS,await getReview(req.params.userId, req.query)));
}

// 진행중인 미션 조회 요청 처리 
export const viewMission = async(req,res,next)=>{
  console.log("진행중인 미션을 조회합니다.");
  res.send(response(status.SUCCESS, await getMission(req.params.userId, req.query)));
}
 

// 미션 완료로 바꾸기 
export const completeMission = async(req,res,next)=>{
  console.log("미션이 완료되었습니다.");
  res.send(response(status.SUCCESS, await missionComplete(req.params.userId, req.parmas.missionId, req.query)))
}
