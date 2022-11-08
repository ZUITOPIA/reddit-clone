import "../styles/globals.css";
import type { AppProps } from "next/app";
import Axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  return <Component {...pageProps} />;
}

export default MyApp;

// Next.js 에서 환경변수 지정할 때에는 NEXT_PUBLIC_어쩌고 라고 설정함
