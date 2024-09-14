import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const nameRef = useRef(null);
  const roomRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-700">
      <div className="flex flex-col items-center bg-gray-800 p-10 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-white">Join a Room</h1>
        <div className="w-full h-[2px] bg-white opacity-50 rounded-full"></div>

        {/* Input Fields */}
        <div className="space-y-4 w-full">
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            value={name} // Binding input to state
            className="w-full p-3 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            ref={roomRef}
            type="text"
            placeholder="Room"
            value={room} // Binding input to state
            className="w-full p-3 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        {/* Link to Chat */}
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={(e) => {
            if (!name || !room) e.preventDefault();
          }}
          className="w-full"
        >
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </Link>

        {/* Reset Button */}
        <button
          className="w-full text-lg font-bold text-white bg-red-500 p-3 rounded-md"
          onClick={() => {
            // Resetting both refs and state
            nameRef.current.value = "";
            setName("");
            roomRef.current.value = "";
            setRoom("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Join;
