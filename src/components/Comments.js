import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { fetchComments, removeComment } from "../api";
import { LoggedInContext } from "../App";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import Votes from "./Votes";


export default  function Comments(){
    const [isLoading, setLoading] = useState(true)
    const {article_id}=useParams()
    const [commentArr, setCommentArr]= useState([])
    const {loggedIn}=useContext(LoggedInContext)
    const [updateComments, reloadComments] = useState(0)
    useEffect(()=>{
    fetchComments(article_id).then(body=>{
      setCommentArr(body.comments)
      setLoading(false)
  })},[isLoading, updateComments])
     return (
    <div>
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
          {loggedIn.name ===comment.author? 
          <DeleteComment comment_id={comment.comment_id} reloadComments={reloadComments}/> 
          :null}
          </div></div>)
        })}
      
       <AddComment article_id={article_id} reloadComments={reloadComments}/>
    </div>
  );
}