import { Request, Response, Router } from "express";

// register 핸들러
const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
};

const router = Router();
router.post("/register", register); // register 라는 핸들러를 이용할 것

export default router;
