import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Tag, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Calendar = () => {
  const { activeRoleView } = useAuth();
  const canAddEvent = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL';

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [events, setEvents] = useState([
    {
      id: 'evt-1',
      title: 'Spring Term Mathematics Final Examinations',
      date: '2026-03-15',
      time: '09:00 AM - 12:00 PM',
      category: 'Exams',
      location: 'Main Examination Hall & Room 302',
      description: 'Mandatory final term calculus and algebra evaluation for Grades 10 to 12.',
      badgeColor: '#ef4444',
    },
    {
      id: 'evt-2',
      title: 'Annual Parent-Teacher Association (PTA) General Meet',
      date: '2026-03-20',
      time: '02:00 PM - 05:00 PM',
      category: 'PTA Meetings',
      location: 'School Auditorium',
      description: 'Discussion of student academic performance reports and infrastructure roadmap.',
      badgeColor: '#8b5cf6',
    },
    {
      id: 'evt-3',
      title: 'Inter-House Sports Meet & Track Championships',
      date: '2026-03-25',
      time: '08:30 AM - 04:00 PM',
      category: 'Sports & Arts',
      location: 'School Sports Ground',
      description: 'Athletics, relay sprints, and house championship trophy ceremony.',
      badgeColor: '#10b981',
    },
    {
      id: 'evt-4',
      title: 'National Science & Innovation Fair Workshop',
      date: '2026-03-28',
      time: '10:00 AM - 01:00 PM',
      category: 'Workshops',
      location: 'STEM Innovation Lab 102',
      description: 'Hands-on robotics, AI projects, and scientific exhibition for secondary students.',
      badgeColor: '#3b82f6',
    },
    {
      id: 'evt-5',
      title: 'Easter & Cultural Spring Break Holiday',
      date: '2026-04-02',
      time: 'All Day',
      category: 'Holidays',
      location: 'Campus Wide',
      description: 'Official school holiday recess for students and academic staff.',
      badgeColor: '#f59e0b',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-03-30',
    time: '10:00 AM - 12:00 PM',
    category: 'Exams',
    location: 'Conference Room 1',
    description: '',
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const colors = {
      Exams: '#ef4444',
      'PTA Meetings': '#8b5cf6',
      'Sports & Arts': '#10b981',
      Workshops: '#3b82f6',
      Holidays: '#f59e0b',
    };

    setEvents([
      ...events,
      {
        id: 'evt-' + Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        category: newEvent.category,
        location: newEvent.location,
        description: newEvent.description,
        badgeColor: colors[newEvent.category] || '#6366f1',
      },
    ]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      date: '2026-03-30',
      time: '10:00 AM - 12:00 PM',
      category: 'Exams',
      location: 'Conference Room 1',
      description: '',
    });
  };

  const filteredEvents = categoryFilter === 'All'
    ? events
    : events.filter((e) => e.category === categoryFilter);

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Academic Event Calendar</h1>
          <p className="page-sub">Official school schedules, exam dates, PTA assemblies, and athletic events.</p>
        </div>

        {canAddEvent ? (
          <button className="btn-force-sync" style={{ background: 'var(--primary-gradient)' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Add Event to Calendar</span>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.4rem 0.75rem', borderRadius: '8px' }}>
            <ShieldCheck size={14} color="#6366f1" />
            <span>Event Management Restricted to Principal & Owner</span>
          </div>
        )}
      </div>

      {/* Category Filter Bar */}
      <div className="activity-card" style={{ padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Tag size={16} color="#6366f1" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, marginRight: '0.5rem' }}>Filter Category:</span>
          {['All', 'Exams', 'PTA Meetings', 'Sports & Arts', 'Workshops', 'Holidays'].map((cat) => (
            <button
              key={cat}
              className={`calendar-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: evt.badgeColor }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span
                style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: evt.badgeColor + '25',
                  color: evt.badgeColor,
                }}
              >
                {evt.category}
              </span>
              <span className="calendar-event-date">{evt.date}</span>
            </div>

            <h3 className="calendar-event-title">{evt.title}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8125rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="#6366f1" />
                <span>{evt.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#10b981" />
                <span>{evt.location}</span>
              </div>
            </div>

            <p className="calendar-event-desc">
              {evt.description}
            </p>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={20} color="#6366f1" />
                <h3 className="modal-title">Schedule New School Event</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Science Exhibition & Robot Showcase"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  >
                    <option value="Exams">Exams</option>
                    <option value="PTA Meetings">PTA Meetings</option>
                    <option value="Sports & Arts">Sports & Arts</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Holidays">Holidays</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Event Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 09:00 AM - 12:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Location / Room</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Main Auditorium"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Event Details & Description</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Provide event overview and participant requirements..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Save Calendar Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
