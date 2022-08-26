import { useEffect, useState } from "react";
import { patchVotes } from "../api";

export default function Votes(article) {
  const [votes, setVotes] = useState(article.votes);
  const { article_id, onArticlePage, comment_id } = article;
  const [votesByUser, setVotesByUser] = useState(0);
  const[ downvoteColour,setDownvoteColour]= useState('')
  const[ upvoteColour,setupvoteColour]= useState('')
  useEffect(() => {
    if (article_id || comment_id) {
      setVotes(article.votes + votesByUser);
    }
  }, [votes, article_id, votesByUser, article.votes, comment_id]);
  function upVote(event) {
    if (votesByUser === 0) {
      setupvoteColour('green')
      setVotesByUser((current) => current + 1);
      patchVotes(article_id, 1, comment_id).catch((err) => {
        console.log(err);
        setupvoteColour('')
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      setupvoteColour('')
      setVotesByUser((current) => current - 1);
      patchVotes(article_id, -1, comment_id).catch((err) => {
        console.log(err);
        setupvoteColour('green')
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      setupvoteColour('green')
      setDownvoteColour('')
      setVotesByUser((current) => current + 2);
      patchVotes(article_id, 2, comment_id).catch((err) => {
        console.log(err);
        setupvoteColour('')
        setDownvoteColour('red')
        setVotesByUser((current) => current - 2);
      });
    }
  }
  function downVote(event) {
    if (votesByUser === 0) {
      setDownvoteColour('red')
      setVotesByUser((current) => current - 1);
      patchVotes(article_id, -1, comment_id).catch((err) => {
        console.log(err);
        setDownvoteColour('')
        setVotesByUser((current) => current + 1);
      });
    } else if (votesByUser < 0) {
      setVotesByUser((current) => current + 1);
      setDownvoteColour('')
      patchVotes(article_id, +1, comment_id).catch((err) => {
        console.log(err);
        setDownvoteColour('red')
        setVotesByUser((current) => current - 1);
      });
    } else if (votesByUser > 0) {
      setDownvoteColour('red')
      setupvoteColour('')
      setVotesByUser((current) => current - 2);
      patchVotes(article_id, -2, comment_id).catch((err) => {
        console.log(err);
        setDownvoteColour('')
        setupvoteColour('green')
        setVotesByUser((current) => current + 2);
      });
    }
  }

  return (
    <span >
      {onArticlePage ? (
        <button style={{backgroundColor:downvoteColour}} className={"downvote"} onClick={downVote}>
          {" "}
          bad{" "}
        </button>
      ) : null}
      <span className="votes"> {votes} vote(s) </span>
      {onArticlePage ? (
        <button style={{backgroundColor:upvoteColour}} className={"upvote"} onClick={upVote}>
          {" "}
          good{" "}
        </button>
      ) : null}
    </span>
  );
}
