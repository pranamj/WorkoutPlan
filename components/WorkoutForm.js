// components/WorkoutForm.js
import { useState } from 'react';

export default function WorkoutForm({ addWorkout }) {
  const [formState, setFormState] = useState({
    day: '',
    muscleGroup: '',
    exercise: '',
    weight: '',
    reps: '',
    sets: '',
    targetedAreas: '',
    effectiveness: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(formState);
    setFormState({
      day: '',
      muscleGroup: '',
      exercise: '',
      weight: '',
      reps: '',
      sets: '',
      targetedAreas: '',
      effectiveness: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Workout</h2>
      <label>
        Day:
        <input type="text" name="day" value={formState.day} onChange={handleChange} required />
      </label>
      <label>
        Muscle Group:
        <input type="text" name="muscleGroup" value={formState.muscleGroup} onChange={handleChange} required />
      </label>
      <label>
        Exercise:
        <input type="text" name="exercise" value={formState.exercise} onChange={handleChange} required />
      </label>
      <label>
        Weight:
        <input type="text" name="weight" value={formState.weight} onChange={handleChange} required />
      </label>
      <label>
        Reps:
        <input type="number" name="reps" value={formState.reps} onChange={handleChange} required />
      </label>
      <label>
        Sets:
        <input type="number" name="sets" value={formState.sets} onChange={handleChange} required />
      </label>
      <label>
        Targeted Areas:
        <input type="text" name="targetedAreas" value={formState.targetedAreas} onChange={handleChange} required />
      </label>
      <label>
        Effectiveness:
        <input type="text" name="effectiveness" value={formState.effectiveness} onChange={handleChange} required />
      </label>
      <button type="submit">Add Workout</button>
    </form>
  );
}
