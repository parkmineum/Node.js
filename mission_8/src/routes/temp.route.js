// temp.route.js
// 라우터(통신) 기능

import express from 'express';
import { tempTest, tempException } from '../controllers/temp.controller.js';

// const app = express()
// app.use('/test', tempRouter);


// 라우터 객체 생성(by express.Router 메서드) 
// tempRouter.get('/temp', (req, res) => { ... });와 같이 GET 요청에 대한 핸들러를 등록할 수 있다.t
export const tempRouter = express.Router();

// 각 해당 경로로 GET 요청을 보내면, 함수 호출 
tempRouter.get('/test', tempTest);
tempRouter.get('/exception/:flag',tempException);