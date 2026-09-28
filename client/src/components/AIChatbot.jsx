import React, { useState } from 'react';
import { Bot, X, Send, ShieldCheck, KeyRound, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  // Conversation history
  const [messages, setMessages] = useState([
    {
      id: 'bot-init',
      sender: 'bot',
      text: '👋 Hello! I am your AI School Assistant. I can help you with school events, exam dates, notices, tuition fees, and protected student exam marks. How can I help you today?',
      time: 'Just now',
    },
  ]);

  // Marks verification state inside bot conversation
  const [marksState, setMarksState] = useState({
    inFlow: false,
    step: 0, // 1: Waiting for Name & Reg No, 2: Waiting for OTP
    studentName: '',
    regNumber: '',
    email: 'student@school.edu',
    otp: '',
  });

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    triggerMessage(userText);
    setInput('');
  };

  const triggerMessage = (userText) => {
    const newMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);

    // Process Bot Response
    setTimeout(() => {
      processBotResponse(userText);
    }, 600);
  };

  const handleChipClick = (promptText) => {
    triggerMessage(promptText);
  };

  const processBotResponse = (userText) => {
    const lower = userText.toLowerCase();

    // 1. If currently in OTP Verification Step
    if (marksState.inFlow && marksState.step === 2) {
      if (userText.trim() === marksState.otp) {
        setMarksState({ inFlow: false, step: 0, studentName: '', regNumber: '', email: '', otp: '' });
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: `✅ Identity Verified! Here are the official exam marks for Ruwin (REG-2026-001, Grade 10-A):\n\n• Cumulative GPA: 3.85 / 4.0 (90.2%)\n• MATH-201 Calculus & Algebra: 94% (Grade A+)\n• BIO-104 Cell Division: 88% (Grade A)\n• HIST-301 Ancient Rome: 91% (Grade A)\n• PHYS-202 Wave Dynamics: 84% (Grade B+)\n\nAcademic Standing: Passed (Honors List)`,
            time: 'Just now',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: `❌ Invalid verification code. For testing, please enter the 6-digit OTP code: ${marksState.otp}`,
            time: 'Just now',
          },
        ]);
      }
      return;
    }

    // 2. If currently in Name & Reg No Step
    if (marksState.inFlow && marksState.step === 1) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setMarksState((prev) => ({ ...prev, step: 2, otp: generatedOtp }));
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: `🔒 Security Verification Initiated for ${userText}.\n\n📧 A 6-digit OTP code has been dispatched to student@school.edu.\n\n(Demo OTP Code: ${generatedOtp})\n\nPlease enter the 6-digit OTP code to reveal protected exam marks.`,
          time: 'Just now',
        },
      ]);
      return;
    }

    // 3. User asks for Exam Marks / Results
    if (lower.includes('mark') || lower.includes('result') || lower.includes('score') || lower.includes('grade') || lower.includes('gpa')) {
      setMarksState({ inFlow: true, step: 1, studentName: '', regNumber: '', email: 'student@school.edu', otp: '' });
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '🔐 To protect student privacy, please provide the Student Full Name and Registration Number (e.g. Ruwin, REG-2026-001).',
          time: 'Just now',
        },
      ]);
      return;
    }

    // 4. Events & Calendar Queries
    if (lower.includes('event') || lower.includes('calendar') || lower.includes('schedule') || lower.includes('sport') || lower.includes('pta') || lower.includes('holiday')) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '📅 Upcoming Academic Events & Schedule:\n\n1. Spring Math Final Exams: March 15 (09:00 AM)\n2. Annual PTA General Meet: March 20 (02:00 PM)\n3. Inter-House Sports Meet: March 25 (08:30 AM)\n4. Science & Robotics Fair: March 28 (10:00 AM)\n5. Easter & Cultural Break: April 02 (All Day)\n\nYou can view the full calendar under the "Event Calendar" tab!',
          time: 'Just now',
        },
      ]);
      return;
    }

    // 5. Tuition / Fees Queries
    if (lower.includes('fee') || lower.includes('pay') || lower.includes('tuition') || lower.includes('salary')) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '💳 Tuition fees for Q1 2026 can be paid via Credit Card or Direct Bank Transfer. Parents can view clearance records under the Parent Network tab. Staff salary management is restricted to Admin & Principal.',
          time: 'Just now',
        },
      ]);
      return;
    }

    // 6. Greetings
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('good morning')) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '👋 Hello there! How can I assist you today? Feel free to ask about school events, exam marks, fees, or community Q&A.',
          time: 'Just now',
        },
      ]);
      return;
    }

    // 7. Password / Register Queries
    if (lower.includes('password') || lower.includes('login') || lower.includes('register') || lower.includes('account')) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '🔑 Authentication Help:\n\n• To Register: Click "Create New User Account" on the Sign In page.\n• To Reset Password: Click "Forgot Password?", enter your email, and input the 6-digit Email OTP verification code.',
          time: 'Just now',
        },
      ]);
      return;
    }

    // 8. Default Fallback
    setMessages((prev) => [
      ...prev,
      {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: 'I can assist you with:\n1. 📅 School Events & Calendar dates\n2. 📊 Student Exam Marks (Requires Name, Reg No & Email OTP)\n3. 📢 Notices & Announcements\n4. 💬 Community Q&A Forum\n\nClick a suggestion prompt below or ask your question!',
        time: 'Just now',
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99,
            transition: 'all 0.2s ease',
          }}
          onClick={() => setIsOpen(true)}
          title="AI School Assistant"
        >
          <Bot size={28} />
        </button>
      )}

      {/* Floating Chat Widget */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '390px',
            height: '540px',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.35rem', borderRadius: '8px' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>AI School Assistant</h4>
                <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>Events, Marks & Q&A Helper</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div
            style={{
              padding: '0.5rem 0.85rem',
              background: 'var(--border-muted)',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            <button
              style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', border: 'none', background: '#6366f1', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => handleChipClick('Upcoming events')}
            >
              📅 Events
            </button>

            <button
              style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', border: 'none', background: '#10b981', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => handleChipClick('Check my exam marks')}
            >
              📊 Check Marks
            </button>

            <button
              style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', border: 'none', background: '#8b5cf6', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => handleChipClick('Tuition fee status')}
            >
              💳 Tuition Fees
            </button>

            <button
              style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', border: 'none', background: '#f59e0b', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => handleChipClick('How to reset password')}
            >
              🔑 Password Reset
            </button>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 0.95rem',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.sender === 'user' ? '#6366f1' : '#f1f5f9',
                    color: m.sender === 'user' ? 'white' : '#0f172a',
                    fontSize: '0.8125rem',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              className="chat-input-box"
              placeholder="Ask about events, marks, fees..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" style={{ padding: '0.6rem 0.85rem' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
