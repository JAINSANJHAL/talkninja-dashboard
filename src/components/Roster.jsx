import { useState } from 'react';
import { students, assignment } from '../data/mockData';

function scoreStyle(score) {
  if (score >= 85) return { bg: '#E8F5EA', text: '#1F4D2E' };
  if (score >= 70) return { bg: '#FEFAEE', text: '#8A7200' };
  return { bg: '#FDF2EF', text: '#7A2F1B' };
}

function formatLastActive(dateStr) {
  const date = new Date(dateStr);
  const now = new Date('2026-03-17');
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  if (diff < 14) return '1 week ago';
  return `${Math.floor(diff / 7)} weeks ago`;
}

export default function Roster({ onStudentClick }) {
  const [sortBy, setSortBy] = useState('name');

  const activeCount = students.filter((s) => s.active).length;
  const avgScore = Math.round(students.reduce((a, s) => a + s.avgScore, 0) / students.length);
  const completedCount = Object.values(assignment.completions).filter(Boolean).length;

  const sorted = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'score') return b.avgScore - a.avgScore;
    if (sortBy === 'sessions') return b.sessionsCompleted - a.sessionsCompleted;
    return 0;
  });

  const stats = [
    { label: 'Total Students',  value: students.length,                          emoji: '👥', bg: '#E8F5EA',  text: '#1F4D2E' },
    { label: 'Active This Week', value: activeCount,                              emoji: '🔥', bg: '#FEFAEE',  text: '#8A7200' },
    { label: 'Class Avg Score',  value: `${avgScore}%`,                           emoji: '📈', bg: '#EFF7F9',  text: '#1A3D48' },
    { label: 'Assignment Done',  value: `${completedCount}/${students.length}`,   emoji: '✅', bg: '#FDF2EF',  text: '#7A2F1B' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#1F4D2E' }}>Student Roster</h1>
        <p className="mt-1 text-sm" style={{ color: '#4A4A3F', opacity: 0.7 }}>
          Track your students' progress and activity across sessions
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 sm:p-5 shadow-sm"
            style={{ backgroundColor: stat.bg }}
          >
            <div className="text-2xl sm:text-3xl mb-2">{stat.emoji}</div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: stat.text }}>{stat.value}</div>
            <div className="text-xs mt-1 font-medium" style={{ color: '#4A4A3F', opacity: 0.75 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sort controls */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #E8F5EA' }}>
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: '1px solid #E8F5EA' }}>
          <h2 className="font-semibold" style={{ color: '#1F4D2E' }}>All Students</h2>
          <div className="flex items-center gap-1.5">
            <span className="text-xs mr-1" style={{ color: '#4A4A3F', opacity: 0.5 }}>Sort:</span>
            {['name', 'score', 'sessions'].map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={
                  sortBy === key
                    ? { backgroundColor: '#3D7A4F', color: '#fff' }
                    : { backgroundColor: '#E8F5EA', color: '#2C6140' }
                }
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Student', 'Status', 'Last Active', 'Sessions', 'Avg Score', 'Assignment', ''].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#4A4A3F', opacity: 0.45 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((student) => {
                const sc = scoreStyle(student.avgScore);
                return (
                  <tr
                    key={student.id}
                    onClick={() => onStudentClick(student)}
                    className="cursor-pointer transition-colors group"
                    style={{ borderTop: '1px solid #F5F2EC' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8F5EA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                          style={{ backgroundColor: student.color }}
                        >
                          {student.initials}
                        </div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: '#1F4D2E' }}>{student.name}</p>
                          <p className="text-xs" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                            Lvl {student.level} · <span style={{ color: '#8A7200' }}>⚡ {student.xp} XP</span>
                            {student.streak > 0 && <span style={{ color: '#8A7200' }}> · 🔥 {student.streak}d</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={student.active ? { backgroundColor: '#E8F5EA', color: '#1F4D2E' } : { backgroundColor: '#F5F2EC', color: '#4A4A3F' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: student.active ? '#3D7A4F' : '#B8DBBF' }} />
                        {student.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#4A4A3F' }}>{formatLastActive(student.lastActive)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                          <div className="h-full rounded-full" style={{ width: `${Math.min(100, (student.sessionsCompleted / 20) * 100)}%`, backgroundColor: '#3D7A4F' }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#1F4D2E' }}>{student.sessionsCompleted}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {assignment.completions[student.id] ? (
                        <span className="flex items-center gap-1 text-sm font-medium" style={{ color: '#2C6140' }}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Submitted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm font-medium" style={{ color: '#E07A5F' }}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#3D7A4F' }}>
                        View Report
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y" style={{ borderColor: '#F5F2EC' }}>
          {sorted.map((student) => {
            const sc = scoreStyle(student.avgScore);
            const done = assignment.completions[student.id];
            return (
              <div
                key={student.id}
                onClick={() => onStudentClick(student)}
                className="px-4 py-3.5 flex items-center gap-3 active:bg-green-50 cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: student.color }}
                >
                  {student.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm" style={{ color: '#1F4D2E' }}>{student.name}</p>
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                      style={student.active ? { backgroundColor: '#E8F5EA', color: '#1F4D2E' } : { backgroundColor: '#F5F2EC', color: '#4A4A3F' }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: student.active ? '#3D7A4F' : '#B8DBBF' }} />
                      {student.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#4A4A3F', opacity: 0.6 }}>
                    <span>Lvl {student.level}</span>
                    <span>·</span>
                    <span>{student.sessionsCompleted} sessions</span>
                    <span>·</span>
                    <span>{formatLastActive(student.lastActive)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: sc.bg, color: sc.text }}>
                    {student.avgScore}%
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: done ? '#2C6140' : '#E07A5F' }}>
                    {done ? '✓ Submitted' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
