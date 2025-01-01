import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendReactivationConfirmationEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create reactivation link
    const reactivationLink = `${process.env.FRONTEND_URL}/confirm-reactivation/${user.reactivationAccountToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Account Reactivation Request`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Reactivation Request</title>
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
                .reactivation-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #27ae60;
                    margin: 15px 0;
                }
                .info-box {
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
                    <h2 class="message-title">Account Reactivation Request</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We received a request to reactivate your ${siteName} account. If you made this request, please click the button below to reactivate your account.</p>
                    
                    <div class="info-box">
                        <p><strong>Important:</strong> After clicking the reactivation link, you'll be able to log in using your existing email and password.</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${reactivationLink}" class="button">Reactivate Account</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="reactivation-link">
                        ${reactivationLink}
                    </div>
                    
                    <div class="security-info">
                        <p><strong>Important Information:</strong></p>
                        <ul>
                            <li>This reactivation link will expire in 1 hour</li>
                            <li>You have 4 attempts to request a reactivation link every 48 hours</li>
                            <li>If you didn't request this reactivation, you can safely ignore this email</li>
                            <li>Your account will remain deactivated unless you click the reactivation link</li>
                        </ul>
                    </div>
                    
                    <p>If you didn't request this reactivation, please ignore this email. Your account will remain deactivated and secure.</p>
                    
                    <p>If you're having trouble reactivating your account or have any questions, please don't hesitate to contact our support team.</p>
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
            "Error sending reactivation confirmation email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Reactivation confirmation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendReactivationConfirmationEmail:", error);
    throw error;
  }
};
