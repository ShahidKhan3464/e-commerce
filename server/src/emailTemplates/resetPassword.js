export const resetPasswordTemplate = (resetUrl) => `
    <p>You requested a password reset.</p>
    <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
    <p>This link will expire in 1 hour.</p>
    <p>If you did not request this, please ignore this email.</p>
  `;
