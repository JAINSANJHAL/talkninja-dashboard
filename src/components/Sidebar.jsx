import { school, coach } from '../data/mockData';

function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ClipboardIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function ChartBarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: 'roster',      label: 'Roster',      Icon: UsersIcon },
  { key: 'assignments', label: 'Assignments', Icon: ClipboardIcon },
  { key: 'reports',     label: 'Reports',     Icon: ChartBarIcon },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 flex flex-col shrink-0 h-full" style={{ backgroundColor: '#1F4D2E' }}>
      {/* Logo */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#3D7A4F', boxShadow: '0 4px 12px rgba(61,122,79,0.4)' }}
          >
            <span className="text-white font-bold text-xs tracking-tight">WDA</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">Westlake Debate</p>
            <p className="text-sm" style={{ color: '#85C093' }}>Academy</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-4" style={{ color: '#5A9E6A' }}>
          Dashboard
        </p>
        {NAV_ITEMS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={
              activeTab === key
                ? { backgroundColor: '#3D7A4F', color: '#fff', boxShadow: '0 4px 12px rgba(61,122,79,0.35)' }
                : { color: '#85C093' }
            }
            onMouseEnter={(e) => {
              if (activeTab !== key) e.currentTarget.style.backgroundColor = 'rgba(61,122,79,0.25)';
            }}
            onMouseLeave={(e) => {
              if (activeTab !== key) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
        <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: 'rgba(61,122,79,0.3)' }}>
          <p className="text-xs mb-2 font-medium" style={{ color: '#85C093' }}>Class Overview</p>
          <div className="flex justify-between text-xs">
            <div>
              <span className="text-white font-semibold">8</span>
              <span className="ml-1" style={{ color: '#85C093' }}>students</span>
            </div>
            <div>
              <span className="text-white font-semibold">6</span>
              <span className="ml-1" style={{ color: '#85C093' }}>active</span>
            </div>
            <div>
              <span className="text-white font-semibold">78%</span>
              <span className="ml-1" style={{ color: '#85C093' }}>avg</span>
            </div>
          </div>
        </div>

        {/* Coach */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
            style={{ backgroundColor: '#81B5C4' }}
          >
            {coach.initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{coach.name}</p>
            <p className="text-xs" style={{ color: '#85C093' }}>Coach</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#E8C547' }} />
        </div>
      </div>
    </aside>
  );
}
