import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Roster from './components/Roster';
import Assignments from './components/Assignments';
import Reports from './components/Reports';

const NAV_ITEMS = [
  {
    key: 'roster', label: 'Roster',
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    key: 'assignments', label: 'Assign',
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    key: 'reports', label: 'Reports',
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('roster');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setActiveTab('reports');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'reports') setSelectedStudent(null);
  };

  const tabLabel = NAV_ITEMS.find((n) => n.key === activeTab)?.label || '';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile top header */}
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ backgroundColor: '#1F4D2E' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#3D7A4F' }}
          >
            <span className="text-white font-bold text-[10px] tracking-tight">WDA</span>
          </div>
          <span className="text-white font-semibold text-sm flex-1">TalkNinja Dashboard</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#85C093' }}>
            {tabLabel}
          </span>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {activeTab === 'roster' && <Roster onStudentClick={handleStudentClick} />}
          {activeTab === 'assignments' && <Assignments />}
          {activeTab === 'reports' && (
            <Reports selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />
          )}
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 py-2 z-50"
          style={{ backgroundColor: '#1F4D2E', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {NAV_ITEMS.map(({ key, label, icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className="flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all"
                style={{ color: isActive ? '#E8C547' : '#5A9E6A' }}
              >
                {icon(isActive)}
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
