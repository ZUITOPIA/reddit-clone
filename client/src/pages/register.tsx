import Link from "next/link";
import React from "react";
import InputGroup from "../components/InputGroup";

const register = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Email"
              value={email}
              setValue={email}
              error={errors.email}
            />
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={username}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={password}
              error={errors.password}
            />
            <button
              className={
                "w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded"
              }
            >
              Sign Up
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">로그인</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default register;
