import React, { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "/auth/login",
        { password, username },
        { withCredentials: true }
      );

      // 로그인 시에 아이디와 비밀번호가 서버로 넘어가면 유저의 정보가 맞는지 확인한 후 cookie에 token을 발급함.
      // 그 후 다른 페이지에서의 인증도 이 token을 통해 인증이 이뤄지게 됨
      // 하지만 백엔드와 프론트엔드의 주소가 다른 경우, 로그인에 성공해도 인증이 이뤄지지 않음 (별다른 에러도 안 나오고)
      // 이유 ? "도메인 주소가 다르면 쿠키가 전송되지 않기 때문에"
      // 이 문제를 해결하기 위해 프론트에서는 axios 요청 보낼때 withCredentials: true 설정해주고
      // 백엔드에서는 cors 부분에 credentials: true 로 설정하여 Response Header에 Access-Control-Allow-Credentials를 설정해줌
      // -> 도메인 주소가 달라도 쿠키 저장되도록 하는 것
    } catch (error: any) {
      console.log(error);
      setErrors(error?.response?.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button
              className={
                "w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded"
              }
            >
              로그인
            </button>
          </form>
          <small>
            이미 아이디가 없으신가요?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">회원가입</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
