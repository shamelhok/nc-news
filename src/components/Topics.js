import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchTopics().then((body) => {
      setTopics(body.topics);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? <h2> Loading ... </h2> : ""}
      {topics.map((topic) => {
        return (
        <Link to={"/articles/" + topic.slug} state={{ topic: topic.slug }}>
          <div key={topic.slug} className='title-card'>          
              <h3 className="topic-title">{topic.slug}</h3>
              {topic.description}{" "}
          </div></Link>
        );
      })}
    </div>
  );
}
