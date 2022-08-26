import { Link } from "react-router-dom";

export default function BadUrl() {
  return <><h2>Error 404: URL not found
    </h2>
   <h2> <Link to={'/'}> Back Home </Link>
  </h2></>
}
