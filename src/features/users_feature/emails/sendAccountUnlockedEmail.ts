import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendAccountUnlockedEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create login link
    const loginLink = `${process.env.FRONTEND_URL}/auth/login`;
    const termsLink = `${process.env.FRONTEND_URL}/terms`;
    const guidelinesLink = `${process.env.FRONTEND_URL}/community-guidelines`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Your Account Has Been Unlocked`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Unlocked Notice</title>
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
                .success-info {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .guidelines-info {
                    background-color: #f8f9fa;
                    border: 1px solid #e9ecef;
                    color: #495057;
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
                    <h2 class="message-title">Good News - Your Account is Now Active!</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <div class="success-info">
                        <p><strong>Your account has been successfully unlocked!</strong></p>
                        <p>You now have full access to all features on ${siteName}, including:</p>
                        <ul>
                            <li>Creating and managing blog posts</li>
                            <li>Interacting with other users' content</li>
                            <li>Accessing all platform features</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Login to Your Account</a>
                    </div>
                    
                    <div class="guidelines-info">
                        <p><strong>Moving Forward:</strong></p>
                        <ul>
                            <li>Review our <a href="${termsLink}">Terms of Service</a></li>
                            <li>Familiarize yourself with our <a href="${guidelinesLink}">Community Guidelines</a></li>
                            <li>Maintain respectful interactions with other users</li>
                            <li>Create valuable and meaningful content</li>
                        </ul>
                    </div>
                    
                    <div class="warning-info">
                        <p><strong>Important Reminder:</strong></p>
                        <p>Please ensure you follow our community guidelines and terms of service to maintain good standing. Repeated violations may result in permanent account suspension.</p>
                    </div>
                    
                    <p>We're glad to have you back in our community! If you have any questions or concerns, our support team is here to help.</p>
                    
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
          console.error("Error sending account unlocked email:", err.message);
          reject(err);
        } else {
          console.log("Account unlocked email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAccountUnlockedEmail:", error);
    throw error;
  }
};
