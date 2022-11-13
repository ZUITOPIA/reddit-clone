import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import InputGroup from "../../components/InputGroup";

const SubCreate = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post("/sub", { name, title, description });
      router.push(`/r/${res.data.name}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>커뮤니티 만들기</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <h1>Name</h1>
            <p>대문자를 포함한 커뮤니티 이름은 변경할 수 없습니다.</p>
            <InputGroup
              placeholder="이름"
              value={name}
              setValue={setName}
              error={errors.name}
            ></InputGroup>
          </form>
        </div>
      </div>

      <div>
        <hr />
        <form onSubmit={handleSubmit}>
          <h1>Title</h1>
          <p>주제를 나타냅니다. 언제든지 변경할 수 있습니다.</p>
          <InputGroup
            placeholder="이름"
            value={title}
            setValue={setTitle}
            error={errors.title}
          ></InputGroup>
        </form>
      </div>

      <div>
        <hr />
        <form onSubmit={handleSubmit}>
          <h1>Description</h1>
          <p>해당 커뮤니티에 대한 설명입니다.</p>
          <InputGroup
            placeholder="이름"
            value={description}
            setValue={setDescription}
            error={errors.description}
          ></InputGroup>
        </form>

        <div>
          <button>커뮤니티 생성</button>
        </div>
      </div>
    </>
  );
};

export default SubCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    // 쿠키가 없다면 에러를 보내기
    if (!cookie) throw new Error("Missing auth token cookie");

    // 쿠키가 있다면 그 쿠키를 이용해서 백엔드에서 인증 처리하기
    await axios.get("/auth/me", { headers: { cookie } });
    return { props: {} };
  } catch (error) {
    // 백엔드에서 요청 시 던져준 쿠키를 이용해 인증 처리할 때, 에러나면 /login 페이지로 이동시켜버리기
    res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
