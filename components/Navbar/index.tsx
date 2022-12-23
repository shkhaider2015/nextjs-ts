import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavbarWrapper from "./styles";

const Navbar = () => {
  const { asPath } = useRouter();

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
          <span>Login</span>
        </div>
        <div className={`item item-effect`}>
          {" "}
          <span>Logout</span>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
