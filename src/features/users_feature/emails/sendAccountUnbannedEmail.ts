import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendAccountUnbannedEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const loginLink = `${process.env.FRONTEND_URL}/auth/login`;
    const guidelinesLink = `${process.env.FRONTEND_URL}/community-guidelines`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Your Account Access Has Been Restored`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Access Restored</title>
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
                    color: #28a745;
                    margin-bottom: 20px;
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
                .unban-info {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .features-restored {
                    background-color: #e8f5e9;
                    border: 1px solid #c8e6c9;
                    color: #2e7d32;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .reminder {
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
                    <h2 class="message-title">Account Access Restored</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <div class="unban-info">
                        <p><strong>Good News!</strong></p>
                        <p>Your account restrictions have been lifted, and your full access to ${siteName} has been restored.</p>
                       <p><strong>Restoration Date:</strong> ${user.accountUnbannedAt ? new Date(user.accountUnbannedAt).toLocaleDateString() : "N/A"}</p>

                        ${user.accountUnbannedComment ? `<p><strong>Additional Notes:</strong> ${user.accountUnbannedComment}</p>` : ""}
                    </div>
                    
                    <div class="features-restored">
                        <p><strong>Your Restored Features Include:</strong></p>
                        <ul>
                            <li>Creating new posts and content</li>
                            <li>Commenting on other users' content</li>
                            <li>Liking and sharing content</li>
                            <li>Following and messaging other users</li>
                            <li>Participating in community discussions</li>
                        </ul>
                    </div>

                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Log In Now</a>
                    </div>
                    
                    <div class="reminder">
                        <p><strong>Friendly Reminder:</strong></p>
                        <p>Please continue to follow our <a href="${guidelinesLink}">Community Guidelines</a> to maintain a positive experience for everyone. Future violations may result in additional restrictions.</p>
                    </div>
                    
                    <p>We appreciate your understanding during the restriction period and look forward to your continued participation in our community.</p>
                    
                    <p>If you have any questions about your account status, please don't hesitate to contact our support team at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a>.</p>
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
          console.error("Error sending account unbanned email:", err.message);
          reject(err);
        } else {
          console.log("Account unbanned email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAccountUnbannedEmail:", error);
    throw error;
  }
};
