'use client';
import { useState } from 'react';

const routine = {
  "Día 1": ["Hammer Chest Press", "Pectoral Fly", "Hammer Shoulder Press", "Shoulder Press", "Extensión Tríceps con barra", "Skull crushers con cuerda"],
  "Día 2": ["Remo sentado", "Chest-supported Low Row", "Martillo Bíceps", "Curls Cable", "Bíceps Curl"],
  "Día 3": ["Leg Extension", "Seated Leg Curl", "Hip Abduction", "Prensa Inclinada"],
  "Día 4": ["Pectoral Fly", "Hammer Chest Press", "Skull crushers con cuerda", "Extensión Tríceps con barra"],
  "Día 5": ["Remo sentado", "Chest-supported Low Row", "Bíceps Curl", "Martillo Bíceps"],
  "Día 6": ["Peso muerto rumano", "Prensa Inclinada", "Leg Extension", "Seated Leg Curl", "Hip Abduction"]
};

export default function Page() {
  const [selectedDay, setSelectedDay] = useState("Día 1");
  const [progress, setProgress] = useState({});

  const handleChange = (exercise, week, value) => {
    setProgress(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [exercise]: {
          ...(prev[selectedDay]?.[exercise] || {}),
          [week]: value
        }
      }
    }));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Seguimiento de Rutina</h1>
      <div className="flex flex-wrap gap-2">
        {Object.keys(routine).map(day => (
          <button key={day} onClick={() => setSelectedDay(day)} className={\`px-4 py-2 rounded \${selectedDay === day ? 'bg-blue-500 text-white' : 'border border-gray-400'}\`}>{day}</button>
        ))}
      </div>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-lg font-semibold">{selectedDay}</h2>
        {routine[selectedDay].map(exercise => (
          <div key={exercise} className="space-y-2">
            <div className="font-medium">{exercise}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(week => (
                <input
                  key={week}
                  className="border p-2 rounded"
                  placeholder={`Semana ${week}`}
                  value={(progress[selectedDay]?.[exercise]?.[week] || '')}
                  onChange={(e) => handleChange(exercise, week, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}