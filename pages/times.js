import { useState, useEffect } from 'react';

export default function Times() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchTimes = async () => {
      const res = await fetch('/api/get-times');
      const data = await res.json();
      if (data.success) {
        setTimes(data.data);
      }
    };

    fetchTimes();
  }, []);

  return (
    <div>
      <h1>Time Taken for Each Problem</h1>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Time Taken (s)</th>
            <th>Answered On</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time.id}>
              <td>{time.question}</td>
              <td>{time.time_taken}</td>
              <td>{new Date(time.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/">Back to Flashcards</a>
      <style jsx>{`
        div {
          padding: 2rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
}
