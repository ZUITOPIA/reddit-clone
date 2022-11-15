import "../styles/globals.css";
import type { AppProps } from "next/app";
import Axios from "axios";
import { AuthProvider } from "../../context/auth";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ["/login", "/register"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <>
      <AuthProvider>
        {!authRoute && <NavBar />}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;

// Next.js 에서 환경변수 지정할 때에는 NEXT_PUBLIC_어쩌고 라고 설정함
