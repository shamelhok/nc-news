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
    "https://nc-news-shamel.herokuapp.com/api/articles?sort_by=" +
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
    "https://nc-news-shamel.herokuapp.com/api/articles/" + article_id
  ).then((res) => {
    return res.json();
  });
}

function fetchTopics() {
  return fetch("https://nc-news-shamel.herokuapp.com/api/topics").then(
    (res) => {
      return res.json();
    }
  );
}
function patchVotes(article_id, voteChange) {
  return fetch(
    "https://nc-news-shamel.herokuapp.com/api/articles/" + article_id,
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
function fetchComments(article_id){
  return fetch('https://nc-news-shamel.herokuapp.com/api/articles/'+article_id+'/comments')
  .then((res)=>res.json())
}
function postComment(article_id, username,body) {
  return fetch(
    "https://nc-news-shamel.herokuapp.com/api/articles/" + article_id+'/comments',
    {
      method: "POST",
      body: JSON.stringify({
        username,body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((res) => {
    return res.json();
  });
}
export { fetchArticles, fetchArticleById, fetchTopics, patchVotes , fetchComments, postComment};
