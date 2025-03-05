import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendEmailChangeSuccessEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Email Address Successfully Changed`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Change Successful</title>
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
                .message-title {
                    font-size: 24px;
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                .success-banner {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    text-align: center;
                }
                .success-icon {
                    font-size: 48px;
                    color: #28a745;
                    margin-bottom: 10px;
                }
                .important-info {
                    background-color: #e8f5e9;
                    border: 1px solid #c8e6c9;
                    color: #2e7d32;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .security-reminder {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
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
                    <h2 class="message-title">Email Address Successfully Changed</h2>
                    
                    <div class="success-banner">
                        <div class="success-icon">✓</div>
                        <p><strong>Your email address has been successfully updated!</strong></p>
                    </div>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>This email confirms that your email address for your ${siteName} account has been successfully changed.</p>
                    
                    <div class="important-info">
                        <p><strong>What This Means:</strong></p>
                        <ul>
                            <li>All future communications from ${siteName} will be sent to this email address</li>
                            <li>You can continue using all platform features as normal</li>
                            <li>Your account settings and data remain unchanged</li>
                            <li>You can request another email change after 100 days</li>
                        </ul>
                    </div>
                    
                    <div class="security-reminder">
                        <p><strong>Security Reminder:</strong></p>
                        <ul>
                            <li>If you didn't make this change, please contact our support team immediately</li>
                            <li>We recommend reviewing your recent account activity</li>
                            <li>Consider updating your password for additional security</li>
                        </ul>
                    </div>
                    
                    <p>Thank you for keeping your account information up to date.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>If you have any questions, contact us at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
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
            "Error sending email change success notification:",
            err.message
          );
          reject(err);
        } else {
          console.log("Email change success notification sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendEmailChangeSuccessEmail:", error);
    throw error;
  }
};
