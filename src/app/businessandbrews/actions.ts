'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type RSVPState = {
  success: boolean;
  message: string;
} | null;

export async function submitRSVP(
  prevState: RSVPState,
  formData: FormData
): Promise<RSVPState> {
  const attending = formData.get('attending') as string;
  const fullName = formData.get('fullName') as string;
  const company = formData.get('company') as string;
  const suggestions = formData.get('suggestions') as string;
  const eventName = formData.get('eventName') as string;

  // Server-side validation
  if (!attending || !fullName?.trim() || !company?.trim()) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
    };
  }

  if (!eventName) {
    return {
      success: false,
      message: 'Event information is missing.',
    };
  }

  const attendingLabel = attending === 'yes' ? '✅ Yes' : '❌ No';

  try {
    await resend.emails.send({
      from: 'Business & Brews RSVP <onboarding@resend.dev>',
      to: 'hello@brainyprolocal.com',
      subject: `RSVP: ${fullName} — ${eventName} (${attending === 'yes' ? 'Attending' : 'Not Attending'})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #0F172A; color: white; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Business &amp; Brews RSVP</h1>
            <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">${eventName}</p>
          </div>
          <div style="background: #f8fafc; padding: 24px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1D4781; width: 140px;">Attending</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${attendingLabel}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1D4781;">Full Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1D4781;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${company}</td>
              </tr>
              ${suggestions?.trim() ? `
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #1D4781; vertical-align: top;">Suggestions / Questions</td>
                <td style="padding: 12px 0;">${suggestions}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: attending === 'yes'
        ? "You're in! We'll see you there. 🍻"
        : "Got it — thanks for letting us know!",
    };
  } catch (error) {
    console.error('RSVP email error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or email us directly.',
    };
  }
}
