import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../App";

export default function Header() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);

  return (
    <div id="header">
      <h1>
        {" "}
        <Link to="/">
          <img
            id="icon-img"
            src="https://cdn3.iconfinder.com/data/icons/communication-2-2/256/Newspaper-512.png"
            alt=""
          />
          NC NEWS{" "}
        </Link>
        <img id="user-img" src={loggedIn.avatar_url} alt="logged in user" />
      </h1>
    </div>
  );
}
