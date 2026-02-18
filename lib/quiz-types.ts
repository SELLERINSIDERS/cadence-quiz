// Quiz data types for CADENCE Calm+Rest quiz funnel

export interface QuizResponses {
  // Phase 1: Sleep Baseline
  q1_sleep_quality: string;
  q2_sleep_barriers: string[];
  q3_wake_up_experience: string[];
  // Phase 2: Stress & Lifestyle
  q4_emotional_baseline: string[];
  q5_stress_triggers: string[];
  q6_stress_management: string[];
  // Phase 3: Symptoms & Goals
  q7_symptoms: string[];
  q8_sleep_goals: string[];    // max 3
  q9_stress_goals: string[];   // max 3
  // Phase 4: Current Solutions
  q10_previous_attempts: string[];
  q11_hardest_time: string[];
  // Phase 5: Demographics
  q12_age: string;
  q12_gender: string;
  q12_hormonal?: string[];     // female only
}

export interface UserInfo {
  name: string;
  email: string;
  optIn: boolean;
}

export interface PersonalizationResult {
  primaryIssue: 'sleep_onset' | 'sleep_maintenance' | 'poor_quality' | 'stress_sleep';
  topIngredient: 'affron_saffron' | 'chelamax_magnesium' | 'l_theanine' | 'all_three';
  bundle: 'sleep_only' | 'stress_sleep' | 'severe_stress' | 'starter';
  appliedRules: string[];
  headline: string;
  subheadline: string;
  dosingInstructions: string;
  dosageTime: string;
  expertName: string;
  expertRole: string;
  expertMessage: string;
  bundleName: string;
  primaryTestimonial: { quote: string; author: string; role: string };
  switcherCopy?: string;
  comparisonTable?: boolean;
  hormonalWarning?: string;
  symptomHighlights: string[];
}

export interface QuizState {
  currentQuestion: number;
  responses: Partial<QuizResponses>;
  isComplete: boolean;
  emailGateVisible: boolean;
  userInfo?: UserInfo;
}

// Question definition types
export type QuestionType = 'single' | 'multi' | 'multi-max3';

export interface QuizOption {
  id: string;
  emoji: string;
  text: string;
}

export interface QuizQuestion {
  id: keyof QuizResponses | 'q12_hormonal';
  phase: number;
  text: string;
  type: QuestionType;
  options: QuizOption[];
  hint?: string;
  femaleOnly?: boolean;
}
