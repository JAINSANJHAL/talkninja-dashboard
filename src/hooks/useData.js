import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { students as mockStudents, assignment as mockAssignment } from '../data/mockData';

// Ordered list of student UUIDs (s1–s8). The position (0-based) + 1 = integer id.
const UUID_ORDER = [
  'aaaaaaaa-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000002',
  'aaaaaaaa-0000-0000-0000-000000000003',
  'aaaaaaaa-0000-0000-0000-000000000004',
  'aaaaaaaa-0000-0000-0000-000000000005',
  'aaaaaaaa-0000-0000-0000-000000000006',
  'aaaaaaaa-0000-0000-0000-000000000007',
  'aaaaaaaa-0000-0000-0000-000000000008',
];

function uuidToIntId(uuid) {
  const idx = UUID_ORDER.indexOf(uuid);
  return idx >= 0 ? idx + 1 : null;
}

function mapStudent(row, sessionsForStudent) {
  const intId = uuidToIntId(row.id);
  return {
    id: intId,
    _uuid: row.id,
    name: row.name,
    initials: row.initials,
    color: row.color,
    lastActive: row.last_active,
    sessionsCompleted: row.sessions_completed,
    avgScore: row.avg_score,
    active: row.active,
    streak: row.streak,
    level: row.level,
    xp: row.xp,
    sessions: (sessionsForStudent || [])
      .sort((a, b) => a.session_number - b.session_number)
      .map((s) => ({
        session: s.session_number,
        date: s.date,
        overall: s.overall,
        clarity: s.clarity,
        pacing: s.pacing,
        confidence: s.confidence,
        fillers: s.fillers,
        vocabulary: s.vocabulary,
      })),
  };
}

function mapAssignment(row, completions, students) {
  // Build completions keyed by integer student id
  const completionsMap = {};
  for (const student of students) {
    completionsMap[student.id] = false;
  }
  for (const comp of completions) {
    const intId = uuidToIntId(comp.student_id);
    if (intId !== null) {
      completionsMap[intId] = comp.completed;
    }
  }

  return {
    id: row.id,
    topic: row.topic,
    speechType: row.speech_type,
    timeLimit: row.time_limit,
    deadline: row.deadline,
    daysUntilDue: row.days_until_due,
    assignedBy: row.assigned_by,
    completions: completionsMap,
  };
}

export function useData() {
  const [students, setStudents] = useState(mockStudents);
  const [assignment, setAssignment] = useState(mockAssignment);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch students
      const { data: studentRows, error: studentsError } = await supabase
        .from('students')
        .select('*')
        .order('id');

      if (studentsError) throw studentsError;

      // Fetch all sessions
      const { data: sessionRows, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .order('session_number');

      if (sessionsError) throw sessionsError;

      // Group sessions by student_id
      const sessionsByStudent = {};
      for (const s of sessionRows) {
        if (!sessionsByStudent[s.student_id]) sessionsByStudent[s.student_id] = [];
        sessionsByStudent[s.student_id].push(s);
      }

      // Map students
      const mappedStudents = studentRows.map((row) =>
        mapStudent(row, sessionsByStudent[row.id] || [])
      );

      // Sort students by their integer id (position in UUID_ORDER)
      mappedStudents.sort((a, b) => (a.id ?? 999) - (b.id ?? 999));

      setStudents(mappedStudents);

      // Fetch most recent assignment
      const { data: assignmentRows, error: assignmentError } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (assignmentError) throw assignmentError;

      if (assignmentRows && assignmentRows.length > 0) {
        const assignmentRow = assignmentRows[0];

        // Fetch completions for this assignment
        const { data: completionRows, error: completionsError } = await supabase
          .from('assignment_completions')
          .select('*')
          .eq('assignment_id', assignmentRow.id);

        if (completionsError) throw completionsError;

        setAssignment(mapAssignment(assignmentRow, completionRows || [], mappedStudents));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err.message);
      setStudents(mockStudents);
      setAssignment(mockAssignment);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { students, assignment, loading, refetch: fetchData };
}
