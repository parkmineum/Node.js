// response.status.js

import { StatusCodes } from "http-status-codes";


// 400(클라이언트의 오류) : BAD_REQUEST, 401(사용자 인증 실패) : Unauthorized
// 403(권한 없음) : Forbidden ,  404(리소스 찾을 수 없음) :  Not Found
export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 2000, "message": "SUCCESS!"},

    // 개발하면서 생기는 오류들은 밑처럼 한 곳에 모아두어 정리
	// common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON000", "message": "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON001", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON002", "message": "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, "isSuccess": false, "code": "COMMON003", "message": "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "COMMON004", "message": "금지된 요청입니다." },
    PARAMETER_IS_WRONG : {status : StatusCodes.PARAMETER_IS_WRONG, "isSuccess" : false, "code": "COMMON005", "meesge":"잘못된 파라미터가 전달되었습니다."}, 

	// member err
    MEMBER_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "MEMBER4001", "message": "사용자가 없습니다."},
    NICKNAME_NOT_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "MEMBER4002", "message": "닉네임은 필수입니다."},
    EMAIL_ALREADY_EXIST : {status : StatusCodes.CONFLICT, "isSuccess" : false, "code" : "MEMBER4003", "message" : "이메일이 이미 존재합니다."},
    STORE_ALREADY_EXIST : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "MEMBER4004", "message": "해당 지역에 이미 점포가 존재합니다."},

    // article err
    ARTICLE_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "ARTICLE4001", "message": "게시글이 없습니다."}
};