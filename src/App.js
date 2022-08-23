import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Article from './components/Article';
import Articles from './components/Articles';
import Header from './components/Header';
import Home from './components/Home';
export const LoggedInContext = createContext()

function App() {
  const [loggedIn, setLoggedIn]= useState({
    "username": "tickle122",
    "name": "Tom Tickle",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
    })

  return (
    <div className="App">
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/articles" element={<Articles/>} />
      <Route path="/articles/:article_id" element={<Article/>} />
      </Routes>
    </LoggedInContext.Provider>
    </div>
  );
}

export default App;
