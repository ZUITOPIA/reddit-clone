import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import User from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

// register 핸들러
const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};
    // 이메일과 유저이름이 이미 저장 사용되고 있는 것인지 확인

    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });

    // 이미 있다면 errors 객체에 넣어줌
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
    if (usernameUser) errors.username = "이미 이 사용자 이름이 사용되었습니다.";

    // 에러가 있다면 return 으로 에러를 response 로 보내줌
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // 유저 정보와 함께 user 인스턴스를 생성
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    // 엔터티에 정해놓은 조건으로 user 데이터의 유효성 검사를 해줌
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapErrors(errors));

    // 유저 정보를 user table 에 저장해줌
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    // 에러를 response로 보내줌
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let errors: any = {};
    // 비워져있다면 에러를 프론트엔드로 보내주기
    // 일단은 타입보다 로직을 위주로 공부하기 위해 any로 해둠
    if (isEmpty(username))
      errors.username = "사용자 이름은 비워둘 수 없습니다.";
    if (isEmpty(password)) errors.password = "비밀번호는 비워둘 수 없습니다.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // DB에서 유저 찾기
    const user = await User.findOneBy({ username });

    // 유저가 없다면 에러 보내기
    if (!user)
      return res
        .status(404)
        .json({ username: "사용자 이름이 등록되지 않았습니다." });

    // 유저가 있다면 비밀번호 비교하기
    const passwordMatches = await bcrypt.compare(password, user.password);

    // 비밀번호가 다르다면 에러 보내기
    if (!passwordMatches) {
      return res.status(401).json({ password: "비밀번호가 잘못되었습니다." });
    }

    // 비밀번호가 맞다면 토큰 생성
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // 쿠키 저장
    // var setCookie = cookie.serialize('foo','bar');
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    );
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();
router.post("/register", register); // register 라는 핸들러를 이용할 것
router.post("/login", login);

export default router;

// 쿠키의 이름과 값은 항상 인코딩해야함.
// 쿠키 하나가 차지하는 용량은 최대 4KB까지이고, 사이트 하나당 약 20여개를 허용함(브라우저에 따라 다름)

// httpOnly
// > 이 옵션은 자바스크립트 같은 클라이언트 측 스크립트가 쿠키를 사용할 수 없게 함, document.cookie를 통해 쿠키를 볼 수도 없고 조작할 수도 없음

// secure
// > HTTPS 연결에서만 쿠키를 사용할 수 있게 함

// samesite
// > 요청이 외부 사이트에서 일어날 때, 브라우저가 쿠키를 보내지 못하도록 막아줌, XSRF 공격을 막는데 유용함

// expires/max-age
// > 쿠키의 만료 시간을 정해줌, 이 옵션이 없으면 브라우저가 닫힐 때 쿠키도 같이 삭제 됨
