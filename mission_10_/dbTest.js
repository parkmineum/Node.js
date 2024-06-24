// dbTest.js
import dotenv from 'dotenv'; // ES6 모듈 시스템 사용
dotenv.config(); // .env 파일에서 환경 변수 로드
import mysql from 'mysql2'; // ES6 모듈 시스템 사용

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE
});

connection.connect((error) => {
  if (error) {
    console.error('데이터베이스 연결 실패:', error);
    return;
  }
  console.log('데이터베이스에 성공적으로 연결되었습니다.');
  connection.end(); // 연결 종료
});
