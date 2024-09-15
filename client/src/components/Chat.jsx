import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  "end point of sever"
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    // Establish socket connection
    socket = io(ENDPOINT);

    // Clean up the socket connection on component unmount
    socket.emit("join",{name,room},()=>{

    })
    return ()=>{
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search]);

  return (
    <div>
      Chat
    </div>
  );
};

export default Chat;
