const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../Model/Model');
const sendEmail = require('../Config/Email');

exports.handleForgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

   
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `<p>You requested a password reset. Please click the link below to reset your password:</p>
                      <a href="${resetUrl}">Reset Password</a>`;

    await sendEmail({
        email,
        subject: 'Password Reset Request',
        message
    });

    return 'Password reset link sent to your email';
};

exports.handleResetPassword = async (resetToken, newPassword) => {
  try {
   
      const user = await User.findOne({
          resetToken,
          resetTokenExpiry: { $gt: Date.now() } 
      });
      if (!user) throw new Error('Invalid or expired token');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetToken = undefined; 
      user.resetTokenExpiry = undefined; 

      await user.save();

      return 'Password has been reset';
  } catch (error) {
      console.error('Error in handleResetPassword:', error);
      throw new Error('Password reset failed');
  }
};

