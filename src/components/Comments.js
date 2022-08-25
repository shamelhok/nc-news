import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchComments } from "../api";
import AddComment from "./AddComment";
import ArticleTitleCard from "./ArticleTitleCard";
import Votes from "./Votes";


export default  function Comments(){
    const [isLoading, setLoading] = useState(true)
    const {article_id}=useParams()
    const [commentArr, setCommentArr]= useState([])
    useEffect(()=>{
    fetchComments(article_id).then(body=>{
      setCommentArr(body.comments)
      setLoading(false)
  })},[commentArr])
     return (
    <div>
        {/* <Link to={'/article/'+article_id}><ArticleTitleCard {...currentArticle}/>
        </Link> */}
        {isLoading ? <h2> Loading ... </h2> : ""}
        <h2> Comments: </h2>
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
      
       <AddComment article_id={article_id}/>
    </div>
  );
}