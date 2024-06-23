// const express = require('express')   // common JS
import express from 'express';          // ES6
import { tempRouter } from './src/routes/temp.route.js';
import { userRouter } from './src/routes/user.route.js';
import {storeRouter} from './src/routes/store.route.js'

import { response } from './config/response.js';
import { status } from './config/response.status.js';
import { BaseError } from './config/error.js';

import cors from 'cors';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv'; 


dotenv.config();   // 환경변수
const app = express();
 

// server setting - veiw, static, body-parser etc.. 
app.set('port', process.env.PORT || 3000);   // 서버 포트 지정 (.PORT가 없다면 3000 이용)
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // public 디렉토리의 정적 파일들 <- 웹 브라우저에서 접근 가능하도록
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({extended: false}));

// router setting
app.use('/temp', tempRouter);
app.use('/user', userRouter);
app.use('/:storeId', storeRouter);


// swagger setting 
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));



// 혹여나 잡지 못한 오류에 대비. 다음 에러 헨들러에게 에러를 넘긴다. 
// ex) '/' 이 경로를 라우팅하지 않았는데 이걸 입력했을 때 추가적으로 작성한 내용들이 빛을 발함.
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);  // 오류 객체 생성 // 404
    next(err);       
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      error: err.cause || {}
    });
  });

// error handling
app.use((err, req, res, next) => {

    // res.locals 객체 : 요청에 대한 응답 변수를 저장 역할
    res.locals.message = err.message;   

    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
    
    // Node.js의 실행 환경이면 에러를 출력하고 아니면 아무것도 출력 x
    // Error status(상태 코드 반환), data 클라이언트에게 전송
});


// 서버 가동 및 지정된 포트에서의 네트워크 연결 대기 역할
// Http 서버 생성 & 요청 수신 대기 
app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});



// req(클라이언트 요청), res(서버 응답)을 매개변수로 받으면 전부 미들웨어 함수
// const myLogger = (req, res, next) => {
//     console.log("LOGGED");
//     next();               // 다음 미들웨어 함수 호출 
// }
// app.use(myLogger);

// app.get('/', (req, res) => {
//     console.log("/"); 
//     res.send('Hello World!')     // 화면 호출 
// })
