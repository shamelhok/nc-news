import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/articles"><h2 className="title-card">
         All articles 
      </h2></Link>
      <Link to="/topics">
      <h2 className="title-card">
         Topics 
      </h2></Link>
      <Link to="/users">
      <h2 className="title-card">
         Users 
      </h2></Link>
    </div>
  );
}
