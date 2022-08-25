import { removeComment } from "../api";

export default function ({ comment_id, reloadComments }) {
  function deleteComment(event) {
    event.target.style.backgroundColor = "red";
    event.target.innerHTML = " Deleting... ";
    removeComment(comment_id)
    .then(reloadComments).catch((err) => {
      event.target.style.backgroundColor = "";
      event.target.innerHTML = " Delete Comment ";
    });
  }

  return <button onClick={deleteComment}> Delete Comment</button>;
}
