import Link from "next/link";
import { Fragment } from "react";
import { useAuthState } from "../../context/auth";

const NavBar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  return (
    <div>
      <span>
        <Link href="/">Community</Link>
      </span>
      <input type="text" placeholder="Search" />

      {!loading &&
        (authenticated ? (
          <button>Logout</button>
        ) : (
          <>
            <Link href="/login">
              <a>log in</a>
            </Link>
            <Link href="/register">
              <a>sign up</a>
            </Link>
          </>
        ))}
    </div>
  );
};

export default NavBar;
