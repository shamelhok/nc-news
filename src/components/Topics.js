import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchTopics().then((body) => {
      setTopics(body.topics);
      setLoading(false)
    });
  }, []);

  return (
    <div>
       {isLoading ? <h2> Loading ... </h2> : ""}
      {topics.map((topic) => {
        return (
          <div key={topic.slug}>
            <Link to={"/articles/" + topic.slug} state={{ topic: topic.slug }}>
              <h2 className="topic-title">{topic.slug}</h2>
              {topic.description}{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
