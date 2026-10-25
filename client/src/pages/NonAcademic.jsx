import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NonAcademic = () => {
  const { user } = useAuth();
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tournaments'); // 'tournaments', 'students', 'trophies'

  // Institution Medals & Championship Trophies
  const institutionTrophies = [
    {
      id: 'trophy-1',
      title: 'All-Island Schools Cricket Championship',
      year: '2026',
      sport: 'Cricket',
      medal: 'Gold',
      level: 'National Championship',
      venue: 'R. Premadasa International Stadium',
      captain: 'Ruwin (Grade 10)',
      description: 'Defeated Royal College in the finals by 48 runs. 1st XI Team clinched the national championship trophy.',
      badgeColor: '#eab308',
    },
    {
      id: 'trophy-2',
      title: 'National Junior Schools Aquatic Meet',
      year: '2025',
      sport: 'Swimming',
      medal: 'Gold & Record',
      level: 'National Meet',
      venue: 'Sugathadasa Stadium Swimming Pool Complex',
      captain: 'Tharin (Grade 11)',
      description: 'Won 2 Gold Medals (50m Freestyle & 100m Butterfly) with a new national junior record of 24.82s.',
      badgeColor: '#0ea5e9',
    },
    {
      id: 'trophy-3',
      title: 'Western Province Inter-School Badminton Open',
      year: '2026',
      sport: 'Badminton',
      medal: 'Gold',
      level: 'Provincial Championship',
      venue: 'Mercantile Badminton Stadium',
      captain: 'Amoda (Grade 10)',
      description: 'Undefeated run in singles and mixed doubles. Clinched the Western Province Champion Cup.',
      badgeColor: '#10b981',
    },
    {
      id: 'trophy-4',
      title: 'Sir John Tarbet Senior Athletics Championship',
      year: '2025',
      sport: 'Athletics',
      medal: 'Gold & Silver',
      level: 'All-Island Meet',
      venue: 'Mahinda Rajapaksa Stadium, Diyagama',
      captain: 'Hasini (Grade 12)',
      description: 'Gold medal in 400m sprint (56.4s) and Silver medal in 4x100m relay.',
      badgeColor: '#f97316',
    },
    {
      id: 'trophy-5',
      title: 'Under-17 Inter-School Basketball Trophy',
      year: '2026',
      sport: 'Basketball',
      medal: 'Gold',
      level: 'All-Island Invitational',
      venue: 'St. Peter’s College Basketball Complex',
      captain: 'Kaveen Perera (Grade 11)',
      description: 'Champions after an 84-78 thriller against Ananda College. Best Offensive Team of the tournament.',
      badgeColor: '#8b5cf6',
    },
    {
      id: 'trophy-6',
      title: 'All-Island Youth Football League',
      year: '2025',
      sport: 'Football',
      medal: 'Silver',
      level: 'National Championship',
      venue: 'City Football Complex, Colombo',
      captain: 'Dinuka Fernando (Grade 10)',
      description: 'National Runners-Up with clean sheets in 4 consecutive matches. Golden Glove awarded to institution goalkeeper.',
      badgeColor: '#64748b',
    },
  ];

  // Student Athletes Roster & Sports Profiles
  const studentAthletes = [
    {
      id: 'ath-1',
      name: 'Ruwin',
      grade: 'Grade 10-A',
      sport: 'Cricket',
      position: '1st XI Captain • All-Rounder (RHB / Off-Spin)',
      avatar: 'RU',
      tournamentsCount: 8,
      medalsWon: '🥇 3 Gold • 🥈 1 Silver',
      recentWin: 'All-Island Schools Championship 2026 (Player of the Series)',
      honours: 'National U-15 Squad Candidate • Best All-Rounder Award',
      trainingTime: 'Mon, Wed, Fri (3:30 PM - 6:00 PM)',
    },
    {
      id: 'ath-2',
      name: 'Tharin',
      grade: 'Grade 11-B',
      sport: 'Swimming',
      position: 'Senior Squad • 50m / 100m Freestyle & Butterfly Specialist',
      avatar: 'TH',
      tournamentsCount: 6,
      medalsWon: '🥇 4 Gold • 🥈 2 Silver',
      recentWin: 'National Aquatic Meet 2025 (Junior National Record 24.82s)',
      honours: 'All-Island Pentathlon Gold • Sri Lanka Junior Aquatic Honors',
      trainingTime: 'Tue, Thu, Sat (6:00 AM - 8:00 AM & 4:00 PM)',
    },
    {
      id: 'ath-3',
      name: 'Amoda',
      grade: 'Grade 10-B',
      sport: 'Badminton',
      position: 'Senior Squad • Singles & Mixed Doubles Seed #1',
      avatar: 'AM',
      tournamentsCount: 5,
      medalsWon: '🥇 2 Gold • 🥈 3 Silver',
      recentWin: 'Western Province Junior Open 2026 (Provincial Champion)',
      honours: 'SLBA Junior National Trials Selection • Provincial Colors',
      trainingTime: 'Mon, Tue, Thu (3:30 PM - 5:30 PM)',
    },
    {
      id: 'ath-4',
      name: 'Hasini',
      grade: 'Grade 12-A',
      sport: 'Athletics',
      position: 'Track Captain • 400m Sprint & 4x100m Anchor',
      avatar: 'HA',
      tournamentsCount: 7,
      medalsWon: '🥇 5 Gold • 🥈 1 Silver',
      recentWin: 'Sir John Tarbet Senior Championship (400m Gold, 56.4s)',
      honours: 'School Colors Awardee • Western Province Best Female Sprinter',
      trainingTime: 'Mon to Fri (4:00 PM - 6:30 PM)',
    },
    {
      id: 'ath-5',
      name: 'Kaveen Perera',
      grade: 'Grade 11-A',
      sport: 'Basketball',
      position: 'Point Guard • Team Vice Captain',
      avatar: 'KP',
      tournamentsCount: 4,
      medalsWon: '🥇 2 Gold • 🥉 1 Bronze',
      recentWin: 'U-17 All-Island Trophy 2026 (Finals MVP)',
      honours: 'Western Province Top Scorer (24.2 PPG)',
      trainingTime: 'Wed, Fri, Sat (3:30 PM - 6:00 PM)',
    },
    {
      id: 'ath-6',
      name: 'Dinuka Fernando',
      grade: 'Grade 10-A',
      sport: 'Football',
      position: 'Goalkeeper • 1st XI Squad',
      avatar: 'DF',
      tournamentsCount: 5,
      medalsWon: '🥈 2 Silver • 🥉 1 Bronze',
      recentWin: 'All-Island Youth League 2025 (Golden Glove Award)',
      honours: '4 Clean Sheets • National Academy Prospect',
      trainingTime: 'Tue, Thu, Sat (3:30 PM - 5:45 PM)',
    },
  ];

  // Tournament Participation Matrix
  const tournamentParticipations = [
    {
      id: 'tour-1',
      eventName: 'All-Island Schools Cricket Big Match & Finals',
      sport: 'Cricket',
      date: 'Feb 28 - Mar 02, 2026',
      venue: 'R. Premadasa International Stadium',
      studentName: 'Ruwin (Grade 10)',
      role: 'Team Captain / All-Rounder',
      result: 'Champions (Gold Trophy)',
      awardBadge: 'gold',
      scorecard: 'Scored 84 runs & took 4/32 in finals. Named Player of the Match.',
    },
    {
      id: 'tour-2',
      eventName: 'National Schools Aquatic Championship',
      sport: 'Swimming',
      date: 'Jan 18 - 20, 2026',
      venue: 'Sugathadasa Stadium Pool, Colombo',
      studentName: 'Tharin (Grade 11)',
      role: '50m Freestyle & 100m Fly',
      result: '1st Place (2x Gold Medals)',
      awardBadge: 'gold',
      scorecard: 'Clocked 24.82s (New National Junior Record) in 50m Freestyle.',
    },
    {
      id: 'tour-3',
      eventName: 'Provincial Junior Badminton Championship',
      sport: 'Badminton',
      date: 'Feb 14 - 16, 2026',
      venue: 'Mercantile Badminton Complex',
      studentName: 'Amoda (Grade 10)',
      role: 'Under-17 Singles & Doubles',
      result: 'Champion (Gold Cup)',
      awardBadge: 'gold',
      scorecard: 'Straight sets victory in finals (21-17, 21-14).',
    },
    {
      id: 'tour-4',
      eventName: 'Sir John Tarbet National Senior Athletics Meet',
      sport: 'Athletics',
      date: 'Nov 22 - 25, 2025',
      venue: 'Mahinda Rajapaksa Stadium, Diyagama',
      studentName: 'Hasini (Grade 12)',
      role: '400m Track & 4x100m Relay',
      result: 'Gold (400m) & Silver (Relay)',
      awardBadge: 'gold',
      scorecard: 'Completed 400m sprint in 56.40s. Anchored the relay team to silver.',
    },
    {
      id: 'tour-5',
      eventName: 'Western Province Interschool Basketball League',
      sport: 'Basketball',
      date: 'Mar 05 - 08, 2026',
      venue: 'St. Peter’s College Courts',
      studentName: 'Kaveen Perera (Grade 11)',
      role: 'Point Guard / Playmaker',
      result: 'Tournament Champions (Gold)',
      awardBadge: 'gold',
      scorecard: 'Averaged 22 points, 8 assists. Scored buzzer-beater 3-pointer in semi-final.',
    },
    {
      id: 'tour-6',
      eventName: 'National Youth Soccer Championship',
      sport: 'Football',
      date: 'Dec 10 - 15, 2025',
      venue: 'City Football Complex',
      studentName: 'Dinuka Fernando (Grade 10)',
      role: 'Goalkeeper',
      result: 'Runners-Up (Silver Medal)',
      awardBadge: 'silver',
      scorecard: 'Saved two penalties in the semi-final shootout. Awarded Golden Glove.',
    },
    {
      id: 'tour-7',
      eventName: 'All-Island Inter-School Athletics Pentathlon',
      sport: 'Athletics',
      date: 'Oct 14, 2025',
      venue: 'Sugathadasa Track, Colombo',
      studentName: 'Ruwin (Grade 10)',
      role: 'Javelin Throw & Long Jump',
      result: 'Silver Medal (Javelin)',
      awardBadge: 'silver',
      scorecard: 'Achieved 58.42m throw in the U-16 Javelin competition.',
    },
    {
      id: 'tour-8',
      eventName: 'Sri Lanka Junior Aquatic Pentathlon',
      sport: 'Swimming',
      date: 'Sep 28, 2025',
      venue: 'Police Swimming Pool Complex',
      studentName: 'Tharin (Grade 11)',
      role: '200m Individual Medley',
      result: 'Silver Medal',
      awardBadge: 'silver',
      scorecard: 'Finished 2nd overall in 200m IM with a timing of 2:14.30.',
    },
  ];

  // Filters
  const filteredTournaments = tournamentParticipations.filter((t) => {
    const matchesSport = selectedSport === 'All' || t.sport.toLowerCase() === selectedSport.toLowerCase();
    const matchesQuery =
      t.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesQuery;
  });

  const filteredAthletes = studentAthletes.filter((a) => {
    const matchesSport = selectedSport === 'All' || a.sport.toLowerCase() === selectedSport.toLowerCase();
    const matchesQuery =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesQuery;
  });

  const downloadCertificate = (item) => {
    const text = `========================================================================
SCHOOL MANAGEMENT SYSTEM - OFFICIAL SPORTS & NON-ACADEMIC TRANSCRIPT
========================================================================
Certificate Ref ID: SMS-ATH-${item.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}
Date of Issue: ${new Date().toISOString().split('T')[0]}

STUDENT & TOURNAMENT RECORD:
------------------------------------------------------------------------
Student Athlete: ${item.studentName}
Sport Discipline: ${item.sport}
Tournament / Event: ${item.eventName}
Date & Duration: ${item.date}
Venue / Location: ${item.venue}
Designation / Role: ${item.role}
Tournament Achievement: ${item.result}

OFFICIAL PERFORMANCE SUMMARY:
${item.scorecard}

INSTITUTIONAL ENDORSEMENT:
This official certificate certifies that the student named above has 
actively represented the institution in national and provincial non-academic
athletics with commendable dedication, discipline, and exemplary sportsmanship.

Issued by: Directorate of Physical Education & Sports
Office of the School Registrar & Principal Board
Verification Code: SYS-ATH-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}
========================================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sports_Certificate_${item.studentName.split(' ')[0]}_${item.sport}.txt`;
    a.click();
  };

  return (
    <div className="content-body">
      {/* Page Title & Badges */}
      <div className="page-title-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <Trophy size={14} />
              <span>Championships & Sports</span>
            </span>
            <span className="stat-badge blue">Non-Academic Portfolio</span>
          </div>
          <h1 className="page-h1">Non-Academic & Sports Department</h1>
          <p className="page-sub">
            Track student athletics achievements, institutional championship trophies, medals tally, and tournament records.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn-force-sync"
            style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
            onClick={() => {
              const allCert = tournamentParticipations[0];
              if (allCert) downloadCertificate(allCert);
            }}
          >
            <Download size={15} />
            <span>Export Sports Log</span>
          </button>
        </div>
      </div>

      {/* Institution Medals Tally & Championship Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid #eab308' }}>
          <div className="stat-header">
            <span className="stat-title">GOLD MEDALS & WINS</span>
            <Trophy className="stat-icon" color="#eab308" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.75rem', color: '#ca8a04' }}>18 Gold</div>
          <div className="stat-subtext">All-Island & Provincial Titles</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #94a3b8' }}>
          <div className="stat-header">
            <span className="stat-title">SILVER MEDALS</span>
            <Medal className="stat-icon" color="#94a3b8" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.75rem', color: '#64748b' }}>12 Silver</div>
          <div className="stat-subtext">National Runners-Up Meets</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #b45309' }}>
          <div className="stat-header">
            <span className="stat-title">BRONZE & MERITS</span>
            <Award className="stat-icon" color="#b45309" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.75rem', color: '#b45309' }}>7 Bronze</div>
          <div className="stat-subtext">Podium Finishes</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #6366f1' }}>
          <div className="stat-header">
            <span className="stat-title">ENROLLED STUDENT ATHLETES</span>
            <Users className="stat-icon" color="#6366f1" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.75rem', color: '#4f46e5' }}>64 Students</div>
          <div className="stat-subtext">Across 6 Major Sports Squads</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Filter Controls */}
      <div
        className="activity-card"
        style={{
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className={`calendar-filter-btn ${activeTab === 'tournaments' ? 'active' : ''}`}
            onClick={() => setActiveTab('tournaments')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Activity size={14} />
            <span>Tournament Participation Ledger ({filteredTournaments.length})</span>
          </button>

          <button
            className={`calendar-filter-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Users size={14} />
            <span>Student Athletes Directory ({filteredAthletes.length})</span>
          </button>

          <button
            className={`calendar-filter-btn ${activeTab === 'trophies' ? 'active' : ''}`}
            onClick={() => setActiveTab('trophies')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Trophy size={14} />
            <span>Institution Championships ({institutionTrophies.length})</span>
          </button>
        </div>

        {/* Sport Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Sport:</span>
          {['All', 'Cricket', 'Swimming', 'Badminton', 'Athletics', 'Basketball', 'Football'].map((sport) => (
            <button
              key={sport}
              className={`calendar-filter-btn ${selectedSport === sport ? 'active' : ''}`}
              onClick={() => setSelectedSport(sport)}
              style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="search-box" style={{ width: '100%', maxWidth: '450px' }}>
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search student athlete (Ruwin, Tharin...), tournament, sport..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* TAB 1: Tournament Participation Ledger */}
      {activeTab === 'tournaments' && (
        <div className="activity-card">
          <div className="card-header-action">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Trophy size={18} color="#eab308" />
              <h2 className="card-title-h2">Student Tournament Participations & Match Results</h2>
            </div>
            <span className="stat-badge green">Verified Non-Academic Records</span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TOURNAMENT / EVENT</th>
                  <th>SPORT</th>
                  <th>DATE & VENUE</th>
                  <th>PARTICIPATING STUDENT</th>
                  <th>ROLE / CATEGORY</th>
                  <th>RESULT & MEDAL</th>
                  <th>PERFORMANCE SUMMARY</th>
                  <th>CERTIFICATE</th>
                </tr>
              </thead>
              <tbody>
                {filteredTournaments.length > 0 ? (
                  filteredTournaments.map((row) => (
                    <tr key={row.id}>
                      <td className="user-name-bold" style={{ color: 'var(--text-main)', maxWidth: '240px' }}>
                        {row.eventName}
                      </td>
                      <td>
                        <span
                          className="role-pill"
                          style={{
                            background:
                              row.sport === 'Cricket'
                                ? '#fef3c7'
                                : row.sport === 'Swimming'
                                ? '#e0f2fe'
                                : row.sport === 'Badminton'
                                ? '#dcfce7'
                                : row.sport === 'Athletics'
                                ? '#ffedd5'
                                : row.sport === 'Basketball'
                                ? '#ede9fe'
                                : '#f1f5f9',
                            color:
                              row.sport === 'Cricket'
                                ? '#b45309'
                                : row.sport === 'Swimming'
                                ? '#0369a1'
                                : row.sport === 'Badminton'
                                ? '#15803d'
                                : row.sport === 'Athletics'
                                ? '#c2410c'
                                : row.sport === 'Basketball'
                                ? '#6d28d9'
                                : '#334155',
                            fontWeight: 700,
                          }}
                        >
                          {row.sport}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{row.date}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.venue}</div>
                      </td>
                      <td>
                        <div className="user-name-bold">{row.studentName}</div>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{row.role}</td>
                      <td>
                        <span
                          className="stat-badge"
                          style={{
                            background: row.awardBadge === 'gold' ? '#fef08a' : '#e2e8f0',
                            color: row.awardBadge === 'gold' ? '#854d0e' : '#334155',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          <Trophy size={13} color={row.awardBadge === 'gold' ? '#ca8a04' : '#64748b'} />
                          {row.result}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '260px' }}>
                        {row.scorecard}
                      </td>
                      <td>
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          onClick={() => downloadCertificate(row)}
                          title="Download Official Sports Certificate"
                        >
                          <Download size={12} />
                          <span>Certificate</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      No tournament records found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Student Athletes Profiles */}
      {activeTab === 'students' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredAthletes.map((ath) => (
            <div key={ath.id} className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background:
                    ath.sport === 'Cricket'
                      ? '#eab308'
                      : ath.sport === 'Swimming'
                      ? '#0ea5e9'
                      : ath.sport === 'Badminton'
                      ? '#10b981'
                      : '#f97316',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: '#e0e7ff',
                    color: '#4338ca',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  {ath.avatar}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                    {ath.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="role-pill STUDENT">{ath.grade}</span>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: '#fef3c7',
                        color: '#b45309',
                      }}
                    >
                      {ath.sport}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8125rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {ath.position}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}>
                  <span>Medals & Podiums:</span>
                  <strong style={{ color: '#ca8a04' }}>{ath.medalsWon}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}>
                  <span>Tournament Matches:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{ath.tournamentsCount} Events</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.35rem' }}>
                  <span>Recent Major Win:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{ath.recentWin}</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>Honours & Recognition:</span>
                  <strong style={{ color: '#4f46e5' }}>{ath.honours}</strong>
                </div>
              </div>

              <div
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'var(--border-muted)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Calendar size={13} color="#6366f1" />
                <span>Training: {ath.trainingTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Institution Championship Trophies */}
      {activeTab === 'trophies' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {institutionTrophies.map((tr) => (
            <div key={tr.id} className="stat-card" style={{ borderTop: `4px solid ${tr.badgeColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: tr.badgeColor + '20',
                    color: tr.badgeColor,
                  }}
                >
                  {tr.level} • {tr.year}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#ca8a04',
                  }}
                >
                  <Trophy size={14} />
                  {tr.medal}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {tr.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={13} color="#6366f1" />
                  <span>{tr.venue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shield size={13} color="#10b981" />
                  <span>Captain: <strong>{tr.captain}</strong></span>
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                {tr.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
