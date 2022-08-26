import { useContext, useEffect, useState } from "react"
import { fetchUsers } from "../api"
import { LoggedInContext } from "../App"

export default function Users(){
    const{ loggedIn, setLoggedIn}=useContext(LoggedInContext)
    const [userArr,setUserArr]= useState([])
    useEffect(()=>{
        fetchUsers().then(body=>{
            setUserArr(body.users)
        })
    },[loggedIn])
    return <div>
        {userArr.map(user=>{
            return <div onClick={()=>setLoggedIn(user)} key ={user.username}>
                {user.username}
                {user.name}
                <img className="user-img" src={user.avatar_url} alt='user avatar'/>       
                </div>
        })}
    </div>
}