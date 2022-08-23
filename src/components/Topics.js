import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";

export default function Topics(){
    const[topics,setTopics]=useState([])
    useEffect(()=>{
        fetchTopics().then(body=>{
            setTopics(body.topics)
        })
    },[])

    return (<div>
        {topics.map(topic=>{
         return <h1 key ={topic.slug}>
         <Link to="/articles" state={{topic:topic.slug}}> {topic.slug} </Link>
         </h1> 
        })}
 
     </div>)
}