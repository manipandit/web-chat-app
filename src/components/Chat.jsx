import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

const Chat = ({ user,room }) => {
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    //query msgs that are in this particular room
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    ); //"room" == room(from props)

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      // console.log("NEW MESSAGE ")
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    //cleaning up useEffect
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      // user: auth.currentUser.displayName,
      user,
      room, //room: room
    });

    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="chat-app">
        <div className="header">
          <h1> Welcome to : {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>

              <span className="user">{message.user}</span>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            className="new-messgae-input"
            placeholder="Type your message here..."
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            value={newMessage}
          />

          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
