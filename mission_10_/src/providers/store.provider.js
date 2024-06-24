// store.provider.js
// 단순히 Read 기능만을 실행하기에 Service가 아닌 Provider 

import {previewReviewResponseDTO} from "../dtos/store.dto";
import {getPreviewReview} from "../models/store.dao";


export const getReview = async (storeId, query) => {
    // 3은 default 값이다.
    const {reviewId, size = 3} = query;
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}