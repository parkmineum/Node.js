// temp.service.js

import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { tempResponseDTO, flagResponseDTO } from "../dtos/temp.response.dto.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}

// 최종 목표 : flag = 1 이여도, 
// {"isSuccess" : false, "code" : "COMMON001", "message" : "잘못된 요청입니다."}
// 다음과 같이 띄우려면, new Error() 로는 부족. 
export function CheckFlag(flag){
    if(flag == 1)
        // throw new Error("Flag is 1!!");   // 에러 발생시키기(중요)!
        throw new BaseError(status.BAD_REQUEST);
    else{
        return flagResponseDTO(flag);
    }
}