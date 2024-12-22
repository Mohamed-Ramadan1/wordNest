import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendPasswordChangedEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const loginLink = `${process.env.FRONTEND_URL}/login`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `Password Successfully Changed - ${siteName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed - ${siteName}</title>
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
                .success-icon {
                    text-align: center;
                    font-size: 48px;
                    margin: 20px 0;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #28a745;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #218838;
                }
                .alert {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .alert-title {
                    font-weight: bold;
                    margin-bottom: 5px;
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
                    <div class="success-icon">✅</div>
                    <h2 class="title">Password Successfully Changed</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>Your password has been successfully changed. You can now sign in to your account using your new password.</p>
                    
                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Sign In Now</a>
                    </div>
                    
                    <div class="alert">
                        <div class="alert-title">🔒 Security Information</div>
                        <p>This change was made on ${new Date().toLocaleString()} from a device that accessed your account.</p>
                        <p>If you did not make this change, please contact our support team immediately.</p>
                    </div>
                    
                    <div class="security-note">
                        <p><strong>Account Security Tips:</strong></p>
                        <ul>
                            <li>Never share your password with anyone</li>
                            <li>Use unique passwords for different accounts</li>
                            <li>Enable two-factor authentication for added security</li>
                            <li>Always sign out when using shared devices</li>
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
          console.error("Error sending password changed email:", err.message);
          reject(err);
        } else {
          console.log("Password changed email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendPasswordChangedEmail:", error);
    throw error;
  }
};
