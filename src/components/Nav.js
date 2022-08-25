import { Link } from "react-router-dom";

export default function Nav(){

    return <div>
        <Link to="/articles"> All articles </Link>
        <Link to="/topics"> Topics </Link>
    </div>
}