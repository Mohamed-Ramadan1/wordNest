import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendNewEmailVerificationEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create verification link
    const verificationLink = `${process.env.FRONTEND_URL}/users/account/email/verify-new-email/${user.tempChangeEmailVerificationToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.tempChangedEmail, // Send to the new email address
      subject: `${siteName} - Verify Your New Email Address`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify New Email Address</title>
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
                    background-color: #27ae60;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #219a52;
                }
                .verification-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #27ae60;
                    margin: 15px 0;
                }
                .account-info {
                    background-color: #e8f5e9;
                    border: 1px solid #c8e6c9;
                    color: #2e7d32;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .security-info {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .warning-info {
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
                    <h2 class="message-title">Verify Your New Email Address</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>You're almost done changing your email address on ${siteName}. To complete the process and verify your new email address, please click the button below:</p>
                    
                    <div class="account-info">
                        <p><strong>Account Information:</strong></p>
                        <ul>
                            <li>Account Name: ${user.firstName} ${user.lastName}</li>
                            <li>Previous Email: ${user.email}</li>
                            <li>New Email: ${user.tempChangedEmail}</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${verificationLink}" class="button">Verify Email Address</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="verification-link">
                        ${verificationLink}
                    </div>
                    
                    <div class="security-info">
                        <p><strong>Important Information:</strong></p>
                        <ul>
                            <li>This verification link will expire in 1 hour</li>
                            <li>Your current email will remain active until you verify this new email</li>
                            <li>After verification, all future communications will be sent to this new email address</li>
                            <li>Your account settings and data will remain unchanged</li>
                        </ul>
                    </div>
                    
                    <div class="warning-info">
                        <p><strong>Note:</strong> If you did not request to change your email address on ${siteName}, please ignore this email and contact our support team immediately.</p>
                    </div>
                    
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
            "Error sending new email verification email:",
            err.message
          );
          reject(err);
        } else {
          console.log("New email verification email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendNewEmailVerificationEmail:", error);
    throw error;
  }
};
