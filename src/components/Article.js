import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";

export default function Article() {
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  useEffect(() => {
    fetchArticleById(article_id).then(({ article }) => {
      setCurrentArticle(article);
    });
  }, [currentArticle]);
  return (
    <div>
        <h2 className="home-card">
        <Link to="/articles"> All articles </Link>
      </h2>
      Article :
      <ArticleTitleCard {...currentArticle} onArticlePage={true} />
      <div className="article-body">{currentArticle.body}</div>
    </div>
  );
}
