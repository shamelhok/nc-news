import { useEffect, useState } from "react";
import { patchVotes } from "../api";

export default function ArticleTitleCard(article) {
  let dateCreated = "";
  try {
    dateCreated = article.created_at.split("T")[0];
  } catch {}
  const [votes, setVotes] = useState(article.votes);
  const [votesByUser, setVotesByUser] = useState(0);
  useEffect(() => {
    setVotes(article.votes);
  }, [article]);
  const { onArticlePage } = article;
  function upVote(event) {
    if (votesByUser === 0) {
      event.target.style.backgroundColor = "green";
      setVotesByUser((current) => current + 1);
      patchVotes(article.article_id, 1).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      event.target.style.backgroundColor = "";
      setVotesByUser((current) => current - 1);
      patchVotes(article.article_id, -1).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "green";
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      event.target.style.backgroundColor = "green";
      document.querySelector(".downvote").style.backgroundColor = "";
      setVotesByUser((current) => current + 2);
      patchVotes(article.article_id, 2).catch((err) => {
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
      patchVotes(article.article_id, -1).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      setVotesByUser((current) => current + 1);
      event.target.style.backgroundColor = "";
      patchVotes(article.article_id, +1).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "red";
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      event.target.style.backgroundColor = "red";
      document.querySelector(".upvote").style.backgroundColor = "";
      setVotesByUser((current) => current - 2);
      patchVotes(article.article_id, -2).catch((err) => {
        console.log(err);
        event.target.style.backgroundColor = "";
        document.querySelector(".upvote").style.backgroundColor = "green";
        setVotesByUser((current) => current + 2);
      });
    }
  }
  return (
    <div className="title-card">
      <div className="article-title">{article.title}</div>
      {article.author} {dateCreated + "  "}
      {onArticlePage ? (
        <button className="downvote" onClick={downVote}>
          {" "}
          bad{" "}
        </button>
      ) : (
        ""
      )}
      <span className="votes"> {votes} vote(s) </span>
      {onArticlePage ? (
        <button className="upvote" onClick={upVote}>
          {" "}
          good{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
