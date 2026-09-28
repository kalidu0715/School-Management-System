import React, { useState } from 'react';
import { MessageSquare, Send, Hash, User, Search, Paperclip } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CommunityChat = () => {
  const { user, activeRoleView } = useAuth();
  const [activeChannel, setActiveChannel] = useState('academic-help');
  const [inputMessage, setInputMessage] = useState('');

  const channels = [
    { id: 'general-announcements', name: 'general-announcements', label: 'General Announcements', desc: 'School wide updates & news' },
    { id: 'academic-help', name: 'academic-help', label: 'Academic & Q&A Help', desc: 'Ask subject questions & assignments' },
    { id: 'parent-forum', name: 'parent-forum', label: 'Parent & Community Forum', desc: 'Parent discussion & PTA topics' },
    { id: 'teacher-lounge', name: 'teacher-lounge', label: 'Faculty & Teacher Lounge', desc: 'Staff collaboration & planning' },
  ];

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      channel: 'academic-help',
      sender: 'Ruwin',
      role: 'STUDENT',
      avatar: 'RU',
      time: '10:15 AM',
      text: 'Hello everyone! Is the Mathematics Q1 final exam syllabus updated on the portal?',
    },
    {
      id: 'msg-2',
      channel: 'academic-help',
      sender: 'Sajith',
      role: 'TEACHER',
      avatar: 'SA',
      time: '10:18 AM',
      text: 'Hi Ruwin! Yes, Calculus chapters 1-5 have been uploaded to the Subjects tab.',
    },
    {
      id: 'msg-3',
      channel: 'parent-forum',
      sender: 'Amitha',
      role: 'PARENT',
      avatar: 'AM',
      time: '09:30 AM',
      text: 'Good morning! What time does the PTA assembly begin this Friday?',
    },
    {
      id: 'msg-4',
      channel: 'parent-forum',
      sender: 'Principal',
      role: 'PRINCIPAL',
      avatar: 'PR',
      time: '09:35 AM',
      text: 'Good morning Amitha. The PTA conference commences at 3:00 PM in the Auditorium.',
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMsg = {
      id: 'msg-' + Date.now(),
      channel: activeChannel,
      sender: user ? user.name : 'User',
      role: activeRoleView || 'STUDENT',
      avatar: user ? user.avatar : 'US',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulate automated community/teacher reply after 1s
    setTimeout(() => {
      let replyText = 'Thanks for your message! Our community members will respond shortly.';
      let replySender = 'Sajith (Teacher)';
      let replyRole = 'TEACHER';
      let replyAvatar = 'SA';

      if (activeChannel === 'academic-help') {
        replyText = 'Great question! The course materials and exam details have been synchronized on the portal.';
        replySender = 'Sajith';
        replyRole = 'TEACHER';
        replyAvatar = 'SA';
      } else if (activeChannel === 'parent-forum') {
        replyText = 'Thank you for sharing this in the parent forum. We will review this at the next PTA meeting.';
        replySender = 'Amitha';
        replyRole = 'PARENT';
        replyAvatar = 'AM';
      } else if (activeChannel === 'teacher-lounge') {
        replyText = 'Noted! I will add this topic to our upcoming faculty assembly agenda.';
        replySender = 'Principal';
        replyRole = 'PRINCIPAL';
        replyAvatar = 'PR';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'reply-' + Date.now(),
          channel: activeChannel,
          sender: replySender,
          role: replyRole,
          avatar: replyAvatar,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText,
        },
      ]);
    }, 1000);
  };

  const filteredMessages = messages.filter((m) => m.channel === activeChannel);

  return (
    <div className="content-body" style={{ height: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-title-row" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 className="page-h1">School Community & Q&A Chat</h1>
          <p className="page-sub">Public channels for teachers, students, parents, and administration to communicate.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.25rem', height: '100%', minHeight: 0 }}>
        {/* Channel Sidebar */}
        <div className="activity-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            CHANNELS & GROUPS
          </div>

          {channels.map((ch) => (
            <button
              key={ch.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                background: activeChannel === ch.id ? '#6366f1' : 'transparent',
                color: activeChannel === ch.id ? 'white' : '#475569',
                fontWeight: activeChannel === ch.id ? 700 : 500,
                fontSize: '0.8125rem',
                transition: 'all 0.15s ease',
              }}
              onClick={() => setActiveChannel(ch.id)}
            >
              <Hash size={16} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.label}</div>
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="activity-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          {/* Header */}
          <div className="card-header-action" style={{ borderBottom: '1px solid #f1f5f9', padding: '0.85rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Hash size={18} color="#6366f1" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                {channels.find((c) => c.id === activeChannel)?.label}
              </h3>
            </div>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', background: '#e0e7ff', color: '#4338ca', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{msg.sender}</span>
                      <span className={`role-pill ${msg.role}`}>{msg.role}</span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{msg.time}</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.75rem 0.95rem', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#334155', display: 'inline-block', maxWidth: '85%' }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 1rem', fontSize: '0.875rem' }}>
                No messages yet in #{activeChannel}. Be the first to ask a question!
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            <input
              type="text"
              className="chat-input-box"
              placeholder={`Type a question or message in #${activeChannel}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={15} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
