function fetchArticles(obj={}){
    let {topic,sort_by,order,limit,p}= obj
    if(!topic){ topic = '' 
    }else{ topic = '&topic='+topic}
    if(!sort_by) sort_by = ''
    if(!order) order = ''
    if(!limit) limit = ''
    if(!p) p = ''
    return fetch('https://nc-news-shamel.herokuapp.com/api/articles?sort_by='
    +sort_by+'&order='+order+'&limit='+limit+'&p='+p+topic).then(res=>{
        return res.json()
    })
}

function fetchArticleById(article_id){
    return fetch('https://nc-news-shamel.herokuapp.com/api/articles/'+article_id).then(res=>{
        return res.json()
    })
}

export {fetchArticles, fetchArticleById} 