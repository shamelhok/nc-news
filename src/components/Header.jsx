import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../App";
import Nav from "./Nav";

export default function Header() {
  const { loggedIn } = useContext(LoggedInContext);
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <div id="header">
        <Link to="/">
          <img
            id="icon-img"
            src={
              "https://cdn3.iconfinder.com/data/icons/communication-2-2/256/Newspaper-512.png"
            }
            alt="news-icon"
          />{" "}
        </Link>{" "}
        <h1 style={{ display: "inline-block" }}>
          <Link to="/">NC NEWS </Link>
        </h1>{" "}
        <img
          onClick={() => setOpenNav((current) => !current)}
          id="user-img"
          src={
            loggedIn.avatar_url ||
            "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
          }
          alt="user-img"
        />
      </div>
      {openNav ? <Nav /> : null}
    </>
  );
}
