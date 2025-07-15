
'use client';

/**
 * @fileOverview A simulated email service for sending transactional emails.
 */

/**
 * Simulates sending a welcome email to a newly registered user.
 * In a real application, this would use a service like SendGrid, AWS SES, or Mailgun.
 * @param email The recipient's email address.
 * @param name The recipient's name.
 */
export function sendWelcomeEmail(email: string, name: string): void {
  const emailBody = `
    Hello ${name},

    Welcome to ProtectHire! We're thrilled to have you join our community.

    Whether you're looking to hire top security talent or find your next job, we're here to help you connect.

    Thank you for registering.

    Best regards,
    The ProtectHire Team
  `;

  // Simulate sending the email by logging it to the console.
  console.log('--- Sending Welcome Email ---');
  console.log(`To: ${email}`);
  console.log('Subject: Welcome to ProtectHire!');
  console.log(`Body: ${emailBody}`);
  console.log('-----------------------------');
}
