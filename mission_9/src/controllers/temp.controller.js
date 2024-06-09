// temp.controller.js
// 응답을 위한 코드 

import { status } from '../../config/response.status.js';
import { CheckFlag, getTempData } from '../providers/temp.provider.js';
import { response } from '../../config/response.js';



// temp/test/ 로 들어오는 http 요청 처리 
export const tempTest = (req, res, next) => {
    console.log("/temp/test");
    res.send(response(status.SUCCESS, getTempData()));
};

// temp/exception/ 로 들어오는 http 요청 처리 
export const tempException = (req, res, next) => {
    console.log("/temp/exception/" + req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}