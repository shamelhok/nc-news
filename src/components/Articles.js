import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchArticles } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";

export default function Articles() {
  const params = useParams();
  const { topic } = params;
  let topicStr = "Articles";
  if (topic) {
    topicStr = topic + " Articles";
  }
  const [currentArticles, setCurrentArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  function decreasePage() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }
  function increasePage() {
    if (currentArticles.length > 0) {
      setLoading(true);
      setCurrentPage((page) => page + 1);
    }
  }
  useEffect(() => {
    fetchArticles({ p: currentPage, topic })
      .then((body) => {
        setCurrentArticles(body.articles);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentArticles]);

  return (
    <div>
      {isLoading ? <h2> Loading ... </h2> : ""}
      <h2>{topicStr} </h2>
      <div>
        <button onClick={decreasePage}> previous page </button>
        page {currentPage}
        <button onClick={increasePage}> next page </button>
      </div>
      {currentArticles.map((article) => {
        return (
          <Link key={article.title} to={"/article/" + article.article_id}>
            <ArticleTitleCard {...article} />
          </Link>
        );
      })}
      <div>
        <button> previous page </button>
        page {currentPage}
        <button> next page </button>
      </div>
    </div>
  );
}
