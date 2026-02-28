import { useState, useEffect } from 'react';
import { QuizStart } from './components/QuizStart';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { Scanlines } from './components/Scanlines';
import { StarField } from './components/StarField';
import './styles.css';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  fact: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctIndex: 1,
    fact: "Jupiter is so large that all other planets in our solar system could fit inside it."
  },
  {
    id: 2,
    question: "How long does it take light from the Sun to reach Earth?",
    options: ["8 seconds", "8 minutes", "8 hours", "8 days"],
    correctIndex: 1,
    fact: "Light travels at 299,792 km/s, covering the 150 million km to Earth in about 8 minutes and 20 seconds."
  },
  {
    id: 3,
    question: "What was the first human-made object to land on the Moon?",
    options: ["Apollo 11", "Luna 2", "Sputnik 1", "Ranger 7"],
    correctIndex: 1,
    fact: "Luna 2, a Soviet spacecraft, impacted the Moon on September 14, 1959."
  },
  {
    id: 4,
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctIndex: 1,
    fact: "Venus has a thick atmosphere that traps heat, making it hotter than Mercury despite being farther from the Sun."
  },
  {
    id: 5,
    question: "How many moons does Mars have?",
    options: ["0", "1", "2", "4"],
    correctIndex: 2,
    fact: "Mars has two small moons: Phobos and Deimos, named after the Greek gods of fear and terror."
  },
  {
    id: 6,
    question: "What year did humans first walk on the Moon?",
    options: ["1965", "1967", "1969", "1971"],
    correctIndex: 2,
    fact: "Neil Armstrong and Buzz Aldrin landed on July 20, 1969, during the Apollo 11 mission."
  },
  {
    id: 7,
    question: "What is the closest star to our solar system?",
    options: ["Alpha Centauri", "Proxima Centauri", "Barnard's Star", "Sirius"],
    correctIndex: 1,
    fact: "Proxima Centauri is about 4.24 light-years away and is part of the Alpha Centauri star system."
  },
  {
    id: 8,
    question: "What is the Great Red Spot on Jupiter?",
    options: ["A volcano", "A storm", "A crater", "A mountain"],
    correctIndex: 1,
    fact: "The Great Red Spot is a giant storm that has been raging for at least 400 years and is larger than Earth."
  },
  {
    id: 9,
    question: "Which planet has the most known moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctIndex: 1,
    fact: "As of 2023, Saturn has 146 known moons, surpassing Jupiter's 95 confirmed moons."
  },
  {
    id: 10,
    question: "What is a light-year a measurement of?",
    options: ["Time", "Distance", "Speed", "Brightness"],
    correctIndex: 1,
    fact: "A light-year is the distance light travels in one year: approximately 9.46 trillion kilometers."
  }
];

type GameState = 'start' | 'playing' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correctIndex;
    if (isCorrect) setScore(s => s + 1);
    setAnswers([...answers, selectedIndex]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setGameState('results');
      }
    }, 2500);
  };

  const restartQuiz = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };

  if (bootSequence) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <Scanlines />
        <div className="text-amber font-mono text-center animate-pulse">
          <div className="text-sm md:text-base mb-2">INITIALIZING SYSTEMS...</div>
          <div className="text-xs opacity-60">MISSION CONTROL ONLINE</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-black relative overflow-hidden flex flex-col">
      <StarField />
      <Scanlines />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 md:p-8">
        {gameState === 'start' && <QuizStart onStart={startQuiz} />}

        {gameState === 'playing' && (
          <QuizQuestion
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            answered={answers.length > currentQuestion}
            selectedAnswer={answers[currentQuestion] ?? null}
          />
        )}

        {gameState === 'results' && (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            questions={questions}
            answers={answers}
            onRestart={restartQuiz}
          />
        )}
      </main>

      <footer className="relative z-10 text-center py-4 px-4">
        <p className="text-xs text-amber/30 font-mono tracking-wide">
          Requested by @brandonn2221 · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
