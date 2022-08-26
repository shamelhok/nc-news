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

export const LoggedInContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

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
            <Route path="*" element={<BadUrl />} />
          </Routes>
        </LoggedInContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
