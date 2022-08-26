import { createContext, useState } from "react";
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

  return (
    <div className="App">
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
