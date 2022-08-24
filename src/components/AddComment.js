import { useContext, useState } from "react";
import { postComment } from "../api";
import { LoggedInContext } from "../App";

export default function AddComment(props) {
    const {loggedIn} = useContext(LoggedInContext)
    const {article_id}= props
    const [submitStr, setSubmitStr]=useState('Submit')
  function handleSubmit(event){
    event.preventDefault()
    let newComment = event.target['new-comment'].value
    event.target['new-comment'].value =''
    setSubmitStr('Posting Comment...')
    postComment(article_id,loggedIn.username, newComment
        ).then(body=>{
            console.log(body);
            setSubmitStr('Comment posted!')
            if(!body.hasOwnProperty('new_comment')){
                event.target['new-comment'].value= newComment
            setSubmitStr('Post failed, try again')
            }
        }).catch(err=>{
            console.log(err)
        })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="new-comment"
          type="search"
          className="input-box"
          required
        ></input>
        <br />
        <button type="submit"> { submitStr } </button>
      </form>
    </div>
  );
}