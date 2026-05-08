import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import './ChatWidget.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('chat_session_id');
    if (stored) return stored;
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('chat_session_id', id);
    return id;
  });
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when chat opens + start polling
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      fetchMessages();
      // Poll every 5 seconds for new admin replies
      pollRef.current = setInterval(fetchMessages, 5000);
    } else {
      clearInterval(pollRef.current);
    }
    return () => clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/sessions/${sessionId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => {
          // Check if there are new admin messages
          if (data.length > prev.length) {
            const newMsgs = data.slice(prev.length);
            const hasAdminReply = newMsgs.some(m => m.sender === 'admin');
            if (hasAdminReply && !isOpen) {
              setHasUnread(true);
            }
          }
          return data;
        });
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setLoading(true);

    // Optimistic update
    const optimistic = {
      id: 'temp_' + Date.now(),
      session_id: sessionId,
      sender: 'user',
      message: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimistic]);

    try {
      const res = await fetch(`${API_URL}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          sender: 'user',
          message: text
        })
      });

      if (res.ok) {
        const saved = await res.json();
        setMessages(prev => prev.map(m => m.id === optimistic.id ? saved : m));
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-widget" data-testid="chat-widget">
      {isOpen && (
        <div className="chat-panel" data-testid="chat-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-header-dot"></div>
              <div>
                <div className="chat-header-title">Gateway AI Support</div>
                <div className="chat-header-status">We typically reply in a few minutes</div>
              </div>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              data-testid="chat-close-btn"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          <div className="chat-messages" data-testid="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-icon">
                  <MessageCircle size={32} />
                </div>
                <p className="chat-welcome-title">Welcome to Gateway AI Systems</p>
                <p className="chat-welcome-text">Send us a message and we'll get back to you shortly.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.sender === 'user' ? 'chat-message-user' : 'chat-message-admin'}`}
              >
                {msg.sender === 'admin' && (
                  <div className="chat-message-name">{msg.sender_name || 'Support'}</div>
                )}
                <div className="chat-bubble">
                  {msg.message}
                </div>
                <div className="chat-message-time">{formatTime(msg.timestamp)}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={sendMessage} data-testid="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
              data-testid="chat-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!input.trim() || loading}
              data-testid="chat-send-btn"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        className={`chat-fab ${isOpen ? 'chat-fab-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="chat-fab"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {hasUnread && !isOpen && <span className="chat-unread-dot"></span>}
      </button>
    </div>
  );
};

export default ChatWidget;
