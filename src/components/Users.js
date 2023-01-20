import { useContext, useEffect, useState } from "react"
import { fetchUsers, postUser } from "../api"
import { LoggedInContext } from "../App"
import Loading from "./Loading"

export default function Users(){
    const{ loggedIn, setLoggedIn}=useContext(LoggedInContext)
    const [isLoading, setLoading] = useState(true);
    const [userArr,setUserArr]= useState([])
    useEffect(()=>{
      setLoading(true)
        fetchUsers().then(body=>{
            setUserArr(body.users)
        }).then(()=>{
          setLoading(false)
        })
    },[loggedIn])
    function handleSubmit(event) {
        event.preventDefault();
        let username = event.target["new-username"].value;
        event.target["new-username"].value = "";
        let name = event.target["new-name"].value;
        event.target["new-name"].value = "";
        let avatar = event.target["new-avatar"].value;
        event.target["new-avatar"].value = "";
        postUser(username, name, avatar)
          .then((body) => {
            if (!body.hasOwnProperty("new_user")) {
              event.target["new-username"].value = username;
            }else{setLoggedIn(body.new_user)}
          })
          .catch((err) => {
            console.log(err);
          });
        
      }
    return <div>
      {isLoading ?<Loading/> : ""}
        {userArr.map(user=>{
            return <div onClick={()=>setLoggedIn(user)} key ={user.username} className='title-card'>
                {user.name}<br/>
                {user.username} <br/>
                <img className="user-img" src={user.avatar_url} alt='user avatar'/>       
                </div>
        })}
        <form onSubmit={handleSubmit}>
        <input
          id="new-username"
          type="search"
          className="input-box"
          required
        ></input>
        <input
          id="new-name"
          type="search"
          className="input-box"
          required
        ></input>
        <input
          id="new-avatar"
          type="search"
          className="input-box"
          required
        ></input>
        <button type="submit"> Add User </button>
      </form>
    </div>
}