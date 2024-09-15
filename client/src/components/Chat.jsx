import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
const Chat = ({location}) => {
  useEffect(()=>{
    const data = queryString.parse(location.search)
    console.log(data)
    console.log(location.search) 
  },[])
  return (
    <div>
      Chat
    </div>
  )
}

export default Chat
