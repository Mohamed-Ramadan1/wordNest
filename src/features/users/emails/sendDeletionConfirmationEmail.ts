import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendDeletionConfirmationEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create confirmation link
    const confirmationLink = `${process.env.FRONTEND_URL}/confirm-deletion/${user.deleteAccountRequestToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Confirm Your Account Deletion Request`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm Account Deletion</title>
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
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #dc3545;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #bd2130;
                }
                .confirmation-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #dc3545;
                    margin: 15px 0;
                }
                .warning-info {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .deletion-info {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .grace-period-info {
                    background-color: #e8f5e9;
                    border: 1px solid #c8e6c9;
                    color: #2e7d32;
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
                    <h2 class="message-title">Confirm Account Deletion</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We received a request to permanently delete your ${siteName} account. This action requires your confirmation to proceed.</p>
                    
                    <div class="warning-info">
                        <p><strong>Warning:</strong> Account deletion is a permanent action. Please read the following information carefully before proceeding.</p>
                    </div>
                    
                    <div class="deletion-info">
                        <p><strong>Important Information About Account Deletion:</strong></p>
                        <ul>
                            <li>After clicking the confirmation link, your account will be immediately suspended</li>
                            <li>You will no longer be able to log in to your account</li>
                            <li>After 30 days, all your account data will be permanently deleted</li>
                            <li>Once the 30-day period ends, there will be NO way to recover your account or any associated data</li>
                            <li>After permanent deletion, you may register a new account using the same email address</li>
                        </ul>
                    </div>
                    
                    <div class="grace-period-info">
                        <p><strong>30-Day Grace Period:</strong></p>
                        <ul>
                            <li>If you change your mind during the 30-day grace period, contact our support team immediately</li>
                            <li>We will review your account recovery request</li>
                            <li>Account recovery is only possible during the 30-day grace period</li>
                            <li>Recovery requests must be submitted before the permanent deletion occurs</li>
                        </ul>
                    </div>

                    <p>If you wish to proceed with account deletion, please click the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="${confirmationLink}" class="button">Confirm Account Deletion</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="confirmation-link">
                        ${confirmationLink}
                    </div>
                    
                    <div class="warning-info">
                        <p><strong>Please Note:</strong></p>
                        <ul>
                            <li>This confirmation link will expire in 1 hour</li>
                            <li>If you don't click the link, no action will be taken on your account</li>
                            <li>If you didn't request this deletion, please change your password immediately and contact our support team</li>
                        </ul>
                    </div>
                    
                    <p>If you did not request to delete your account, please ignore this email and ensure your account security.</p>
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
            "Error sending deletion confirmation email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Deletion confirmation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendDeletionConfirmationEmail:", error);
    throw error;
  }
};
