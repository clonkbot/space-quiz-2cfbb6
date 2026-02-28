import { useState, useEffect } from 'react';
import type { Question } from '../App';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  answered: boolean;
  selectedAnswer: number | null;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  answered,
  selectedAnswer
}: QuizQuestionProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [localSelected, setLocalSelected] = useState<number | null>(null);

  useEffect(() => {
    setShowQuestion(false);
    setShowOptions(false);
    setLocalSelected(null);

    const qTimer = setTimeout(() => setShowQuestion(true), 200);
    const oTimer = setTimeout(() => setShowOptions(true), 500);

    return () => {
      clearTimeout(qTimer);
      clearTimeout(oTimer);
    };
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (localSelected !== null) return;
    setLocalSelected(index);
    onAnswer(index);
  };

  const actualSelected = localSelected ?? selectedAnswer;
  const isAnswered = actualSelected !== null;
  const isCorrect = actualSelected === question.correctIndex;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="crt-frame glow-amber animate-flicker">
        <div className="terminal-header flex items-center justify-between">
          <span>QUESTION {String(questionNumber).padStart(2, '0')}/{String(totalQuestions).padStart(2, '0')}</span>
          <span className="text-xs opacity-70">TRANSMITTING...</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="p-4 md:p-8">
          <div
            className="mb-6 md:mb-8"
            style={{
              opacity: showQuestion ? 1 : 0,
              transform: showQuestion ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s ease'
            }}
          >
            <h2 className="font-['Space_Mono'] text-lg md:text-xl lg:text-2xl font-bold leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              let buttonClass = 'option-button';

              if (isAnswered) {
                if (index === question.correctIndex) {
                  buttonClass += ' correct';
                } else if (index === actualSelected) {
                  buttonClass += ' incorrect';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                  style={{
                    opacity: showOptions ? 1 : 0,
                    transform: showOptions ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease ${index * 0.1}s`
                  }}
                >
                  <span className="flex items-center gap-3 md:gap-4">
                    <span
                      className={`
                        w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 flex-shrink-0
                        ${isAnswered && index === question.correctIndex ? 'border-green bg-green/20' : ''}
                        ${isAnswered && index === actualSelected && index !== question.correctIndex ? 'border-red bg-red/20' : ''}
                        ${!isAnswered ? 'border-current' : ''}
                      `}
                    >
                      {isAnswered && index === question.correctIndex && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {isAnswered && index === actualSelected && index !== question.correctIndex && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {!isAnswered && <span className="font-bold">{letter}</span>}
                    </span>
                    <span className="flex-1">{option}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={`
                mt-6 md:mt-8 p-4 border-l-4 animate-fadeInUp
                ${isCorrect ? 'border-green bg-green/5' : 'border-red bg-red/5'}
              `}
            >
              <div className={`font-bold mb-2 text-sm md:text-base ${isCorrect ? 'text-green text-glow-green' : 'text-red text-glow-red'}`}>
                {isCorrect ? '// CORRECT — EXCELLENT WORK, ASTRONAUT' : '// INCORRECT — MISSION CONTINUES'}
              </div>
              <p className="text-amber/80 text-sm leading-relaxed">
                {question.fact}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between text-xs text-amber/40">
            <span>SIGNAL STRENGTH: ████████░░</span>
            <span className={isAnswered ? (isCorrect ? 'text-green' : 'text-red') : ''}>
              {isAnswered ? (isCorrect ? 'DATA CONFIRMED' : 'DATA LOGGED') : 'AWAITING INPUT'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
