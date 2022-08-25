import { useEffect, useState } from "react";
import { fetchArticleById, patchVotes } from "../api";

export default function Votes(article) {
  const [votes, setVotes] = useState(article.votes);
  const {article_id, onArticlePage, comment_id}=article
  const [votesByUser, setVotesByUser] = useState(0);
  useEffect(() => {
    if(article_id||comment_id){setVotes(article.votes+ votesByUser)}
  }, [votes, article_id, votesByUser]);
  function upVote(event) {
    if (votesByUser === 0) {
      event.target.style.backgroundColor = "green";
      setVotesByUser((current) => current + 1);
      patchVotes(article_id, 1,comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      event.target.style.backgroundColor = "";
      setVotesByUser((current) => current - 1);
      patchVotes(article_id, -1, comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "green";
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      event.target.style.backgroundColor = "green";
      document.querySelector(".downvote").style.backgroundColor = "";
      setVotesByUser((current) => current + 2);
      patchVotes(article_id, 2, comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        document.querySelector(".downvote").style.backgroundColor = "red";
        setVotesByUser((current) => current - 2);
      });
    }
  }
  function downVote(event) {
    if (votesByUser === 0) {
      event.target.style.backgroundColor = "red";
      setVotesByUser((current) => current - 1);
      patchVotes(article_id, -1, comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      setVotesByUser((current) => current + 1);
      event.target.style.backgroundColor = "";
      patchVotes(article_id, +1, comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "red";
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      event.target.style.backgroundColor = "red";
      document.querySelector(".upvote").style.backgroundColor = "";
      setVotesByUser((current) => current - 2);
      patchVotes(article_id, -2, comment_id).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        document.querySelector(".upvote").style.backgroundColor = "green";
        setVotesByUser((current) => current + 2);
      });
    }
  }

  return (
    <span>
      {onArticlePage ? (
        <button className="downvote"  onClick={downVote}>
          {" "}
          bad{" "}
        </button>
      ) : (
        null
      )}
      <span className="votes"> {votes} vote(s) </span>
      {onArticlePage ? (
        <button className="upvote" onClick={upVote}>
          {" "}
          good{" "}
        </button>
      ) : (
        null
      )}
    </span>
  );
}
