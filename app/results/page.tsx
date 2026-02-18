'use client';
import React, { useState, useEffect, useRef } from 'react';
import { buildPersonalization } from '../../lib/personalization';
import type { QuizResponses, UserInfo, PersonalizationResult } from '../../lib/quiz-types';

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────────────────
function CountdownTimer({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = expiresAt.getTime() - Date.now();
      setTimeLeft(Math.max(0, diff));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const expired = timeLeft === 0;

  if (expired) {
    return (
      <div style={{ background: '#f3f4f6', borderRadius: 8, padding: '12px 20px', display: 'inline-block' }}>
        <span style={{ fontSize: 14, color: '#6b7280' }}>Quiz bonus expired. Use code <strong>SLEEP15</strong> for 15% off.</span>
      </div>
    );
  }

  return (
    <div className="timer-block">
      <span style={{ fontSize: 14, color: '#92400e', marginRight: 8 }}>⏰ Your $10 bonus expires in:</span>
      <span className="timer-digits">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

// ─── VALUE STACK DISPLAY ──────────────────────────────────────────────────────
function PriceStack({ bundle }: { bundle: PersonalizationResult['bundle'] }) {
  const configs = {
    starter: {
      items: [{ name: 'CADENCE Calm+Rest (1 Bottle)', price: 49.99 }],
      subscribeDiscount: 10.00,
      quizBonus: 10.00,
    },
    sleep_only: {
      items: [{ name: 'CADENCE Calm+Rest (2 Bottles, 60-day supply)', price: 59.98 }],
      subscribeDiscount: 12.00,
      quizBonus: 10.00,
    },
    stress_sleep: {
      items: [
        { name: 'CADENCE Calm+Rest (2 Bottles)', price: 59.98 },
        { name: 'Magnesium Glycinate Powder (30 servings)', price: 24.99 },
      ],
      subscribeDiscount: 17.00,
      quizBonus: 10.00,
    },
    severe_stress: {
      items: [
        { name: 'CADENCE Calm+Rest (PM Support)', price: 49.99 },
        { name: 'Magnesium Glycinate Powder', price: 24.99 },
        { name: 'Ashwagandha Tincture (optional — AM support)', price: 34.99 },
      ],
      subscribeDiscount: 24.00,
      quizBonus: 15.00,
    },
  };

  const config = configs[bundle] ?? configs.sleep_only;
  const subtotal = config.items.reduce((s, i) => s + i.price, 0);
  const total = subtotal - config.subscribeDiscount - config.quizBonus;
  const savings = config.subscribeDiscount + config.quizBonus;
  const pct = Math.round((savings / subtotal) * 100);

  return (
    <div className="price-stack">
      <div style={{ marginBottom: 16 }}>
        {config.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 15 }}>
            <span style={{ color: '#374151' }}>✅ {item.name}</span>
            <span style={{ fontWeight: 600, color: '#111827' }}>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #b7dece', paddingTop: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: '#6b7280' }}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: '#16a34a' }}>
          <span>Subscribe & Save (20%)</span>
          <span>-${config.subscribeDiscount.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: '#16a34a' }}>
          <span>Quiz Bonus (QUIZ10)</span>
          <span>-${config.quizBonus.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: '#16a34a' }}>
          <span>Shipping</span>
          <span>FREE</span>
        </div>
      </div>
      <div style={{ borderTop: '2px solid #345248', paddingTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800 }}>
          <span style={{ color: '#111827' }}>Your Total</span>
          <span style={{ color: '#345248' }}>${total.toFixed(2)}</span>
        </div>
        <div style={{ textAlign: 'right', marginTop: 4 }}>
          <span style={{ background: '#dcfce7', color: '#16a34a', borderRadius: 4, padding: '2px 10px', fontSize: 13, fontWeight: 700 }}>
            🎉 You Save ${savings.toFixed(2)} ({pct}%)
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { feature: 'How it works', melatonin: 'Sedative (forces sleep)', calm: 'Regulates stress naturally' },
    { feature: 'Morning grogginess', melatonin: 'Common', calm: 'None' },
    { feature: 'Dependency risk', melatonin: "Body stops making its own", calm: 'Non-habit forming' },
    { feature: 'Addresses root cause', melatonin: 'No (masks symptom)', calm: 'Yes (cortisol dysregulation)' },
    { feature: 'Daytime benefits', melatonin: 'None', calm: 'Better stress resilience' },
  ];

  return (
    <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
      <table className="compare-table">
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ textAlign: 'left', color: '#6b7280' }}>Feature</th>
            <th style={{ background: '#fee2e2', color: '#dc2626', textAlign: 'center' }}>Melatonin</th>
            <th style={{ background: '#e8f4ef', color: '#345248', textAlign: 'center' }}>CADENCE Calm+Rest</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 500, color: '#374151' }}>{r.feature}</td>
              <td style={{ textAlign: 'center', color: '#dc2626' }}>✗ {r.melatonin}</td>
              <td style={{ textAlign: 'center', color: '#345248' }}>✓ {r.calm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN RESULTS PAGE ────────────────────────────────────────────────────────
export default function ResultsPage() {
  const [personalization, setPersonalization] = useState<PersonalizationResult | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [subscribeSelected, setSubscribeSelected] = useState(true);
  const [addedAshwagandha, setAddedAshwagandha] = useState(false);
  const [copied, setCopied] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const rawResponses = sessionStorage.getItem('quiz_responses');
      const rawUser = sessionStorage.getItem('user_info');
      const completedAt = sessionStorage.getItem('quiz_completed_at');

      const responses: QuizResponses = rawResponses ? JSON.parse(rawResponses) : {};
      const user: UserInfo = rawUser ? JSON.parse(rawUser) : { name: 'Friend', email: '', optIn: false };

      setUserInfo(user);

      const result = buildPersonalization(responses, user.name);
      setPersonalization(result);

      const completedDate = completedAt ? new Date(completedAt) : new Date();
      const expires = new Date(completedDate.getTime() + 60 * 60 * 1000); // 60 minutes
      setExpiresAt(expires);
    } catch (e) {
      // Demo mode if no session data
      const demoResult = buildPersonalization(
        {
          q1_sleep_quality: 'hard_fall',
          q2_sleep_barriers: ['racing_thoughts', 'anxiety'],
          q3_wake_up_experience: ['groggy', 'tired'],
          q4_emotional_baseline: ['stressed', 'racing_mind'],
          q5_stress_triggers: ['work', 'overthinking'],
          q6_stress_management: ['exercise', 'nothing_works'],
          q7_symptoms: ['racing_thoughts', 'muscle_tension'],
          q8_sleep_goals: ['fall_faster', 'deeper_sleep', 'reduce_anxiety'],
          q9_stress_goals: ['calmer', 'clear_thinking', 'sleep_impact'],
          q10_previous_attempts: ['melatonin', 'tried_a_lot'],
          q11_hardest_time: ['bedtime', 'evening'],
          q12_age: '35-44',
          q12_gender: 'female',
          q12_hormonal: ['none'],
        },
        'Sarah'
      );
      setPersonalization(demoResult);
      setUserInfo({ name: 'Sarah', email: '', optIn: false });
      setExpiresAt(new Date(Date.now() + 60 * 60 * 1000));
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('QUIZ10').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCheckout = () => {
    window.location.href = `https://evolance.com/products/cadence-calm-rest?discount=QUIZ10`;
  };

  if (!personalization || !userInfo || !expiresAt) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#345248' }}>Building your personalized protocol...</p>
        </div>
      </main>
    );
  }

  const isSevere = personalization.bundle === 'severe_stress';

  return (
    <main style={{ background: '#fff', overflowX: 'hidden' }}>
      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{ borderBottom: '1px solid #e5e7eb', padding: '14px 0', background: '#fff', position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontFamily: 'Georgia, serif', fontWeight: 600, color: '#345248' }}>CADENCE</span>
          <div style={{ textAlign: 'right' }}>
            <CountdownTimer expiresAt={expiresAt} />
          </div>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #e8f4ef 0%, #f0ebf8 100%)', padding: '56px 0 48px' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          {personalization.hormonalWarning && (
            <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 10, padding: '14px 20px', marginBottom: 24, fontSize: 14, color: '#92400e', lineHeight: 1.6 }}>
              {personalization.hormonalWarning}
            </div>
          )}
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: 16, lineHeight: 1.25 }}>
            {personalization.headline}
          </h1>
          <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.7, marginBottom: 24 }}>
            {personalization.subheadline
              .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}
          </p>

          {/* Ingredient highlights */}
          {personalization.symptomHighlights.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {personalization.symptomHighlights.map((h, i) => (
                <div key={i} className="ingredient-pill">{h}</div>
              ))}
            </div>
          )}

          {/* Bundle name badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#345248', color: '#fff', padding: '8px 20px', borderRadius: 999, marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>🎯 {personalization.bundleName}</span>
          </div>
        </div>
      </section>

      {/* ─── EXPERT MESSAGE ──────────────────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <div style={{ background: '#f9fafb', borderRadius: 16, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e8f4ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {personalization.primaryIssue === 'sleep_onset' || personalization.primaryIssue === 'sleep_maintenance' ? '🌙' : personalization.primaryIssue === 'poor_quality' ? '😴' : '🧘'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{personalization.expertName}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{personalization.expertRole}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {personalization.expertMessage}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCOUNT CODE ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 0 48px', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <div style={{ background: '#345248', borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#b7dece', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Quiz Bonus Code</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>QUIZ10</div>
              <div style={{ fontSize: 13, color: '#b7dece' }}>$10 off your first order · Valid 30 days</div>
            </div>
            <button
              onClick={handleCopyCode}
              style={{ background: '#fff', color: '#345248', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Code'}
            </button>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT + PROTOCOL ─────────────────────────────────────────── */}
      <section style={{ padding: '0 0 64px', background: '#F5F5F5' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <div style={{ paddingTop: 48, marginBottom: 32 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: 8 }}>
              Your Protocol Includes
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>Pre-selected based on your quiz answers</p>
          </div>

          {/* Primary product — CADENCE Calm+Rest */}
          <div className="product-card featured" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ width: 100, height: 100, background: '#e8f4ef', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>
                💊
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'inline-flex', marginBottom: 4 }}>
                  <span style={{ background: '#e8f4ef', color: '#345248', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Added to Protocol</span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: '#111827', margin: '4px 0 4px' }}>CADENCE Calm+Rest</h3>
                <p style={{ fontSize: 14, color: '#6b7280' }}>60 capsules · 30-day supply · Affron® + Chelamax® + L-Theanine</p>
              </div>
            </div>

            {/* Why this for you */}
            <div style={{ background: '#f0f7f4', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#345248', marginBottom: 12 }}>Why This Works For You:</h4>
              {[
                {
                  emoji: '🧠',
                  name: 'L-Theanine (200mg)',
                  benefit: 'Promotes alpha brain wave activity within 30–60 min, quieting mental chatter without sedation.',
                },
                {
                  emoji: '🌸',
                  name: 'Affron® Saffron (28mg)',
                  benefit: 'Clinically shown to support healthy cortisol levels, helping your body shift from high-alert to rest mode.†',
                },
                {
                  emoji: '⚡',
                  name: 'Chelamax® Magnesium (200mg)',
                  benefit: 'Most bioavailable form of magnesium — supports muscle relaxation and nervous system calm overnight.',
                },
              ].map((ing, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{ing.emoji}</span>
                  <div>
                    <span style={{ fontWeight: 600, color: '#111827' }}>{ing.name}</span>{' '}
                    <span style={{ color: '#4b5563' }}>{ing.benefit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dosing */}
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 6 }}>⏰ Your Dosing Protocol</h4>
              <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.6 }}>{personalization.dosingInstructions}</p>
              <p style={{ fontSize: 12, color: '#92400e', marginTop: 6 }}>
                Best time for you: <strong>{personalization.dosageTime}</strong>
              </p>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: 8 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 10 }}>📅 What to Expect</h4>
              {[
                ['Week 1–2', 'Notice easier sleep onset and improved falling back asleep'],
                ['Week 2–3', 'Stress resilience improves, fewer nighttime awakenings'],
                ['Week 4+', 'Consistent sleep quality, clearer mornings, better daily calm'],
              ].map(([week, desc], i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 14 }}>
                  <span style={{ fontWeight: 700, color: '#345248', minWidth: 80, flexShrink: 0 }}>{week}</span>
                  <span style={{ color: '#4b5563', lineHeight: 1.5 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Magnesium Powder (stress_sleep or severe_stress) */}
          {(personalization.bundle === 'stress_sleep' || personalization.bundle === 'severe_stress') && (
            <div className="product-card" style={{ marginBottom: 20, opacity: 0.95 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 100, height: 100, background: '#f0ebf8', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>
                  🥛
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <span style={{ background: '#e8f4ef', color: '#345248', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Added to Protocol</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '8px 0 4px' }}>Magnesium Glycinate Powder</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>30 servings · Extra magnesium support for high-stress days</p>
                  <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}>
                    Completes the formula — additional magnesium for days when stress depletes it faster. Mix 1 scoop in warm water before bed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ashwagandha (severe stress — optional) */}
          {isSevere && (
            <div className="product-card" style={{ marginBottom: 20, opacity: addedAshwagandha ? 1 : 0.8 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
                <div style={{ width: 100, height: 100, background: '#fef3c7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>
                  🌿
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <span style={{ background: addedAshwagandha ? '#e8f4ef' : '#f3f4f6', color: addedAshwagandha ? '#345248' : '#6b7280', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {addedAshwagandha ? '✅ Added' : '○ Optional — Not Added'}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '8px 0 4px' }}>Ashwagandha Tincture</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>Daytime stress support · KSM-66® · Take in morning</p>
                  <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}>
                    Your quiz revealed all-day chronic stress. Calm+Rest handles nighttime recovery — Ashwagandha provides daytime resilience (AM + PM coverage).
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAddedAshwagandha(!addedAshwagandha)}
                style={{
                  background: addedAshwagandha ? '#fee2e2' : '#345248',
                  color: addedAshwagandha ? '#dc2626' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                {addedAshwagandha ? '✗ Remove from Protocol' : '+ Add Ashwagandha to Protocol'}
              </button>
            </div>
          )}

          {/* Switcher copy */}
          {personalization.switcherCopy && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, marginBottom: 24, fontSize: 14, color: '#78350f', lineHeight: 1.7 }}>
              <strong style={{ display: 'block', marginBottom: 8 }}>Why This Works Differently</strong>
              {personalization.switcherCopy}
            </div>
          )}

          {/* Comparison table for melatonin switchers */}
          {personalization.comparisonTable && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Melatonin vs. CADENCE Calm+Rest</h3>
              <ComparisonTable />
            </div>
          )}
        </div>
      </section>

      {/* ─── PRICE + CHECKOUT ────────────────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          {/* Subscription toggle */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Choose Your Delivery Option</h3>
            {[
              { id: true, label: 'Subscribe & Save — Save 20% + Free Shipping', badge: 'RECOMMENDED', sub: 'Delivered every 30 days · Pause, modify, or cancel anytime' },
              { id: false, label: 'One-time purchase (full price + shipping)', badge: '', sub: '' },
            ].map((opt) => (
              <div
                key={String(opt.id)}
                onClick={() => setSubscribeSelected(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 18px',
                  border: `2px solid ${subscribeSelected === opt.id ? '#345248' : '#e5e7eb'}`,
                  borderRadius: 10,
                  marginBottom: 10,
                  cursor: 'pointer',
                  background: subscribeSelected === opt.id ? '#f0f7f4' : '#fff',
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${subscribeSelected === opt.id ? '#345248' : '#d1d5db'}`, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: subscribeSelected === opt.id ? '#345248' : 'transparent' }}>
                  {subscribeSelected === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#111827' }}>
                    {opt.label}
                    {opt.badge && <span style={{ marginLeft: 8, background: '#345248', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>{opt.badge}</span>}
                  </div>
                  {opt.sub && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{opt.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Price stack */}
          <div style={{ marginBottom: 24 }}>
            <PriceStack bundle={personalization.bundle} />
          </div>

          {/* Checkout button */}
          <button
            className="btn-primary"
            onClick={handleCheckout}
            style={{ fontSize: 18, minHeight: 60, marginBottom: 12 }}
          >
            Secure Checkout — Claim Your $10 Bonus →
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
            {['🔒 SSL Encrypted', '📦 Free Shipping on Subscriptions', '🛡️ 30-Day Guarantee'].map((b, i) => (
              <span key={i} style={{ fontSize: 13, color: '#6b7280' }}>{b}</span>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, padding: '16px', background: '#f9fafb', borderRadius: 10 }}>
            {['✅ Third-Party Tested', '✅ Non-GMO', '✅ Gluten-Free', '✅ Vegan', '✅ Made in USA'].map((b, i) => (
              <span key={i} style={{ fontSize: 12, color: '#374151' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 0 64px', background: '#F5F5F5' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: 24, textAlign: 'center' }}>
            People With Your Profile Are Seeing Results
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb' }}>
            <div className="stars" style={{ fontSize: 18, marginBottom: 12 }}>★★★★★</div>
            <blockquote style={{ fontSize: 16, lineHeight: 1.75, color: '#374151', fontStyle: 'italic', margin: '0 0 16px' }}>
              "{personalization.primaryTestimonial.quote}"
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e8f4ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😊</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>— {personalization.primaryTestimonial.author}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{personalization.primaryTestimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 0 64px', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            Common Questions
          </h2>
          {[
            { q: "How long will 2 bottles last?", a: "Each bottle contains 60 capsules. At 2 caps/day, 2 bottles = 60-day supply (2 months)." },
            { q: "Can I take this with other supplements?", a: "Yes, safe with most supplements. If on prescription medications, consult your doctor first." },
            { q: "When will I see results?", a: "Most people notice easier sleep onset within 7-10 days. Stress resilience and consistent sleep quality improve over 3-4 weeks." },
            { q: "What's your return policy?", a: "30-day satisfaction guarantee. If you're not sleeping better and feeling calmer, contact us for a full refund — no return shipping required, no questions asked." },
            { q: "Can I change my subscription frequency?", a: "Absolutely. Log into your account anytime to adjust delivery, skip a shipment, or cancel. No fees, no hassle." },
            { q: "Is this safe for long-term use?", a: "Yes. Unlike prescription sleep medications, Calm+Rest is non-habit forming and safe for ongoing use." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 6 }}>{item.q}</div>
              <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0', background: '#345248' }}>
        <div className="container-custom" style={{ maxWidth: 600, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Ready to Sleep Better and Stress Less?
          </h2>
          <p style={{ fontSize: 16, color: '#b7dece', marginBottom: 28 }}>
            {userInfo.name}, your personalized protocol is waiting. Claim your $10 Quiz Bonus before the timer expires.
          </p>
          <button
            onClick={handleCheckout}
            style={{ background: '#fff', color: '#345248', border: 'none', borderRadius: 8, minHeight: 60, fontSize: 18, fontWeight: 700, cursor: 'pointer', width: '100%', maxWidth: 400, margin: '0 auto', display: 'block', padding: '0 24px' }}
          >
            Claim My Protocol → Save $10
          </button>
          <p style={{ marginTop: 12, fontSize: 13, color: '#b7dece' }}>
            🛡️ 30-day money-back guarantee · Free shipping on subscriptions
          </p>
        </div>
      </section>

      {/* ─── DISCLAIMER ──────────────────────────────────────────────────── */}
      <div style={{ background: '#1a2c25', padding: '24px 0' }}>
        <div className="container-custom">
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, textAlign: 'center' }}>
            †These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Consult your healthcare provider before use if pregnant, nursing, or taking prescription medications.
          </p>
        </div>
      </div>

      {/* ─── MOBILE STICKY CTA ───────────────────────────────────────────── */}
      <div className="mobile-sticky-cta">
        <button className="btn-primary" onClick={handleCheckout} style={{ fontSize: 16, minHeight: 52 }}>
          Claim $10 Off — Checkout →
        </button>
      </div>
    </main>
  );
}
