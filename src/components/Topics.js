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
         return <div key ={topic.slug}>
         <Link to={"/articles/"+topic.slug} state={{topic:topic.slug}}> <h1>
            {topic.slug}</h1>
            {topic.description} </Link>
         </div> 
        })}
 
     </div>)
}