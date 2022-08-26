import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles, fetchTopics } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";
import SortBy from "./SortBy";

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
  const [sort_by, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [isTopicValid,setISTopicValid]= useState(true)
  function decreasePage() {
    if (currentPage > 1) {
      setLoading(true);
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
    setLoading(true);
    fetchArticles({ p: currentPage, topic, sort_by, order })
      .then((body) => {
        setCurrentArticles(body.articles);
        if(body.articles.length===0){
          fetchTopics().then(({topics})=>{
            const topicNames = topics.map(item=>item.slug)
            if(!topicNames.includes(topic)){
              setISTopicValid(false)
            }
          })
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage, topic, sort_by, order]);

  if(!isTopicValid){
    return<><h2>Invalid topic</h2>
    <h2> <Link to={'/topics'}> View Topics </Link></h2></>
  }
  return (
    <div>
      {isLoading ? <h2> Loading ... </h2> : ""}
      <h2>{topicStr} </h2>
      <SortBy setSortBy={setSortBy} setOrder={setOrder} />
      <br/>
      <div>
        <button onClick={decreasePage}> previous page </button> page{" "}
        {currentPage} <button onClick={increasePage}> next page </button>
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
