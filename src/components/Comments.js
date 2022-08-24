import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById, fetchComments } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";
import Votes from "./Votes";


export default  function Comments(){
    const {article_id}=useParams()
    const [commentArr, setCommentArr]= useState([])
    const [currentArticle, setCurrentArticle] = useState({});
    useEffect(() => {
      fetchArticleById(article_id).then(({ article }) => {
        setCurrentArticle(article);
      });
    }, [currentArticle, article_id]);
    useEffect(()=>{
    fetchComments(article_id).then(body=>{
      setCommentArr(body.comments)
  })},[article_id])
     return (
    <div>
        <Link to={'/article/'+article_id}><ArticleTitleCard {...currentArticle}/>
        </Link>
        Comments:
        {commentArr.map(comment=>{
          let dateCreated = "";
          try {
            dateCreated = comment.created_at.split("T")[0];
          } catch {}
          return (<div key ={comment.comment_id}>
          
          <div className="article-body">
            {comment.body} <br/>
          {comment.author} {dateCreated + "  "}
          <Votes {...comment} />
          </div></div>)
        })}
      
       
    </div>
  );
}