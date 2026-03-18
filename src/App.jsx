import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Roster from './components/Roster';
import Assignments from './components/Assignments';
import Reports from './components/Reports';

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

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'roster' && (
          <Roster onStudentClick={handleStudentClick} />
        )}
        {activeTab === 'assignments' && <Assignments />}
        {activeTab === 'reports' && (
          <Reports
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        )}
      </main>
    </div>
  );
}
