// components/WorkoutList.js
import React from 'react';

export default function WorkoutList({ workouts, completeWorkout, skipWorkout }) {
  return (
    <div>
      <h2>Today's Workouts</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={workout.id}>
            <div>
              <strong>{workout.day}</strong>: {workout.muscle_group} - {workout.exercise} ({workout.weight} kg, {workout.reps} reps, {workout.sets} sets)
              <button onClick={() => completeWorkout(index)}>Complete</button>
              <button onClick={() => skipWorkout(index)}>Skip</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
