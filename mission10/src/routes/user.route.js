// routes/user.route.js

import express from "express";
import asyncHandler from 'express-async-handler';

import { userSignin, userMissions } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler(userSignin));

userRouter.post('/mission', asyncHandler(userMissions));

// 밑에서부턴 개별적으로 추가한 코드 
// 1. req와 res 객체 전달하기
// app.get('/users', async (req, res) => {
//     try {
//       const users = await findAllUsers(req, res);
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });
  
// // 2. 중복 응답 방지하기
// async function findAllUsers(req, res) {
//     try {
//         const users = await User.findAll();
//         return users;
//     }   catch (error) {
//         res.status(500).json({ error: error.message });
//         return; // 응답을 보냈으므로 더 이상 진행하지 않음
//     }
// }
  