// config/error.js
// Error 클래스 상속. 
export class BaseError extends Error {
    // 생성자에 data 객체 받기 
    constructor(data){    
        super(data.message);   // Error 클래스 생성자 호출
        this.data = data;
    }
}