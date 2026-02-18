'use client';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS } from '../../lib/quiz-questions';
import type { QuizResponses, UserInfo } from '../../lib/quiz-types';

const TOTAL_STEPS = QUIZ_QUESTIONS.length; // includes age + gender + conditional hormonal

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: '#6b7280' }}>
        <span>Question {current} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface QuestionCardProps {
  question: (typeof QUIZ_QUESTIONS)[number];
  selected: string | string[];
  onChange: (val: string | string[]) => void;
  onNext: () => void;
}

function QuestionCard({ question, selected, onChange, onNext }: QuestionCardProps) {
  const isMulti = question.type === 'multi' || question.type === 'multi-max3';
  const maxSelect = question.type === 'multi-max3' ? 3 : undefined;
  const selectedArr = Array.isArray(selected) ? selected : (selected ? [selected] : []);

  const handleSelect = (optId: string) => {
    if (!isMulti) {
      onChange(optId);
    } else {
      const current = selectedArr;
      if (current.includes(optId)) {
        onChange(current.filter(s => s !== optId));
      } else {
        if (maxSelect && current.length >= maxSelect) return; // max reached
        onChange([...current, optId]);
      }
    }
  };

  const canProceed = isMulti ? selectedArr.length > 0 : !!selected;

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: question.hint ? 8 : 24, lineHeight: 1.3 }}>
        {question.text}
      </h2>
      {question.hint && (
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>{question.hint}</p>
      )}
      {maxSelect && (
        <p style={{ fontSize: 13, color: '#B6A8CC', fontWeight: 600, marginBottom: 16 }}>
          {selectedArr.length}/{maxSelect} selected
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {question.options.map((opt) => {
          const isSelected = selectedArr.includes(opt.id);
          const isMaxed = maxSelect ? (selectedArr.length >= maxSelect && !isSelected) : false;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isMaxed}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                border: `2px solid ${isSelected ? '#345248' : '#e5e7eb'}`,
                borderRadius: 12,
                cursor: isMaxed ? 'not-allowed' : 'pointer',
                background: isSelected ? '#e8f4ef' : '#fff',
                textAlign: 'left',
                width: '100%',
                fontSize: 15,
                color: isMaxed ? '#9ca3af' : '#2C2C2C',
                transition: 'all 0.15s ease',
                opacity: isMaxed ? 0.5 : 1,
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: isMulti ? 4 : '50%',
                border: `2px solid ${isSelected ? '#345248' : '#d1d5db'}`,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isSelected ? '#345248' : 'transparent',
                transition: 'all 0.15s ease',
              }}>
                {isSelected && <CheckIcon />}
              </div>
              {opt.emoji && <span style={{ fontSize: 18, lineHeight: 1 }}>{opt.emoji}</span>}
              <span style={{ flex: 1, fontWeight: isSelected ? 500 : 400 }}>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!isMulti ? null : (
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canProceed}
          style={{ opacity: canProceed ? 1 : 0.5, cursor: canProceed ? 'pointer' : 'not-allowed' }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}

function EmailGate({ onSubmit }: { onSubmit: (info: UserInfo) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    onSubmit({ name: name.trim() || 'Friend', email: email.trim(), optIn });
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          Your Personalized Assessment Is Ready
        </h2>
        <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6 }}>
          Enter your email to unlock your results and get your <strong>$10 discount code</strong>.
        </p>
      </div>

      <div className="email-gate">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              First Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your first name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
                outline: 'none',
                background: '#fff',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => (e.target.style.borderColor = '#345248')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 16,
                outline: 'none',
                background: '#fff',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => (e.target.style.borderColor = '#345248')}
              onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={optIn}
              onChange={e => setOptIn(e.target.checked)}
              style={{ marginTop: 2, accentColor: '#345248' }}
            />
            <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
              Send me sleep tips and exclusive offers (can unsubscribe anytime)
            </span>
          </label>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#dc2626' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !email}
            style={{ fontSize: 17, minHeight: 56, opacity: (loading || !email) ? 0.7 : 1, cursor: (loading || !email) ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Processing...' : 'See My Results + Get $10 Off →'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
          {['🔒 Your data is private', '💌 No spam, ever'].map((b, i) => (
            <span key={i} style={{ fontSize: 12, color: '#6b7280' }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<QuizResponses>>({});
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Filter questions — skip q12_hormonal if not female
  const visibleQuestions = QUIZ_QUESTIONS.filter(q => {
    if (q.femaleOnly) {
      return (responses as Record<string, string>).q12_gender === 'female';
    }
    return true;
  });

  const currentQuestion = visibleQuestions[currentIndex];
  const totalVisible = visibleQuestions.length;

  const currentValue = currentQuestion
    ? (responses[currentQuestion.id as keyof QuizResponses] as string | string[] | undefined) ?? (
        currentQuestion.type === 'single' ? '' : []
      )
    : '';

  const handleChange = useCallback((val: string | string[]) => {
    if (!currentQuestion) return;
    const qid = currentQuestion.id as keyof QuizResponses;
    setResponses(prev => ({ ...prev, [qid]: val as never }));
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (!currentQuestion) return;
    const qid = currentQuestion.id as keyof QuizResponses;
    const val = responses[qid];
    if (!val || (Array.isArray(val) && val.length === 0)) return;

    if (currentIndex + 1 >= totalVisible) {
      setShowEmailGate(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentQuestion, currentIndex, responses, totalVisible]);

  // Single-select auto-advance
  const handleSingleSelect = useCallback((val: string | string[]) => {
    if (!currentQuestion) return;
    const qid = currentQuestion.id as keyof QuizResponses;
    const singleVal = Array.isArray(val) ? val[0] : val;
    const updated = { ...responses, [qid]: singleVal as never };
    setResponses(updated);

    // Auto advance after brief delay
    setTimeout(() => {
      if (currentIndex + 1 >= totalVisible) {
        setShowEmailGate(true);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
  }, [currentQuestion, currentIndex, responses, totalVisible]);

  const handleEmailSubmit = async (userInfo: UserInfo) => {
    // Store in sessionStorage for results page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_responses', JSON.stringify(responses));
      sessionStorage.setItem('user_info', JSON.stringify(userInfo));
      sessionStorage.setItem('quiz_completed_at', new Date().toISOString());
    }

    // Send to Klaviyo API
    try {
      await fetch('/api/klaviyo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, userInfo }),
      });
    } catch {
      // Non-blocking — proceed even if Klaviyo fails
    }

    router.push('/results');
  };

  const handleBack = () => {
    if (showEmailGate) {
      setShowEmailGate(false);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (showEmailGate) {
    return (
      <main style={{ minHeight: '100vh', background: '#fff', padding: '24px 0 80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button onClick={handleBack} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6b7280' }}>
                ← Back
              </button>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Almost done!</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: '100%' }} />
            </div>
          </div>
          <EmailGate onSubmit={handleEmailSubmit} />
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24 }}>Processing your results...</h2>
        </div>
      </main>
    );
  }

  const isSingle = currentQuestion.type === 'single';

  return (
    <main style={{ minHeight: '100vh', background: '#fff', padding: '24px 0 80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 0', marginBottom: 32 }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 18, fontFamily: 'Georgia, serif', fontWeight: 600, color: '#345248' }}>CADENCE</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>Sleep & Stress Assessment</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <ProgressBar current={currentIndex + 1} total={totalVisible} />
        </div>

        {/* Phase label */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#B6A8CC', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {['', 'Sleep Baseline', 'Stress & Lifestyle', 'Symptoms & Goals', 'Current Solutions', 'About You'][currentQuestion.phase] || ''}
          </span>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          selected={currentValue as string | string[]}
          onChange={isSingle ? handleSingleSelect : handleChange}
          onNext={handleNext}
        />

        {/* Back button */}
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280', marginTop: 16, padding: '8px 0' }}
          >
            ← Back
          </button>
        )}

        {/* Trust footer */}
        <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
          🔒 Your answers are private and used only for personalization
        </div>
      </div>
    </main>
  );
}
