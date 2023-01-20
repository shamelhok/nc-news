import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";
import Loading from "./Loading";

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
      {isLoading ?<Loading/> : ""}
      {topics.map((topic) => {
        return (
        <Link to={"/articles/" + topic.slug} key={topic.slug} state={{ topic: topic.slug }}>
          <div className='title-card'>          
              <h3 className="topic-title">{topic.slug}</h3>
              {topic.description}{" "}
          </div></Link>
        );
      })}
    </div>
  );
}
