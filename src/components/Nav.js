import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <h3>
      <Link to="/articles"> All articles </Link> {' | '}
      <Link to="/topics"> Topics </Link>{' | '}
      <Link to="/users"> Users </Link>
    </h3>
  );
}
