import { useEffect, useState } from 'react';
import type { Question } from '../App';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, questions, answers, onRestart }: QuizResultsProps) {
  const [showResults, setShowResults] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showResults) return;

    let current = 0;
    const increment = score / 20;
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [showResults, score]);

  const getRank = () => {
    if (percentage === 100) return { title: 'MISSION COMMANDER', emoji: '🚀' };
    if (percentage >= 80) return { title: 'SENIOR ASTRONAUT', emoji: '👨‍🚀' };
    if (percentage >= 60) return { title: 'SPACE CADET', emoji: '🛸' };
    if (percentage >= 40) return { title: 'TRAINEE', emoji: '🌙' };
    return { title: 'GROUND CONTROL', emoji: '🌍' };
  };

  const rank = getRank();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="crt-frame glow-amber animate-flicker"
        style={{
          opacity: showResults ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        <div className="terminal-header flex items-center justify-between">
          <span>MISSION COMPLETE</span>
          <span className="text-xs opacity-70">FINAL REPORT</span>
        </div>

        <div className="p-4 md:p-8">
          <div className="text-center mb-8">
            <div className="text-4xl md:text-6xl mb-4">{rank.emoji}</div>
            <div className="text-amber/60 text-xs tracking-widest uppercase mb-2">
              RANK ACHIEVED
            </div>
            <h2 className="font-['Space_Mono'] text-xl md:text-3xl font-bold text-glow-amber">
              {rank.title}
            </h2>
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <div className="score-display text-glow-amber">
                {displayScore}
              </div>
              <div className="text-xs text-amber/60 tracking-widest">CORRECT</div>
            </div>
            <div className="text-3xl md:text-5xl text-amber/30">/</div>
            <div className="text-center">
              <div className="score-display text-amber/50">
                {totalQuestions}
              </div>
              <div className="text-xs text-amber/60 tracking-widest">TOTAL</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs mb-2 text-amber/60">
              <span>ACCURACY</span>
              <span>{percentage}%</span>
            </div>
            <div className="h-3 bg-amber/20 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${
                  percentage >= 70 ? 'bg-green' : percentage >= 40 ? 'bg-amber' : 'bg-red'
                }`}
                style={{
                  width: showResults ? `${percentage}%` : '0%',
                  boxShadow: percentage >= 70
                    ? '0 0 10px var(--green)'
                    : percentage >= 40
                    ? '0 0 10px var(--amber)'
                    : '0 0 10px var(--red)'
                }}
              />
            </div>
          </div>

          <div className="border border-amber/30 mb-8 max-h-48 overflow-y-auto">
            <div className="text-xs text-amber/60 px-3 py-2 border-b border-amber/20 sticky top-0 bg-space-black">
              MISSION LOG
            </div>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="flex items-center gap-3 px-3 py-2 border-b border-amber/10 last:border-0 text-xs md:text-sm"
                >
                  <span className={`w-5 h-5 flex items-center justify-center ${isCorrect ? 'text-green' : 'text-red'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <span className="text-amber/40">Q{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 truncate text-amber/80">{q.question}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={onRestart}
              className="group relative px-8 py-4 md:px-12 md:py-5 border-2 border-amber bg-transparent text-amber font-bold tracking-widest uppercase text-sm md:text-base transition-all duration-200 hover:bg-amber hover:text-space-black"
            >
              <span className="relative z-10 flex items-center gap-3 justify-center">
                <svg
                  className="w-5 h-5 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                NEW MISSION
              </span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-amber/40">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green rounded-full animate-pulse"></span>
              TRANSMISSION COMPLETE — {new Date().toISOString().slice(0, 10)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
