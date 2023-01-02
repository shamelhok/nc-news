const backEndHost= "https://nc-news-api-rwfo.onrender.com"
function fetchArticles(obj = {}) {
  let { topic, sort_by, order, limit, p } = obj;
  if (!topic) {
    topic = "";
  } else {
    topic = "&topic=" + topic;
  }
  if (!sort_by) sort_by = "";
  if (!order) order = "";
  if (!limit) limit = "";
  if (!p) p = "";
  return fetch(
    backEndHost+"/api/articles?sort_by=" +
      sort_by +
      "&order=" +
      order +
      "&limit=" +
      limit +
      "&p=" +
      p +
      topic
  ).then((res) => {
    return res.json();
  });
}

function fetchArticleById(article_id) {
  return fetch(
    backEndHost+"/api/articles/" + article_id
  ).then((res) => {
    return res.json();
  });
}

function fetchTopics() {
  return fetch(backEndHost+"/api/topics").then(
    (res) => {
      return res.json();
    }
  );
}
function patchVotes(article_id, voteChange,comment_id) {
  return fetch(
    backEndHost+"/api/"+(article_id?`articles/${article_id}`:`comments/${comment_id}`),
    {
      method: "PATCH",
      body: JSON.stringify({
        inc_votes: voteChange,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((res) => {
    return res.json();
  });
}
function fetchComments(article_id) {
  return fetch(
    backEndHost+"/api/articles/" +
      article_id +
      "/comments"
  ).then((res) => res.json());
}
function postComment(article_id, username, body) {
  return fetch(
    backEndHost+"/api/articles/" +
      article_id +
      "/comments",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((res) => {
    return res.json();
  });
}
function postUser( username, name, avatar_url) {
  return fetch(
    backEndHost+"/api/users",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        name,
        avatar_url
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((res) => {
    return res.json();
  });
}
function removeComment(comment_id) {
  return fetch(
    backEndHost+"/api/comments/" + comment_id,
    { method: "DELETE" }
  )
}
function fetchUsers(){
  return fetch(backEndHost+"/api/users").then(
    (res) => {
      return res.json();
    }
  );
}
export {
  fetchUsers,
  removeComment,
  fetchArticles,
  fetchArticleById,
  fetchTopics,
  patchVotes,
  fetchComments,
  postComment,
  postUser
};
