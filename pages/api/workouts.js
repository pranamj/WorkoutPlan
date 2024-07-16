// pages/api/workouts.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const today = new Date().toISOString().split('T')[0];
      const result = await pool.query(`
        SELECT * FROM workouts 
        WHERE day = $1 
        OR id IN (SELECT workout_id FROM skipped_workouts WHERE skipped_at::date = $1)
        ORDER BY id DESC
      `, [today]);
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else if (req.method === 'POST') {
    const { day, muscleGroup, exercise, weight, reps, sets, targetedAreas, effectiveness } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO workouts (day, muscle_group, exercise, weight, reps, sets, targeted_areas, effectiveness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [day, muscleGroup, exercise, weight, reps, sets, targetedAreas, effectiveness]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error adding workout:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else if (req.method === 'PUT') {
    const { id, day, muscleGroup, exercise, weight, reps, sets, targetedAreas, effectiveness } = req.body;
    try {
      const result = await pool.query(
        'UPDATE workouts SET day = $1, muscle_group = $2, exercise = $3, weight = $4, reps = $5, sets = $6, targeted_areas = $7, effectiveness = $8 WHERE id = $9 RETURNING *',
        [day, muscleGroup, exercise, weight, reps, sets, targetedAreas, effectiveness, id]
      );
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating workout:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
