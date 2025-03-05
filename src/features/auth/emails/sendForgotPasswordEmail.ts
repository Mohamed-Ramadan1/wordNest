import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendForgotPasswordEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create password reset link using environment variable and the reset token
    const resetPasswordLink = `${process.env.FRONTEND_URL}/auth/reset-password/${user.passwordResetToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `Password Reset Request - ${siteName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - ${siteName}</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #f8f9fa;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #e9ecef;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #2c3e50;
                }
                .content {
                    padding: 30px 20px;
                    background-color: #ffffff;
                }
                .title {
                    font-size: 24px;
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #3498db;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #2980b9;
                }
                .reset-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #3498db;
                    margin: 15px 0;
                }
                .alert {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .alert-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .rate-limit-warning {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .security-note {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-size: 14px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #666666;
                    background-color: #f8f9fa;
                    border-radius: 0 0 8px 8px;
                    border-top: 1px solid #e9ecef;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        width: 100% !important;
                        margin: 0 !important;
                        border-radius: 0 !important;
                    }
                    .header, .footer {
                        border-radius: 0 !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">${siteName}</div>
                </div>
                <div class="content">
                    <h2 class="title">Password Reset Request</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We received a request to reset the password for your ${siteName} account. To proceed with the password reset, click the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="${resetPasswordLink}" class="button">Reset Password</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="reset-link">
                        ${resetPasswordLink}
                    </div>
                    
                    
                    <div class="rate-limit-warning">
                        <div class="alert-title">⚠️ Rate Limit Warning</div>
                     <p><strong>For security reasons</strong>, you can request a password reset only <strong>twice within a 24-hour period</strong>. Please complete the process carefully to ensure uninterrupted access to your account.</p>
                    </div>
                    
                    
                    <div class="alert">
                        <div class="alert-title">⚠️ Important Security Notice</div>
                        <p>If you didn't request a password reset or don't recognize this activity, please ignore this email and ensure your account is secure by:</p>
                        <ul>
                            <li>Checking that your password is strong and unique</li>
                            <li>Enabling two-factor authentication if available</li>
                            <li>Contacting our support team if you notice any suspicious activity</li>
                        </ul>
                    </div>
                    
                    <div class="security-note">
                        <p><strong>Please Note:</strong></p>
                        <ul>
                            <li>This password reset link will expire in 1 hour</li>
                            <li>For security reasons, only the most recent reset link will work</li>
                            <li>You are limited to 2 password reset requests every 24 hours</li>
                            <li>After resetting your password, you'll be asked to log in again</li>
                            <li>Make sure to choose a strong, unique password that you haven't used before</li>
                        </ul>
                    </div>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>Questions? Contact us at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err: Error | null, info: any) => {
        if (err) {
          console.error("Error sending password reset email:", err.message);
          reject(err);
        } else {
          console.log("Password reset email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendForgotPasswordEmail:", error);
    throw error;
  }
};
