import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import ArticleTitleCard from "./ArticleTitleCard";

export default function Article(){
    const[currentArticle,setCurrentArticle]= useState(
        {        })
    const {article_id}=useParams()
    useEffect(()=>{
        fetchArticleById(article_id).then(({article})=>{
            setCurrentArticle(article)
        })
    },[currentArticle])
    return (<div>
        article :
        <ArticleTitleCard {...currentArticle}/>
        {currentArticle.body}
    </div>)
}