import { useState } from 'react';
import { students, assignment as activeAssignment } from '../data/mockData';

const SPEECH_TYPES = [
  'Congressional', 'Lincoln-Douglas', 'Policy', 'Public Forum',
  'SPAR', 'Extemporaneous', 'Impromptu', 'Original Oratory',
];
const TIME_LIMITS = [1, 2, 3, 5, 7, 10];

export default function Assignments() {
  const [form, setForm] = useState({ topic: '', speechType: 'Congressional', timeLimit: 2, deadline: '' });
  const [submitted, setSubmitted] = useState(false);

  const completedCount = Object.values(activeAssignment.completions).filter(Boolean).length;
  const completionPct = Math.round((completedCount / students.length) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ topic: '', speechType: 'Congressional', timeLimit: 2, deadline: '' });
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#1F4D2E' }}>Assignments</h1>
        <p className="mt-1 text-sm" style={{ color: '#4A4A3F', opacity: 0.7 }}>
          Create and manage speech challenges for your class
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Create form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6" style={{ border: '1px solid #E8F5EA' }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F5EA' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#3D7A4F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="font-semibold" style={{ color: '#1F4D2E' }}>Create Assignment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                  Topic / Motion
                </label>
                <textarea
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  placeholder="e.g. Should AI be regulated by governments?"
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm resize-none focus:outline-none focus:ring-2"
                  style={{
                    border: '1px solid #B8DBBF',
                    color: '#4A4A3F',
                    backgroundColor: '#fff',
                    focusRingColor: '#3D7A4F',
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                  Speech Type
                </label>
                <select
                  value={form.speechType}
                  onChange={(e) => setForm({ ...form, speechType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                  style={{ border: '1px solid #B8DBBF', color: '#4A4A3F', backgroundColor: '#fff' }}
                >
                  {SPEECH_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                  Time Limit
                </label>
                <div className="flex gap-2 flex-wrap">
                  {TIME_LIMITS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, timeLimit: t })}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={
                        form.timeLimit === t
                          ? { backgroundColor: '#3D7A4F', color: '#fff' }
                          : { backgroundColor: '#E8F5EA', color: '#2C6140' }
                      }
                    >
                      {t}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A4A3F', opacity: 0.55 }}>
                  Deadline
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
                  style={{ border: '1px solid #B8DBBF', color: '#4A4A3F' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                style={
                  submitted
                    ? { backgroundColor: '#3D7A4F', color: '#fff' }
                    : { backgroundColor: '#3D7A4F', color: '#fff', boxShadow: '0 4px 12px rgba(61,122,79,0.3)' }
                }
              >
                {submitted ? '✓ Assignment Created!' : 'Assign to Class'}
              </button>
            </form>
          </div>
        </div>

        {/* Active assignments */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold" style={{ color: '#1F4D2E' }}>Active Assignments</h2>
            <span className="text-xs" style={{ color: '#4A4A3F', opacity: 0.45 }}>1 active</span>
          </div>

          {/* Assignment card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #E8F5EA' }}>
            {/* Header */}
            <div
              className="px-6 py-5"
              style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #3D7A4F 100%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                    >
                      {activeAssignment.speechType}
                    </span>
                    <span
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                    >
                      ⏱ {activeAssignment.timeLimit} min
                    </span>
                    <span
                      className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: '#E8C547', color: '#8A7200' }}
                    >
                      ⚠ Due in {activeAssignment.daysUntilDue} days
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-snug">
                    "{activeAssignment.topic}"
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#85C093' }}>
                    Assigned by {activeAssignment.assignedBy}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-white text-3xl font-bold">{completionPct}%</p>
                  <p className="text-xs" style={{ color: '#85C093' }}>{completedCount}/{students.length} submitted</p>
                </div>
              </div>
            </div>

            <div className="px-6 pt-4 pb-5">
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full mb-5 overflow-hidden" style={{ backgroundColor: '#E8F5EA' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${completionPct}%`,
                    background: 'linear-gradient(90deg, #3D7A4F, #5A9E6A)',
                  }}
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A4A3F', opacity: 0.45 }}>
                Student Status
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {students.map((student) => {
                  const done = activeAssignment.completions[student.id];
                  return (
                    <div
                      key={student.id}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm"
                      style={
                        done
                          ? { backgroundColor: '#E8F5EA', border: '1px solid #B8DBBF' }
                          : { backgroundColor: '#F5F2EC', border: '1px solid #E8DBBF' }
                      }
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: student.color }}
                      >
                        {student.initials[0]}
                      </div>
                      <span className="font-medium flex-1 text-xs" style={{ color: done ? '#1F4D2E' : '#4A4A3F' }}>
                        {student.name.split(' ')[0]}
                      </span>
                      {done ? (
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#3D7A4F' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-xs font-medium" style={{ color: '#E07A5F' }}>Pending</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Empty state */}
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: '#F5F2EC', border: '2px dashed #B8DBBF' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: '#E8F5EA' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5A9E6A' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: '#4A4A3F' }}>No other assignments yet</p>
            <p className="text-xs mt-1" style={{ color: '#4A4A3F', opacity: 0.5 }}>Use the form to create your next assignment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
