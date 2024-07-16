import { useState, useEffect } from 'react';

export default function Home() {
  const [flashcard, setFlashcard] = useState({ question: '', answer: '' });
  const [response, setResponse] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [message, setMessage] = useState('');

  const generateMultiplicationQuestion = () => {
    const a = Math.floor(Math.random() * 30) + 1;
    const b = Math.floor(Math.random() * 30) + 1;
    setFlashcard({ question: `${a} * ${b}`, answer: (a * b).toString() });
    setStartTime(new Date());
  };

  useEffect(() => {
    generateMultiplicationQuestion();
  }, []);

  const handleSubmit = async () => {
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    setTimeTaken(duration);

    if (response === flashcard.answer) {
      setCorrectCount(correctCount + 1);
      setMessage('Correct answer!');

      await fetch('/api/save-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: flashcard.question,
          timeTaken: duration,
        }),
      });

      if (correctCount >= 1) {
        await fetch('/api/update-time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: flashcard.question,
            timeTaken: duration,
          }),
        });
      }
    } else {
      setCorrectCount(0);
      setMessage('Wrong answer! The correct answer was ' + flashcard.answer);
    }

    generateMultiplicationQuestion();
    setResponse('');
  };

  return (
    <div>
      <h1>Flashcard</h1>
      <p>{flashcard.question}</p>
      <input
        type="text"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {timeTaken && <p>Time taken: {timeTaken}s</p>}
      <p>Correct streak: {correctCount}</p>
      {message && <p>{message}</p>}
      <a href="/times">View times</a>
    </div>
  );
}
