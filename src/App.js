import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import "./styles/Chat.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const roomInputRef = useRef(null);
  const roomUserRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
    setUser(null)
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="app">
      {room ? (
        <Chat room={room} user={user}/>
      ) : (
        <div className="room">
          <div className="room-items">
            <label className="room-name">Enter Room Name:</label>
            <input ref={roomInputRef} className="ip" />
            <label className="room-name">Enter User Name:</label>
            <input ref={roomUserRef} className="ip" />
            <button
              onClick={() => {
                setRoom(roomInputRef.current.value)
                setUser(roomUserRef.current.value)
              }}
              className="btn"
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}

      <div className="sign-out">
        <button onClick={signUserOut} className="btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default App;
