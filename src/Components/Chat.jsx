import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Chat.css'; // Custom styles for chat layout

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  const getUsernameFromEmail = (email) => {
    return email.split('@')[0].toUpperCase();
  };

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Run this effect every time messages change

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
    });
    setNewMessage('');
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="container-fluid page-container d-flex flex-column">
      <header className="header row align-items-center">
        <div className="col-md-4">
          <h3 className="mb-0">
            Welcome, <span>{auth.currentUser ? getUsernameFromEmail(auth.currentUser.email) : ''}</span>
          </h3>
        </div>
        <div className="col-md-4 text-center">
          <h1 className="app-name">Chatterbox</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
  
      {/* Chat Container */}
      <div className="chat-container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="card chat-card shadow-lg">
          <div className="card-body chat-body" ref={chatContainerRef}>
            <div className="messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.uid === auth.currentUser.uid ? 'sent' : 'received'}`}
                >
                  {msg.uid !== auth.currentUser.uid && (
                    <strong className="username">{getUsernameFromEmail(msg.email)}</strong>
                  )}
                  <span className="message-text">{msg.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
  <form className="d-flex" onSubmit={handleSendMessage}>
    <input
      type="text"
      className="form-control me-2 message-input"
      placeholder="Type a message..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      required
    />
    <button type="submit" className="btn send-btn">
      <i className="fas fa-paper-plane"></i> {/* Font Awesome paper plane icon */}
    </button>
  </form>
</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
