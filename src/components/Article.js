import { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";
// import BadUrl from "./BadUrl";
import Comments from "./Comments";

export default function Article() {
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    fetchArticleById(article_id).then((body) => {
      const { article ,msg}= body
      if(article){setCurrentArticle(article)
      }else{ setCurrentArticle({msg})}
      setLoading(false);
    });
  }, [article_id]);
  if(currentArticle.msg){
    return <h2>{currentArticle.msg}</h2>
  }
  return (
    <div>
      {isLoading ? <h2> Loading ... </h2> : ""}
      <h2 className="home-card">
        <Link to="/articles"> All articles </Link>
      </h2>
      Article :
      <ArticleTitleCard {...currentArticle} onArticlePage={true} />
      <div className="article-body">{currentArticle.body}</div>
      <button onClick={() => setShowComments((current) => !current)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments ? <Comments /> : null}
    </div>
  );
}
