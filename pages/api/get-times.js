import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM flashcard_times ORDER BY created_at DESC');
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Error fetching times:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
