import type { QuizResponses, PersonalizationResult } from './quiz-types';

export function buildPersonalization(
  responses: QuizResponses,
  name: string
): PersonalizationResult {
  const rules: string[] = [];

  // ─── PRIMARY ISSUE DETECTION ──────────────────────────────────────────────
  let primaryIssue: PersonalizationResult['primaryIssue'] = 'stress_sleep';
  if (responses.q1_sleep_quality === 'hard_fall') {
    primaryIssue = 'sleep_onset';
    rules.push('1A');
  } else if (responses.q1_sleep_quality === 'wake_night') {
    primaryIssue = 'sleep_maintenance';
    rules.push('1B');
  } else if (responses.q1_sleep_quality === 'rarely_restful') {
    primaryIssue = 'poor_quality';
    rules.push('1C');
  }

  // ─── STRESS TRIGGERS ──────────────────────────────────────────────────────
  if (responses.q5_stress_triggers?.includes('work')) rules.push('2A');
  if (responses.q5_stress_triggers?.includes('overthinking')) rules.push('2B');
  if (responses.q5_stress_triggers?.includes('family')) rules.push('2C');
  if (responses.q5_stress_triggers?.includes('no_time')) rules.push('2D');

  // ─── SYMPTOMS ─────────────────────────────────────────────────────────────
  if (responses.q7_symptoms?.includes('racing_thoughts')) rules.push('3A');
  if (responses.q7_symptoms?.includes('muscle_tension')) rules.push('3B');
  if (responses.q7_symptoms?.includes('heart_racing')) rules.push('3C');
  if (responses.q7_symptoms?.includes('fatigue')) rules.push('3D');

  // ─── GOALS ───────────────────────────────────────────────────────────────
  if (responses.q8_sleep_goals?.includes('fall_faster')) rules.push('4A');
  if (responses.q8_sleep_goals?.includes('stop_melatonin')) rules.push('4B');
  if (responses.q9_stress_goals?.includes('calmer')) rules.push('4C');
  if (responses.q9_stress_goals?.includes('clear_thinking')) rules.push('4D');

  // ─── SWITCHERS ────────────────────────────────────────────────────────────
  if (responses.q10_previous_attempts?.includes('melatonin')) rules.push('5A');
  if (responses.q10_previous_attempts?.includes('magnesium')) rules.push('5B');
  if (responses.q10_previous_attempts?.includes('prescription_sleep')) rules.push('5C');
  if (responses.q10_previous_attempts?.includes('nothing')) rules.push('5D');
  if (responses.q10_previous_attempts?.includes('tried_a_lot')) rules.push('5E');

  // ─── TIMING ───────────────────────────────────────────────────────────────
  if (responses.q11_hardest_time?.includes('evening')) rules.push('6A');
  if (responses.q11_hardest_time?.includes('bedtime')) rules.push('6B');
  if (responses.q11_hardest_time?.includes('middle_night')) rules.push('6C');
  if (responses.q11_hardest_time?.includes('all_day')) rules.push('6D');

  // ─── DEMOGRAPHICS ─────────────────────────────────────────────────────────
  if (responses.q12_gender === 'female' && responses.q12_hormonal?.includes('pms')) rules.push('7A');
  if (responses.q12_gender === 'female' && responses.q12_hormonal?.includes('menopause')) rules.push('7B');
  if (responses.q12_gender === 'female' && responses.q12_hormonal?.includes('pregnant')) rules.push('7C');
  if (responses.q12_gender === 'male' && (responses.q12_age === '35-44')) rules.push('7D');
  if (responses.q12_age === '55-64' || responses.q12_age === '65+') rules.push('7E');

  // ─── BUNDLE DETECTION ─────────────────────────────────────────────────────
  const isHighStress = responses.q4_emotional_baseline?.length >= 3
    || responses.q11_hardest_time?.includes('all_day')
    || (responses.q7_symptoms && responses.q7_symptoms.filter(s => s !== 'none').length >= 4);

  const isSwitcher = rules.includes('5A') || rules.includes('5B') || rules.includes('5E');
  const isStarter = rules.includes('5D') && (responses.q12_age === '18-24');

  let bundle: PersonalizationResult['bundle'] = 'sleep_only';
  if (isStarter) {
    bundle = 'starter';
    rules.push('8D');
  } else if (isHighStress) {
    bundle = 'severe_stress';
    rules.push('8C');
  } else if (primaryIssue !== 'poor_quality' || isSwitcher) {
    bundle = 'stress_sleep';
    rules.push('8B');
  } else {
    bundle = 'sleep_only';
    rules.push('8A');
  }

  // ─── HEADLINE ─────────────────────────────────────────────────────────────
  let headline = `${name}, Here's Your Personalized Protocol`;
  if (primaryIssue === 'sleep_onset') {
    headline = `${name}, Let's Get You to Sleep Faster`;
  } else if (primaryIssue === 'sleep_maintenance') {
    headline = `${name}, Let's Help You Stay Asleep`;
  } else if (primaryIssue === 'poor_quality') {
    headline = `${name}, Let's Fix Sleep from the Root`;
  }

  // ─── SUBHEADLINE ──────────────────────────────────────────────────────────
  const barriers = responses.q2_sleep_barriers?.filter(b => b !== 'none') ?? [];
  const symptoms = responses.q7_symptoms?.filter(s => s !== 'none') ?? [];
  const triggerText = (() => {
    if (barriers.includes('racing_thoughts') || symptoms.includes('racing_thoughts')) return 'racing thoughts at bedtime';
    if (barriers.includes('anxiety')) return 'anxiety and worry at night';
    if (barriers.includes('tension')) return 'physical tension preventing sleep';
    return 'sleep disruption linked to chronic stress';
  })();

  const wakeText = (() => {
    const wake = responses.q3_wake_up_experience ?? [];
    if (wake.includes('groggy') && wake.includes('tired')) return 'groggy and tired';
    if (wake.includes('tired')) return 'tired even after sleeping';
    if (wake.includes('groggy')) return 'foggy-headed in the mornings';
    return 'not fully rested';
  })();

  const subheadline = `Based on your answers, you struggle with **${triggerText}** and wake up feeling **${wakeText}**. Here's your personalized stress & sleep protocol.`;

  // ─── DOSING ───────────────────────────────────────────────────────────────
  let dosageTime = '60–90 minutes before bed';
  let dosingInstructions = 'Take 2 capsules 60–90 minutes before your target bedtime.';
  if (rules.includes('6A')) {
    dosageTime = '30–60 min after getting home from work';
    dosingInstructions = 'Take 2 capsules 30–60 minutes after you get home from work (6–7 PM). Your nervous system needs a transition period.';
  } else if (rules.includes('6B')) {
    dosageTime = '60–90 min before target bedtime';
    dosingInstructions = 'Take 2 capsules 60–90 minutes before your target bedtime. L-Theanine works within 30–60 min to quiet mental chatter.';
  } else if (rules.includes('6C')) {
    dosageTime = '60 min before bed, every night';
    dosingInstructions = 'Take 2 capsules 60 minutes before bed consistently every night. Affron® regulates cortisol throughout the night.';
  }

  // ─── EXPERT ───────────────────────────────────────────────────────────────
  let expertName = 'Rachel Kim';
  let expertRole = 'Wellness Specialist';
  if (primaryIssue === 'sleep_onset' || primaryIssue === 'sleep_maintenance' || primaryIssue === 'poor_quality') {
    expertName = 'Mia Torres';
    expertRole = 'Sleep & Stress Specialist';
  } else if (isHighStress) {
    expertName = 'James Park';
    expertRole = 'Stress Management Specialist';
  }

  const expertMessage = buildExpertMessage(expertName, name, primaryIssue, rules);

  // ─── BUNDLE NAME ──────────────────────────────────────────────────────────
  const bundleName = (() => {
    if (bundle === 'severe_stress') return `${name}'s Stress Recovery System`;
    if (bundle === 'stress_sleep') return `${name}'s Complete Calm Protocol`;
    if (bundle === 'starter') return `${name}'s Sleep Starter Kit`;
    return `${name}'s Sleep Restoration Stack`;
  })();

  // ─── TOP INGREDIENT ───────────────────────────────────────────────────────
  let topIngredient: PersonalizationResult['topIngredient'] = 'all_three';
  if (primaryIssue === 'sleep_onset' && !rules.includes('3A') && !rules.includes('3B')) {
    topIngredient = 'affron_saffron';
  } else if (primaryIssue === 'sleep_maintenance' && !rules.includes('3A')) {
    topIngredient = 'chelamax_magnesium';
  } else if (rules.includes('3A') && !rules.includes('3B') && !rules.includes('3C')) {
    topIngredient = 'l_theanine';
  }

  // ─── TESTIMONIAL ──────────────────────────────────────────────────────────
  const primaryTestimonial = (() => {
    if (rules.includes('5A')) {
      return {
        quote: "Finally, a sleep supplement that doesn't leave me groggy. I took melatonin for 2 years and woke up in a fog every morning. Calm+Rest works completely differently — I sleep deeply and wake up clear-headed.",
        author: "Jennifer K., 29",
        role: "Nurse · Verified Buyer"
      };
    }
    if (rules.includes('3A') || barriers.includes('racing_thoughts')) {
      return {
        quote: "My brain used to replay work emails for hours. Now I fall asleep in 20 minutes. L-Theanine in Calm+Rest actually quiets the mental chatter without making me feel drugged. Game-changer.",
        author: "Kelly R., 38",
        role: "Project Manager · Verified Buyer"
      };
    }
    if (rules.includes('2A')) {
      return {
        quote: "I no longer bring work stress to bed with me. High-pressure job means I used to lie awake thinking about tomorrow's meetings. Calm+Rest helps my nervous system 'clock out' when I clock out.",
        author: "Marcus T., 42",
        role: "Sales Director · Verified Buyer"
      };
    }
    return {
      quote: "I've tried melatonin, magnesium spray, sleep teas — nothing worked consistently. The quiz helped me understand *why* I wasn't sleeping, and CADENCE Calm+Rest actually addressed the root cause. I fall asleep in 20 minutes now.",
      author: "Sarah M., 34",
      role: "Marketing Manager · Verified Buyer"
    };
  })();

  // ─── SWITCHER COPY ────────────────────────────────────────────────────────
  let switcherCopy: string | undefined;
  if (rules.includes('5A')) {
    switcherCopy = "You've tried melatonin before. Melatonin treats the symptom (lack of sleep hormone), not the cause (stress dysregulation). Calm+Rest works differently — it helps your body regulate cortisol so you produce melatonin naturally. No dependency, no morning fog.";
  } else if (rules.includes('5E')) {
    switcherCopy = "You've tried a lot and nothing's worked consistently. Most supplements fail because they're under-dosed, single-ingredient, or have poor bioavailability. Calm+Rest uses clinically-effective doses of three synergistic ingredients in their most bioavailable forms.";
  } else if (rules.includes('5B')) {
    switcherCopy = "You've tried magnesium before — it helps with physical relaxation but misses elevated cortisol and racing thoughts. Calm+Rest completes the formula with Affron® saffron (cortisol regulation) and L-Theanine (mental calm).";
  }

  // ─── HORMONAL WARNING ─────────────────────────────────────────────────────
  let hormonalWarning: string | undefined;
  if (rules.includes('7C')) {
    hormonalWarning = "⚠️ **Important:** You indicated you're pregnant or breastfeeding. We recommend consulting your doctor before taking any supplements. While these ingredients are generally well-tolerated, your healthcare provider should advise on what's appropriate during pregnancy or nursing.";
  }

  // ─── SYMPTOM HIGHLIGHTS ───────────────────────────────────────────────────
  const symptomHighlights: string[] = [];
  if (symptoms.includes('racing_thoughts') || barriers.includes('racing_thoughts')) {
    symptomHighlights.push('Racing thoughts at night → L-Theanine promotes alpha brain waves within 30–60 min');
  }
  if (symptoms.includes('muscle_tension')) {
    symptomHighlights.push('Muscle tension → Chelamax® Magnesium supports physical relaxation overnight');
  }
  if (symptoms.includes('heart_racing') || rules.includes('2A')) {
    symptomHighlights.push('Elevated stress response → Affron® Saffron regulates cortisol and HPA axis');
  }
  if (primaryIssue === 'sleep_onset') {
    symptomHighlights.push('Difficulty falling asleep → Full-spectrum formula addresses onset, quality, and next-day clarity');
  }

  return {
    primaryIssue,
    topIngredient,
    bundle,
    appliedRules: rules,
    headline,
    subheadline,
    dosingInstructions,
    dosageTime,
    expertName,
    expertRole,
    expertMessage,
    bundleName,
    primaryTestimonial,
    switcherCopy,
    comparisonTable: rules.includes('5A'),
    hormonalWarning,
    symptomHighlights,
  };
}

function buildExpertMessage(
  expertName: string,
  userName: string,
  primaryIssue: PersonalizationResult['primaryIssue'],
  rules: string[]
): string {
  const issueText = (() => {
    if (primaryIssue === 'sleep_onset') return 'difficulty falling asleep and racing thoughts at bedtime';
    if (primaryIssue === 'sleep_maintenance') return 'nighttime awakenings and difficulty staying asleep';
    if (primaryIssue === 'poor_quality') return 'consistently poor sleep quality despite time in bed';
    return 'high stress that disrupts both mood and sleep';
  })();

  const timelineText = (() => {
    if (primaryIssue === 'sleep_onset') return 'Most people with your profile see improvements within 7–10 days.';
    if (primaryIssue === 'sleep_maintenance') return 'You should notice fewer awakenings within 2–3 weeks of consistent use.';
    return 'The first week typically brings easier sleep onset, with deeper improvements over 3–4 weeks.';
  })();

  return `Hi ${userName},\n\nI've reviewed your sleep patterns and stress profile. Based on your answers, ${issueText} are the primary factors affecting your rest and wellbeing. The protocol I've built for you targets both the mental and hormonal drivers that disrupt sleep quality.\n\n${timelineText}\n\n— ${expertName}`;
}
