import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, timeTaken } = req.body;

    try {
      // const result = await pool.query(
      //   'INSERT INTO flashcard_times (question, time_taken) VALUES ($1, $2) RETURNING *',
      //   [question, timeTaken]
      // );


      let query = "INSERT INTO flashcard_times (question, time_taken) VALUES ('Sushi Kanth Sushi Kanth', 30)";

      const result = await pool.query(query);

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error saving time:', error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
