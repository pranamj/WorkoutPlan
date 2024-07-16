// pages/api/workouts/[id].js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM workouts WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting workout:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else if (req.method === 'POST') {
    const { action } = req.body;

    if (action === 'complete') {
      try {
        await pool.query(
          'INSERT INTO completed_workouts (workout_id) VALUES ($1)', 
          [id]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error('Error completing workout:', error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
    } else if (action === 'skip') {
      try {
        await pool.query(
          'INSERT INTO skipped_workouts (workout_id) VALUES ($1)',
          [id]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error('Error skipping workout:', error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
