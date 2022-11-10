// 유저 정보와 같이, 한 페이지 내 같은 정보가 여러 번 사용되어 계속 넘겨주기에는 비효율적인 경우
// state를 관리하는 라이브러리(e.g. redux) > React 제공 context

// context 에 있는 value를 다른 컴포넌트에서 사용하기 위해서는 사용할 컴포넌트들이 존재하는 파일을 Context provider 로 감싸줘야함

import { createContext } from "react";
import { User } from "../src/types";

interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
