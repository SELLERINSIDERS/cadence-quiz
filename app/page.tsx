'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ marginBottom: 8, ...(open ? { background: '#f9fafb' } : {}) }}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span style={{ fontSize: 20, color: '#6b7280', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
};

export default function LandingPage() {
  return (
    <main style={{ background: '#fff', overflowX: 'hidden' }}>
      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 22, fontFamily: 'Georgia, serif', fontWeight: 600, color: '#345248', letterSpacing: '-0.5px' }}>
            CADENCE
          </span>
          <Link href="/quiz" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ minHeight: 40, padding: '0 20px', fontSize: 14, width: 'auto' }}>
              Take the Quiz →
            </button>
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f7f4 0%, #f8f5fb 100%)',
        padding: '72px 0 64px',
      }}>
        <div className="container-custom" style={{ maxWidth: 680, textAlign: 'center' }}>
          <div style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e8f4ef', padding: '6px 16px', borderRadius: 999 }}>
            <span style={{ fontSize: 13, color: '#345248', fontWeight: 500 }}>✨ Free 3-Minute Assessment</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            Find Your Personalized Stress & Sleep Solution in 3 Minutes
          </h1>
          <p style={{ fontSize: 18, color: '#4b5563', lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            Take our science-backed assessment to discover how clinical-grade ingredients can help you fall asleep faster, stay asleep longer, and handle daily stress with more calm and clarity.
          </p>
          <Link href="/quiz" style={{ textDecoration: 'none', display: 'block', maxWidth: 360, margin: '0 auto' }}>
            <button className="btn-primary" style={{ fontSize: 18, minHeight: 60 }}>
              Start Your Free Assessment →
            </button>
          </Link>
          <p style={{ marginTop: 12, fontSize: 14, color: '#6b7280' }}>
            Takes 3 minutes · Get $10 off your first order · No credit card required
          </p>
        </div>
      </section>

      {/* ─── VALUE STACK ──────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', marginBottom: 12, color: '#111827' }}>
            What You Get When You Take This Quiz
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 16, marginBottom: 40 }}>Three powerful benefits, completely free</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 32 }}>
            {[
              {
                emoji: '🎯',
                title: 'Personalized Sleep & Stress Analysis',
                desc: 'Get supplement recommendations tailored to your unique stress triggers, sleep patterns, and lifestyle — not generic advice.',
                value: '$49 value — Free',
              },
              {
                emoji: '🧪',
                title: 'Science-Backed Ingredient Matching',
                desc: 'Discover which clinically-studied ingredients (Affron® saffron, Chelamax® magnesium, L-Theanine) match your specific needs.',
                value: 'Expert consultation included',
              },
              {
                emoji: '💰',
                title: 'Instant $10 Discount Code',
                desc: 'Complete the quiz and get an immediate discount on your first order. No strings attached, no purchase required to see results.',
                value: '$10 savings',
              },
            ].map((item, i) => (
              <div key={i} className="value-card">
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#111827' }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
                <div style={{ background: '#e8f4ef', padding: '6px 12px', borderRadius: 6, display: 'inline-block' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#345248' }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#345248', borderRadius: 12, padding: '16px 24px', textAlign: 'center' }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
              Total Value: $59+ — Yours free when you complete the 3-minute quiz
            </span>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#F5F5F5' }}>
        <div className="container-custom">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, marginBottom: 56 }}>
            {[
              { stat: '4.8 / 5', label: 'Average rating from 1,200+ verified reviews', emoji: '🌟' },
              { stat: '87%', label: 'Report better sleep within first 2 weeks†', emoji: '😴' },
              { stat: 'RD-Formulated', label: 'Formulated by specialists with 20+ years in nutrition', emoji: '🧑‍⚕️' },
              { stat: '3rd-Party Tested', label: 'Every batch verified for purity and potency', emoji: '🔬' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px', background: '#fff', borderRadius: 12 }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#345248', marginBottom: 4 }}>{s.stat}</div>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Featured testimonial */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '32px', maxWidth: 680, margin: '0 auto 40px', border: '1px solid #e5e7eb' }}>
            <div className="stars" style={{ fontSize: 20, marginBottom: 12 }}>★★★★★</div>
            <blockquote style={{ fontSize: 17, lineHeight: 1.7, color: '#374151', fontStyle: 'italic', margin: '0 0 16px' }}>
              "I've tried melatonin, magnesium spray, sleep teas — nothing worked consistently. The quiz helped me understand <em>why</em> I wasn't sleeping (stress + racing thoughts), and CADENCE Calm+Rest actually addressed the root cause. I fall asleep in 20 minutes now instead of lying awake for 2 hours."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e8f4ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>😊</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>Sarah M., 34</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>Marketing Manager · ✅ Verified Buyer</div>
              </div>
            </div>
          </div>

          {/* Testimonial grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { quote: "As a working parent, I'm constantly running on empty. Calm+Rest doesn't just help me sleep — it helps me handle daily chaos without snapping at my kids.", name: "Marcus L., 41", role: "Teacher & Dad" },
              { quote: "I was skeptical because I'd wasted money on 'natural sleep aids' before. But the ingredients in this are actually backed by research. It's the first supplement that's lived up to its claims.", name: "Jennifer K., 29", role: "Nurse" },
              { quote: "My brain doesn't shut off at night. I'll replay work emails or worry about tomorrow's to-do list for hours. L-Theanine in Calm+Rest quiets that mental chatter without making me feel sedated.", name: "David R., 52", role: "Business Owner" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars" style={{ fontSize: 14, marginBottom: 8 }}>★★★★★</div>
                <blockquote>"{t.quote}"</blockquote>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUTHORITY / INGREDIENTS ──────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', marginBottom: 12, color: '#111827' }}>
            Powered by Clinical Research, Not Marketing Hype
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 16, marginBottom: 48 }}>Three clinically-studied ingredients in therapeutic doses</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 40 }}>
            {[
              {
                name: "Affron® Saffron Extract",
                dose: "28mg (clinically effective dose)",
                emoji: "🌸",
                bullets: [
                  "Clinically studied in 5+ human trials",
                  "Supports healthy cortisol levels†",
                  "Promotes mood balance and stress resilience†",
                  "Helps improve sleep onset and quality†",
                ],
              },
              {
                name: "Chelamax® Magnesium Bisglycinate",
                dose: "200mg elemental magnesium",
                emoji: "⚡",
                bullets: [
                  "Most bioavailable form of magnesium",
                  "Supports muscle relaxation and tension relief†",
                  "Helps regulate sleep-wake cycles†",
                  "Gentle on digestion (no laxative effect)",
                ],
              },
              {
                name: "L-Theanine",
                dose: "200mg (therapeutic dose)",
                emoji: "🧠",
                bullets: [
                  "Backed by 20+ years of research",
                  "Promotes calm focus without drowsiness†",
                  "Reduces racing thoughts and mental chatter†",
                  "Supports alpha brain wave activity†",
                ],
              },
            ].map((ing, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{ing.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: '#111827' }}>{ing.name}</h3>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>{ing.dose}</div>
                {ing.bullets.map((b, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
                    <span style={{ color: '#345248', marginTop: 2 }}>✅</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginBottom: 24 }}>
            {['✅ Third-Party Tested', '✅ Non-GMO', '✅ Gluten-Free', '✅ Vegan', '✅ Made in USA (GMP)'].map((badge, i) => (
              <div key={i} className="trust-badge">
                <span style={{ color: '#345248', fontSize: 14 }}>{badge}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', maxWidth: 600, margin: '0 auto' }}>
            †These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* ─── CTA #2 ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: 'linear-gradient(135deg, #f0f7f4 0%, #f8f5fb 100%)' }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: 640 }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontFamily: 'Georgia, serif', fontWeight: 700, marginBottom: 12, color: '#111827' }}>
            Ready to Sleep Better Tonight?
          </h2>
          <p style={{ fontSize: 17, color: '#4b5563', marginBottom: 32, lineHeight: 1.6 }}>
            Join 10,000+ people who've discovered their personalized stress-relief solution through our quiz.
          </p>
          <Link href="/quiz" style={{ textDecoration: 'none', display: 'block', maxWidth: 360, margin: '0 auto' }}>
            <button className="btn-primary" style={{ fontSize: 18, minHeight: 60 }}>
              Take the Free Quiz Now →
            </button>
          </Link>
          <p style={{ marginTop: 12, fontSize: 14, color: '#6b7280' }}>
            3 minutes · $10 discount · No credit card required
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', marginBottom: 48, color: '#111827' }}>
            Your Path to Better Sleep & Less Stress
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Answer 12 Quick Questions', desc: 'Tell us about your stress triggers, sleep patterns, and goals. Takes 3 minutes. No medical history required.', emoji: '📋' },
              { step: '02', title: 'Get Your Personalized Report', desc: "We'll analyze your answers and match you with the right ingredients for your specific needs. Instant results.", emoji: '📊' },
              { step: '03', title: 'Claim Your $10 Discount', desc: 'Your unique code is valid for 30 days. No purchase required to complete the quiz or see your results.', emoji: '🎁' },
              { step: '04', title: 'Start Your 30-Day Trial', desc: "Take CADENCE Calm+Rest daily and track your progress. If you're not sleeping better within 30 days, we'll refund you.", emoji: '🛡️' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#345248', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>
                  {s.emoji}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#B6A8CC', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Step {s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#111827' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFFERENTIATION ──────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#F5F5F5' }}>
        <div className="container-custom">
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', marginBottom: 40, color: '#111827' }}>
            Why CADENCE Calm+Rest Works When Other Sleep Aids Don't
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '2px solid #fee2e2' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#dc2626', marginBottom: 16 }}>❌ Most Sleep Supplements</h3>
              {['Generic formulas (melatonin + random herbs)', 'No personalization (one-size-fits-all)', 'Unproven ingredients or underdosed', 'Groggy mornings (melatonin hangover)'].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 14, color: '#6b7280' }}>
                  <span>✗</span><span>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '2px solid #345248' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#345248', marginBottom: 16 }}>✅ CADENCE Calm+Rest</h3>
              {['Targeted ingredients (stress + sleep onset + mental calm)', 'Personalized based on your quiz answers', 'Clinically-studied, therapeutic doses', 'Non-habit forming, no next-day grogginess'].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 14, color: '#374151' }}>
                  <span style={{ color: '#345248' }}>✓</span><span>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#345248', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🎯 You Get</h3>
              {['Faster sleep onset (15-30 min average)†', 'Fewer nighttime awakenings', 'Better stress resilience during the day', 'Clear-headed mornings (no melatonin fog)'].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 14, color: '#e8f4ef' }}>
                  <span>→</span><span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'Georgia, serif', fontWeight: 700, textAlign: 'center', marginBottom: 40, color: '#111827' }}>
            Questions? We've Got Answers.
          </h2>
          {[
            { q: "How long does the quiz take?", a: "About 3 minutes. We keep it short because we know your time is valuable — but we ask the right questions to give you accurate recommendations." },
            { q: "Do I have to buy anything to see my results?", a: "Nope. The quiz is completely free, and you'll get your personalized report even if you don't purchase. The $10 discount code is a bonus, not a requirement." },
            { q: "What if I'm already taking sleep supplements?", a: "Perfect. The quiz will ask about your current routine and help you identify gaps, overlaps, or more effective alternatives. Many people switch to Calm+Rest after trying other products." },
            { q: "Is my data private?", a: "Absolutely. We never sell your information. Your quiz answers are used only to personalize your supplement recommendations and improve our service." },
            { q: "How soon will I see results?", a: "Most people notice easier sleep onset within the first week. Stress resilience and consistent sleep quality improve over 2-4 weeks with daily use. We offer a 30-day satisfaction guarantee." },
            { q: "What if Calm+Rest doesn't work for me?", a: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us for a full refund — no questions asked, no return shipping required." },
            { q: "Are there any side effects?", a: "CADENCE Calm+Rest is made with naturally-derived, well-tolerated ingredients. Side effects are rare. If you're pregnant, nursing, or taking prescription medications, consult your doctor first." },
          ].map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#345248' }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Still Reading? You're Thinking Too Much. Let's Fix That.
          </h2>
          <p style={{ fontSize: 17, color: '#b7dece', marginBottom: 32, lineHeight: 1.6 }}>
            The quiz takes 3 minutes. Your first good night's sleep? Priceless.
          </p>
          <Link href="/quiz" style={{ textDecoration: 'none', display: 'block', maxWidth: 360, margin: '0 auto' }}>
            <button style={{ background: '#fff', color: '#345248', borderRadius: 8, minHeight: 60, fontSize: 18, fontWeight: 700, border: 'none', cursor: 'pointer', width: '100%', padding: '0 24px' }}>
              Start Your Free Assessment →
            </button>
          </Link>
          <p style={{ marginTop: 12, fontSize: 14, color: '#b7dece' }}>
            Get your personalized sleep & stress solution + $10 off
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            {['🔒 Secure & Private', '💳 No Credit Card Needed', '✅ 30-Day Guarantee'].map((b, i) => (
              <span key={i} style={{ fontSize: 13, color: '#b7dece' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#1a2c25', padding: '32px 0' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
            © 2026 Evolance. All rights reserved. · CADENCE Calm+Rest is not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before use if pregnant, nursing, or taking medications.
          </p>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 16 }}>
            <a href="https://evolance.com/pages/privacy-policy" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="https://evolance.com/pages/terms-of-service" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>Terms</a>
            <a href="https://evolance.com/pages/refund-policy" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>Refund Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
