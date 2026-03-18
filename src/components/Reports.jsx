import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts';

const SKILLS = [
  { key: 'clarity',    label: 'Clarity',    color: '#3D7A4F' },
  { key: 'pacing',     label: 'Pacing',     color: '#81B5C4' },
  { key: 'confidence', label: 'Confidence', color: '#5A9E6A' },
  { key: 'fillers',    label: 'Fillers',    color: '#E07A5F' },
  { key: 'vocabulary', label: 'Vocabulary', color: '#E8C547' },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 text-xs" style={{ border: '1px solid #E8F5EA' }}>
      <p className="font-semibold mb-1" style={{ color: '#1F4D2E' }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: '#4A4A3F' }}>{p.name}:</span>
          <span className="font-bold" style={{ color: '#1F4D2E' }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

function StudentGrid({ students, onSelect }) {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#1F4D2E' }}>Reports</h1>
        <p className="mt-1 text-sm" style={{ color: '#4A4A3F', opacity: 0.7 }}>
          Tap a student to view their detailed skill breakdown
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {students.map((student) => {
          const latest = student.sessions[student.sessions.length - 1];
          const prev   = student.sessions[student.sessions.length - 2];
          const delta  = latest.overall - prev.overall;

          return (
            <button
              key={student.id}
              onClick={() => onSelect(student)}
              className="bg-white rounded-2xl p-5 shadow-sm text-left group transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: '1px solid #E8F5EA' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: student.color }}
                >
                  {student.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: '#1F4D2E' }}>{student.name}</p>
                  <p className="text-xs" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                    Level {student.level} · {student.sessionsCompleted} sessions
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-3xl font-bold" style={{ color: '#1F4D2E' }}>{latest.overall}%</div>
                  <p className="text-xs" style={{ color: '#4A4A3F', opacity: 0.5 }}>Latest score</p>
                </div>
                <span
                  className="text-sm font-semibold px-2 py-0.5 rounded-full"
                  style={
                    delta >= 0
                      ? { backgroundColor: '#E8F5EA', color: '#1F4D2E' }
                      : { backgroundColor: '#FDF2EF', color: '#7A2F1B' }
                  }
                >
                  {delta >= 0 ? '+' : ''}{delta}%
                </span>
              </div>

              <div className="space-y-1.5">
                {SKILLS.slice(0, 3).map((skill) => (
                  <div key={skill.key} className="flex items-center gap-2">
                    <div className="text-xs w-16 shrink-0" style={{ color: '#4A4A3F', opacity: 0.6 }}>{skill.label}</div>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${latest[skill.key]}%`, backgroundColor: skill.color }}
                      />
                    </div>
                    <div className="text-xs font-medium w-5 text-right" style={{ color: '#4A4A3F', opacity: 0.6 }}>
                      {latest[skill.key]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #E8F5EA' }}>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={
                    student.active
                      ? { backgroundColor: '#E8F5EA', color: '#2C6140' }
                      : { backgroundColor: '#F5F2EC', color: '#4A4A3F' }
                  }
                >
                  {student.active ? 'Active' : 'Inactive'}
                </span>
                <span
                  className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: '#3D7A4F' }}
                >
                  View details →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StudentDetail({ student, onBack }) {
  const latest     = student.sessions[student.sessions.length - 1];
  const first      = student.sessions[0];
  const improvement = latest.overall - first.overall;

  const radarData = SKILLS.map((s) => ({ skill: s.label, score: latest[s.key], fullMark: 100 }));

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors group"
        style={{ color: '#5A9E6A' }}
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Reports
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6" style={{ border: '1px solid #E8F5EA' }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0"
            style={{ backgroundColor: student.color }}
          >
            {student.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold" style={{ color: '#1F4D2E' }}>{student.name}</h1>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={
                  student.active
                    ? { backgroundColor: '#E8F5EA', color: '#1F4D2E' }
                    : { backgroundColor: '#F5F2EC', color: '#4A4A3F' }
                }
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: student.active ? '#3D7A4F' : '#B8DBBF' }} />
                {student.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap text-sm" style={{ color: '#4A4A3F', opacity: 0.6 }}>
              <span>Level {student.level}</span>
              {student.streak > 0 && (
                <span style={{ color: '#8A7200' }}>🔥 {student.streak} day streak</span>
              )}
              <span style={{ color: '#8A7200' }}>⚡ {student.xp} XP</span>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6 w-full sm:w-auto justify-around sm:justify-start shrink-0">
            {[
              { label: 'Sessions',    value: student.sessionsCompleted, color: '#1F4D2E' },
              { label: 'Avg Score',   value: `${student.avgScore}%`,    color: '#1F4D2E' },
              { label: 'Improvement', value: `+${improvement}%`,        color: '#2C6140' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4A4A3F', opacity: 0.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Skill bars + radar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8F5EA' }}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: '#1F4D2E' }}>Current Skill Scores</h2>
            <div className="space-y-3.5">
              {SKILLS.map((skill) => (
                <div key={skill.key}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium" style={{ color: '#4A4A3F' }}>{skill.label}</span>
                    <span className="text-sm font-bold" style={{ color: skill.color }}>{latest[skill.key]}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${latest[skill.key]}%`, backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8F5EA' }}>
            <h2 className="font-semibold text-sm mb-2" style={{ color: '#1F4D2E' }}>Skill Radar</h2>
            <ResponsiveContainer width="100%" height={190}>
              <RadarChart data={radarData} outerRadius={70}>
                <PolarGrid stroke="#E8F5EA" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#4A4A3F' }} />
                <Radar name={student.name} dataKey="score" stroke="#3D7A4F" fill="#3D7A4F" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8F5EA' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color: '#1F4D2E' }}>Overall Score Trend</h2>
              <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.45 }}>Last 5 sessions</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={student.sessions} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EA" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#4A4A3F', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#4A4A3F', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="overall" name="Overall" stroke="#3D7A4F" strokeWidth={2.5}
                  dot={{ fill: '#3D7A4F', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8F5EA' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color: '#1F4D2E' }}>Skill Trends</h2>
              <div className="flex gap-3 flex-wrap justify-end">
                {SKILLS.map((skill) => (
                  <div key={skill.key} className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: skill.color }} />
                    <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.6 }}>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={student.sessions} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EA" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#4A4A3F', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#4A4A3F', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {SKILLS.map((skill) => (
                  <Line key={skill.key} type="monotone" dataKey={skill.key} name={skill.label}
                    stroke={skill.color} strokeWidth={2} dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Session history */}
          <div className="bg-white rounded-2xl shadow-sm p-5" style={{ border: '1px solid #E8F5EA' }}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: '#1F4D2E' }}>Session History</h2>
            <div className="space-y-2">
              {[...student.sessions].reverse().map((session) => {
                const sc =
                  session.overall >= 85 ? { bg: '#E8F5EA', text: '#1F4D2E' } :
                  session.overall >= 70 ? { bg: '#FEFAEE', text: '#8A7200' } :
                  { bg: '#FDF2EF', text: '#7A2F1B' };
                return (
                  <div
                    key={session.session}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                    style={{ backgroundColor: '#F5F2EC' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: '#E8F5EA', color: '#1F4D2E' }}
                    >
                      {session.session}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: '#4A4A3F' }}>{session.date}</span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {session.overall}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5 shrink-0 h-8">
                      {SKILLS.map((skill) => (
                        <div
                          key={skill.key}
                          className="w-1.5 rounded-full"
                          style={{
                            backgroundColor: skill.color,
                            height: `${Math.max(4, (session[skill.key] / 100) * 32)}px`,
                            opacity: 0.7,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reports({ students, selectedStudent, setSelectedStudent }) {
  if (!selectedStudent) return <StudentGrid students={students} onSelect={setSelectedStudent} />;
  return <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
}
