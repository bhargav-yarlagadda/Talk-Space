import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
 // Optional: If you want to separate CSS, though Tailwind or inline styles can be used.

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000"; // address for server port

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    
    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chat-container flex flex-col h-screen bg-gray-800">
      <div className="header bg-blue-700 p-4 text-white text-lg font-semibold">
        Room: {room}
      </div>

      <div className="chat-window flex-grow p-4 overflow-y-auto bg-gray-800 ">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.user === name ? 'self-message' : 'other-message'} p-2 my-2 rounded-lg`}>
            <p className="user font-semibold text-white italic">{msg.user}</p>
            <p className="text text-slate-200">{msg.text}</p>
          </div>
        ))}
      </div>

      <form className="message-input flex p-4 bg-gray-800" onSubmit={sendMessage}>
        <input
          className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
