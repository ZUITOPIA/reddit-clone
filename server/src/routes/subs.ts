import { Request, Response, Router } from "express";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;
};

const router = Router();

router.post("/", userMiddleware, authMiddleware, createSub);

export default router;

// 많은 핸들러에서 유저 정보를 필요로 함 => User Middleware 생성하자
// 유저 정보나 유저의 등급에 따라서 인증을 따로 함 => Auth Middleware 생성하자
