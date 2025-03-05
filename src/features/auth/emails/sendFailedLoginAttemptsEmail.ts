import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendFailedLoginAttemptsEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create password reset link
    const passwordResetLink = `${process.env.FRONTEND_URL}/auth/reset-password`;

    const mailOptions = {
      from: `${siteName} Security <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} Security Alert - Multiple Failed Login Attempts`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Security Alert - ${siteName}</title>
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
                    background-color: #fff3f3;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #ffe6e6;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #e74c3c;
                }
                .content {
                    padding: 30px 20px;
                    background-color: #ffffff;
                }
                .alert-message {
                    font-size: 24px;
                    color: #e74c3c;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #e74c3c;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #c0392b;
                }
                .security-box {
                    background-color: #fff3f3;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #e74c3c;
                }
                .action-list {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .action-list ul {
                    margin: 0;
                    padding-left: 20px;
                }
                .action-list li {
                    margin: 10px 0;
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
                    <div class="logo">${siteName} Security Alert</div>
                </div>
                <div class="content">
                    <h2 class="alert-message">Security Alert: Multiple Failed Login Attempts</h2>
                    
                    <div class="security-box">
                        <p>Dear ${user.firstName},</p>
                        <p>We've detected multiple failed login attempts to your ${siteName} account. For your security, we've temporarily blocked login attempts to your account.</p>
                        <p><strong>Last login attempt:</strong> ${user.lastLoginAttemptAt ? new Date(user.lastLoginAttemptAt).toLocaleString() : "N/A"}</p>
                        <p><strong>IP Address:</strong> ${user.lastLoginIP || "Unknown"}</p>
                    </div>
                    
                    <div class="action-list">
                        <p><strong>Recommended Actions:</strong></p>
                        <ul>
                            <li>If you forgot your password, click the button below to reset it:</li>
                            <div style="text-align: center;">
                                <a href="${passwordResetLink}" class="button">Reset Password</a>
                            </div>
                            
                            <li>If you didn't attempt to log in, we strongly recommend:</li>
                            <ul>
                                <li>Change your password immediately</li>
                                <li>Review your account security settings</li>
                                <li>Enable two-factor authentication if available</li>
                                <li>Contact our support team if you notice any suspicious activity</li>
                            </ul>
                        </ul>
                    </div>
                    
                    <p>Your account security is important to us. The login block will be automatically lifted after 30 minutes, but we recommend taking action before then if you recognize this activity.</p>
                    
                    <p>If you need assistance or have any questions, please don't hesitate to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>For security support, contact us at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err: Error | null, info: any) => {
        if (err) {
          console.error(
            "Error sending failed login attempts email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Failed login attempts email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendFailedLoginAttemptsEmail:", error);
    throw error;
  }
};
