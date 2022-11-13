import { Request, Response, Router } from "express";
import User from "../entities/User";
import jwt from "jsonwebtoken";

const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;

  // 먼저 Subs 를 생성할 수 있는 유저인지 체크를 위해 유저 정보 가져오기 (요청에서 보내주는 토큰을 이용)
  const token = req.cookies.token;
  if (!token) return next();

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

  const user = await User.findOneBy({ username });
  // 유저 정보가 없다면 throw error!
  if (!user) throw new Error("Unauthenticated");

  // 유저 정보가 있다면 sub 이름과 제목이 이미 있는 것인지 체크

  // Sub Instance 생성 후 데이터베이스에 저장

  // 저장한 정보 프론트엔드로 전달해주기
};

const router = Router();

router.post("/", createSub);

export default router;

// 많은 핸들러에서 유저 정보를 필요로 함 => User Middleware 생성하자
// 유저 정보나 유저의 등급에 따라서 인증을 따로 함 => Auth Middleware 생성하자
