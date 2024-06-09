// routes/store.route.js

import express from "express";
import asyncHandler from 'express-async-handler';
import { newStore, newReview, newMission } from "../controllers/user.controller.js";

// 기능 추가되어도 동일 라우터 사용 
export const storerRouter = express.Router();    // 경로 요청 처리


// 비동기인 newStore 함수에서 발생하는 모든 에러 자동 처리(다음 미들웨어로)
// 가게 추가     /store/signin 로 들어오는 POST 요청 처리
storeRouter.post('/signin', asyncHandler(newStore));  

// 리뷰 추가    /store/review 로 들어오는 POST 요청 처리 
storeRouter.post('/review', asyncHandler(newReview)); 

// 미션 추가    /store/mission 로 들어오는 POST 요청 처리 
storeRouter.post('/mission',asyncHandler(newMission));