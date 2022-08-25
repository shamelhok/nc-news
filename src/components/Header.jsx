import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../App";
import Nav from "./Nav";

export default function Header() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [openNav,setOpenNav]= useState(false)
  return (
    <div id="header">
      <h1>
        {" "}
        <Link to="/">
          <img
            id="icon-img"
            src="https://cdn3.iconfinder.com/data/icons/communication-2-2/256/Newspaper-512.png"
            alt="news-icon"
          />
          NC NEWS{" "}
        </Link>
        <img onClick={()=>setOpenNav(current=>!current)} id="user-img" src={loggedIn.avatar_url} alt="logged in user icon" />
      </h1>
      {openNav?<Nav/>:null}
    </div>
  );
}
