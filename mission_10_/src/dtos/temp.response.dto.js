// temp.response.dto.js

// row : 사용자 데이터 배열 객체 새로 생성 
export const userResponseDTO = (rows) => {
    const result = [];
    
    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        result.push({"username": element.name, "userage": element.age});
    }
    return result;
}


// 응답 데이터 생성
// data 객체 받아서 반환 => "DTO 역할"
export const tempResponseDTO = (data) => {
    return {"testString" : data};
}

export const flagResponseDTO = (flag) => {
    return {"flag" : flag};
}