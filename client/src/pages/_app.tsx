// import "../styles/globals.css";
import styled from "styled-components";
import type { AppProps } from "next/app";
import Axios from "axios";
import { AuthProvider } from "../../context/auth";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

// Next.js 에서 환경변수 지정할 때에는 NEXT_PUBLIC_어쩌고 라고 설정함
