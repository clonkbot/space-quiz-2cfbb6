import { useState, useEffect } from 'react';

interface QuizStartProps {
  onStart: () => void;
}

export function QuizStart({ onStart }: QuizStartProps) {
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'MISSION BRIEFING';

  useEffect(() => {
    const showTimer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showContent) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [showContent]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="crt-frame glow-amber animate-flicker"
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        <div className="terminal-header flex items-center justify-between">
          <span>{typedText}<span className="animate-blink">_</span></span>
          <span className="text-xs opacity-70">HOUSTON CTRL</span>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          <div className="text-center mb-8">
            <h1
              className="font-['Space_Mono'] text-3xl md:text-5xl lg:text-6xl font-bold text-glow-amber mb-4 tracking-tight"
              style={{
                animationDelay: '0.5s'
              }}
            >
              SPACE QUIZ
            </h1>
            <div className="text-amber/60 text-xs md:text-sm tracking-widest uppercase">
              Stellar Knowledge Assessment Protocol
            </div>
          </div>

          <div className="border border-amber/30 p-4 md:p-6 bg-amber/5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-amber/60 text-sm">01.</span>
              <p className="text-sm md:text-base leading-relaxed">
                You will be presented with <span className="text-amber font-bold">10 questions</span> about our universe.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber/60 text-sm">02.</span>
              <p className="text-sm md:text-base leading-relaxed">
                Select the correct answer from four options.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber/60 text-sm">03.</span>
              <p className="text-sm md:text-base leading-relaxed">
                Each correct answer earns <span className="text-green">+1 POINT</span>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber/60 text-sm">04.</span>
              <p className="text-sm md:text-base leading-relaxed">
                Learn fascinating facts after each question.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onStart}
              className="group relative px-8 py-4 md:px-12 md:py-5 border-2 border-amber bg-transparent text-amber font-bold tracking-widest uppercase text-sm md:text-base transition-all duration-200 hover:bg-amber hover:text-space-black animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center gap-3 justify-center">
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                INITIATE MISSION
              </span>
            </button>
          </div>

          <div className="text-center text-xs text-amber/40 pt-4">
            <span className="animate-blink inline-block w-2 h-2 bg-green rounded-full mr-2"></span>
            SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </div>
  );
}
