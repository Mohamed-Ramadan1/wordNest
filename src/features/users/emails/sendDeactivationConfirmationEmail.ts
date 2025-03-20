import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendDeactivationConfirmationEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create confirmation link
    const confirmationLink = `${process.env.FRONTEND_URL}/users/account/deactivate-request/${user.deactivationAccountToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Confirm Your Account Deactivation Request`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm Account Deactivation</title>
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
                .confirmation-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #e74c3c;
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
                .security-info {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .reactivation-info {
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
                    <h2 class="message-title">Confirm Account Deactivation</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We received a request to deactivate your ${siteName} account. To ensure the security of your account, we need you to confirm this action.</p>
                    
                    <div class="warning-info">
                        <p><strong>Important:</strong> Once confirmed, your account will be deactivated and you will need to go through the reactivation process to access it again.</p>
                    </div>
                    
                    <p>If you wish to proceed with account deactivation, please click the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="${confirmationLink}" class="button">Confirm Deactivation</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="confirmation-link">
                        ${confirmationLink}
                    </div>
                    
                    <div class="reactivation-info">
                        <p><strong>Reactivation Information:</strong></p>
                        <p>If you wish to reactivate your account in the future:</p>
                        <ul>
                            <li>Try to log in with your existing email and password</li>
                            <li>You'll automatically receive a reactivation link via email</li>
                            <li>The reactivation link will be valid for 1 hour</li>
                            <li>You have 4 attempts to request a reactivation link every 48 hours</li>
                            <li>Click the link and log in again with your credentials to reactivate your account</li>
                        </ul>
                    </div>
                    
                    <div class="security-info">
                        <p><strong>Security Information:</strong></p>
                        <ul>
                            <li>This confirmation link will expire in 1 hour.</li>
                            <li>If you didn't request this deactivation, please change your password immediately and contact our support team.</li>
                            <li>For security reasons, the deactivation process cannot be undone instantly. You'll need to wait for the reactivation process if you change your mind.</li>
                             <li>Please not that your only have 5 attempts to deactivation requests peer-48 hours for security matters.</li>
                            </ul>
                    </div>
                    
                    <p>If you did not request to deactivate your account, please ignore this email and ensure your account security.</p>
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
            "Error sending deactivation confirmation email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Deactivation confirmation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendDeactivationConfirmationEmail:", error);
    throw error;
  }
};
