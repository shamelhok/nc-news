import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";
import Comments from "./Comments";

export default function Article() {
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setLoading] = useState(true)
  const [viewCommentsString,setViewCommentStr]=useState('View Comments')
  const [commentsComponent,setCommentsComponent]= useState('')
  useEffect(() => {
    fetchArticleById(article_id).then(({ article }) => {
      setCurrentArticle(article);
      setLoading(false)
    });
  }, [currentArticle, article_id]);
  function viewComments(){
    setLoading(true)
    if(viewCommentsString==='View Comments'){
      setViewCommentStr('Hide Comments')
      setCommentsComponent(<Comments/>)
      setLoading(false)
    }
    if(viewCommentsString==='Hide Comments'){
      setViewCommentStr('View Comments')
      setCommentsComponent('')
      setLoading(false)
    }
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
      {/* <Link to={'/article/'+article_id+'/comments'} state ={currentArticle}><div>Comments</div></Link>  */}
      <button onClick={viewComments}> {viewCommentsString}</button>
     {commentsComponent}
    </div>
  );
}
