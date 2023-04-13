import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavbarWrapper from "./styles";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { asPath } = useRouter();
  const {status} = useSession();

  
  return (
    <NavbarWrapper>
      <div className="col-1">
        <div
          className={`item ${
            asPath.split("/")[1] === "" ? "item-selected" : "item-effect"
          } `}
        >
          <Link href={"/"}>
            <span>NextTS</span>
          </Link>
        </div>
        <div
          className={`item ${
            asPath.split("/")[1] === "about" ? "item-selected" : "item-effect"
          } `}
        >
          <Link href={"about"}>
            <span>About</span>
          </Link>
        </div>
        <div
          className={`item ${
            asPath.split("/")[1] === "contact" ? "item-selected" : "item-effect"
          } `}
        >
          <Link href={"contact"}>
            <span>Contact</span>
          </Link>
        </div>
      </div>
      <div className="col-2">
        {status === 'unauthenticated' ? (
          <>
            <div
              className={`item ${
                asPath.split("/")[1] === "register"
                  ? "item-selected"
                  : "item-effect"
              } `}
            >
              <Link href={"register"}>
                <span>Register</span>{" "}
              </Link>
            </div>
            <div className={`item item-effect`}>
              <Link href={"login"}>
                <span>Login</span>
              </Link>
            </div>
          </>
        )
        : <div
        className={`item item-effect`}
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        {" "}
        <span>Logout</span>
      </div>
      }

        
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
