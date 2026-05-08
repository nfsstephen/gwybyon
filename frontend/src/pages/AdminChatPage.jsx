import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import './AdminChatPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminChatPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem('adminAuthenticated') === 'true'
  );
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch sessions
  useEffect(() => {
    if (!authenticated) return;
    fetchSessions();
    const interval = setInterval(fetchSessions, 8000);
    return () => clearInterval(interval);
  }, [authenticated]);

  // Fetch messages for selected session
  useEffect(() => {
    if (!selectedSession) return;
    fetchMessages(selectedSession);
    pollRef.current = setInterval(() => fetchMessages(selectedSession), 4000);
    return () => clearInterval(pollRef.current);
  }, [selectedSession]);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/sessions`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    }
  };

  const fetchMessages = async (sessionId) => {
    try {
      const res = await fetch(`${API_URL}/api/chat/sessions/${sessionId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const sendReply = async (e) => {
    e.preventDefault();
    const text = reply.trim();
    if (!text || sending || !selectedSession) return;

    setReply('');
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: selectedSession,
          sender: 'admin',
          message: text,
          sender_name: 'Gateway AI Support'
        })
      });
      if (res.ok) {
        await fetchMessages(selectedSession);
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setSending(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (data.valid) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        setAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('Incorrect admin password.');
      }
    } catch {
      setAuthError('Unable to verify password. Please try again.');
    }
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  // Admin login gate
  if (!authenticated) {
    return (
      <div className="admin-login-page" data-testid="admin-login">
        <div className="admin-login-box">
          <div className="admin-login-logo">Admin Panel</div>
          <h2>Chat Administration</h2>
          <form onSubmit={handleAdminLogin}>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              data-testid="admin-password-input"
            />
            {authError && <div className="admin-login-error">{authError}</div>}
            <button type="submit" data-testid="admin-login-btn">Access Panel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-chat-page" data-testid="admin-chat-page">
      {/* Sessions Sidebar */}
      <div className={`admin-sidebar ${selectedSession ? 'admin-sidebar-hidden-mobile' : ''}`} data-testid="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Conversations</h2>
          <button className="admin-refresh-btn" onClick={fetchSessions} data-testid="admin-refresh-btn">
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="admin-sessions-list">
          {sessions.length === 0 && (
            <div className="admin-no-sessions">
              <MessageCircle size={32} />
              <p>No conversations yet</p>
            </div>
          )}
          {sessions.map((session) => (
            <div
              key={session.session_id}
              className={`admin-session-item ${selectedSession === session.session_id ? 'admin-session-active' : ''}`}
              onClick={() => setSelectedSession(session.session_id)}
              data-testid={`session-${session.session_id}`}
            >
              <div className="admin-session-avatar">
                {(session.visitor_name || 'V')[0].toUpperCase()}
              </div>
              <div className="admin-session-info">
                <div className="admin-session-name">
                  {session.visitor_name || 'Visitor'}
                </div>
                <div className="admin-session-preview">
                  {session.last_message || 'No messages'}
                </div>
              </div>
              <div className="admin-session-time">
                {timeAgo(session.last_message_at)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`admin-chat-area ${!selectedSession ? 'admin-chat-area-hidden-mobile' : ''}`}>
        {!selectedSession ? (
          <div className="admin-no-selection">
            <MessageCircle size={48} />
            <p>Select a conversation to view messages</p>
          </div>
        ) : (
          <>
            <div className="admin-chat-header">
              <button
                className="admin-back-btn"
                onClick={() => setSelectedSession(null)}
                data-testid="admin-back-btn"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <div className="admin-chat-title">
                  {sessions.find(s => s.session_id === selectedSession)?.visitor_name || 'Visitor'}
                </div>
                <div className="admin-chat-session-id">
                  Session: {selectedSession.slice(0, 20)}...
                </div>
              </div>
            </div>

            <div className="admin-messages" data-testid="admin-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`admin-msg ${msg.sender === 'admin' ? 'admin-msg-admin' : 'admin-msg-user'}`}
                >
                  <div className="admin-msg-bubble">
                    {msg.message}
                  </div>
                  <div className="admin-msg-meta">
                    {msg.sender === 'admin' ? 'You' : 'Visitor'} &middot; {formatTime(msg.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="admin-reply-area" onSubmit={sendReply} data-testid="admin-reply-form">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                className="admin-reply-input"
                data-testid="admin-reply-input"
                disabled={sending}
              />
              <button
                type="submit"
                className="admin-reply-btn"
                disabled={!reply.trim() || sending}
                data-testid="admin-reply-btn"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;
