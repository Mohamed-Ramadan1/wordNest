import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendDeactivationAccountSuccess = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Your Account Has Been Deactivated`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Deactivation Notice</title>
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
                .important-info {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .important-info ul {
                    margin: 0;
                    padding-left: 20px;
                }
                .important-info li {
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
                    <div class="logo">${siteName}</div>
                </div>
                <div class="content">
                    <h2 class="message-title">Account Successfully Deactivated</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>Your account has been successfully deactivated as requested. We're sorry to see you go, but we respect your decision.</p>
                    
                    <div class="important-info">
                        <p><strong>Important Information About Reactivating Your Account:</strong></p>
                        <ul>
                            <li>Your account is now fully deactivated and you cannot log in until reactivation is completed.</li>
                            <li>To reactivate your account in the future, visit our login page and click on the "Reactivate Account" option.</li>
                            <li>Once you request reactivation, we will send you an email with a secure link.</li>
                            <li>The reactivation link in that email will be valid for 1 hour for security reasons.</li>
                            <li>You will be limited to 4 reactivation attempts within a 48-hour period.</li>
                            <li>If you don't receive the reactivation email, please check your spam folder.</li>
                            <li>After successful reactivation, you can log in using your previous email and password.</li>
                        </ul>
                    </div>
                    
                    <p>We hope to see you back soon! If you have any questions or concerns, please don't hesitate to contact our support team.</p>
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
          console.error("Error sending deactivation email:", err.message);
          reject(err);
        } else {
          console.log("Account deactivation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAccountDeactivationEmail:", error);
    throw error;
  }
};
