import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { responses, userInfo } = body;

    if (!userInfo?.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const klaviyoApiKey = process.env.KLAVIYO_API_KEY;
    const listId = 'RdvieM';

    if (!klaviyoApiKey) {
      console.warn('KLAVIYO_API_KEY not set — skipping subscription');
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Determine primary issue for segmentation
    const primaryIssue = (() => {
      if (responses?.q1_sleep_quality === 'hard_fall') return 'sleep_onset';
      if (responses?.q1_sleep_quality === 'wake_night') return 'sleep_maintenance';
      if (responses?.q1_sleep_quality === 'rarely_restful') return 'poor_quality';
      return 'stress_sleep';
    })();

    // Build profile properties from quiz answers
    const profileProperties: Record<string, unknown> = {
      first_name: userInfo.name,
      quiz_completed_at: new Date().toISOString(),
      quiz_version: 'v1',
      // Primary segmentation
      primary_issue: primaryIssue,
      q1_sleep_quality: responses?.q1_sleep_quality,
      // Stress
      stress_triggers: (responses?.q5_stress_triggers ?? []).join(','),
      // Symptoms
      symptoms: (responses?.q7_symptoms ?? []).join(','),
      // Goals
      sleep_goals: (responses?.q8_sleep_goals ?? []).join(','),
      stress_goals: (responses?.q9_stress_goals ?? []).join(','),
      // Switcher flags
      tried_melatonin: (responses?.q10_previous_attempts ?? []).includes('melatonin'),
      tried_magnesium: (responses?.q10_previous_attempts ?? []).includes('magnesium'),
      tried_a_lot: (responses?.q10_previous_attempts ?? []).includes('tried_a_lot'),
      first_timer: (responses?.q10_previous_attempts ?? []).includes('nothing'),
      // Demographics
      age_range: responses?.q12_age,
      gender: responses?.q12_gender,
      hormonal_factors: (responses?.q12_hormonal ?? []).join(','),
      // Hardest time
      hardest_time: (responses?.q11_hardest_time ?? []).join(','),
      // Email opt-in
      email_opt_in: userInfo.optIn,
    };

    // Klaviyo v3 API — Subscribe to list
    const payload = {
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  email: userInfo.email,
                  first_name: userInfo.name,
                  properties: profileProperties,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: userInfo.optIn ? 'SUBSCRIBED' : 'UNSUBSCRIBED',
                      },
                    },
                  },
                },
              },
            ],
          },
          historical_import: false,
          list_id: listId,
        },
      },
    };

    const response = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'revision': '2024-10-15',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Klaviyo error:', response.status, errText);
      // Non-blocking — don't fail user flow
      return NextResponse.json({ ok: true, klaviyo_error: response.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Klaviyo route error:', err);
    // Always return 200 to not block user flow
    return NextResponse.json({ ok: true, error: String(err) });
  }
}
