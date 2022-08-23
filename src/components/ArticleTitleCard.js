export default function ArticleTitleCard(article) {
  let dateCreated = "";
  try {
    dateCreated = article.created_at.split("T")[0];
  } catch {}
  return (
    <div className="title-card">
      <div className="article-title">{article.title}</div>
      {article.author} {dateCreated} votes: {article.votes}
    </div>
  );
}
