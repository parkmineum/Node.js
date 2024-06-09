import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinUser } from "../services/user.service.js";

// 회원가입 요청 처리 
// export const userSignin = async (req, res, next) => {
//     console.log("회원가입을 요청하였습니다!");
//     console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

//     // joinUser 함수 비동기로 호출 & 작업 결과 기다림(await)
//     res.send(response(status.SUCCESS, await joinUser(req.body)));
// }

export async function userSignin(req, res) {
    try {
      await joinUser(req.body);
      res.status(200).json({ message: '사용자 등록 성공' });
    } catch (error) {
      res.status(500).json({ message: '서버 에러', error: error.message });
    }
}


 
