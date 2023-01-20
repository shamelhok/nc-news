import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Article from "./components/Article";
import Articles from "./components/Articles";
import BadUrl from "./components/BadUrl";
import Comments from "./components/Comments";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Users from "./components/Users";

export const LoggedInContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePos({ x: event.clientX, y: event.clientY });

  //   };
  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener(
  //       'mousemove',
  //       handleMouseMove
  //     );
  //   };
  // }, []);
  const handleMouseMove = (event) => {
   
    const hovered= document.querySelectorAll('.title-card')
    hovered.forEach(card=>{
      const rect = card.getBoundingClientRect()
      // console.table({rect});
      const  x= event.clientX - rect.left
      const y= event.clientY - rect.top
      // console.log(x,y);
      // console.log(event);
      // console.dir(card);
      card.style.setProperty("--x",x+'px')
      card.style.setProperty("--y",y+'px')
    })
  };
  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <BrowserRouter>
        <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:topic" element={<Articles />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/article/:article_id" element={<Article />} />
            <Route
              path="/article/:article_id/comments"
              element={<Comments />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<BadUrl />} />
          </Routes>
        </LoggedInContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
