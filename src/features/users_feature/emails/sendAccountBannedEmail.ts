import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendAccountBannedEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Calculate ban end date
    // Calculate ban end date
    const banEndDate =
      user.accountBannedAt && user.accountBandPeriodDays
        ? new Date(
            new Date(user.accountBannedAt).getTime() +
              user.accountBandPeriodDays * 24 * 60 * 60 * 1000
          )
        : undefined;

    const termsLink = `${process.env.FRONTEND_URL}/terms`;
    const guidelinesLink = `${process.env.FRONTEND_URL}/community-guidelines`;
    const loginLink = `${process.env.FRONTEND_URL}/auth/login`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Account Restrictions Notice`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Restrictions Notice</title>
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
                    color: #dc3545;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #6c757d;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #5a6268;
                }
                .ban-info {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .duration-info {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .access-info {
                    background-color: #e2e3e5;
                    border: 1px solid #d6d8db;
                    color: #383d41;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .restricted-features {
                    background-color: #f8f9fa;
                    border: 1px solid #e9ecef;
                    color: #495057;
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
                    <h2 class="message-title">Account Restrictions Notice</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <div class="ban-info">
                        <p><strong>Notice of Account Restrictions</strong></p>
                        <p>Your account privileges have been temporarily restricted on ${siteName}.</p>
                        <p><strong>Reason:</strong><br>
                        ${user.accountBannedReason || "Violation of community guidelines"}</p>
                    </div>
                    
                    <div class="duration-info">
                        <p><strong>Restriction Period:</strong></p>
                         <ul>
                        <li>Start Date: ${user.accountBannedAt ? new Date(user.accountBannedAt).toLocaleDateString() : "N/A"}</li>
                        <li>Duration: ${user.accountBandPeriodDays || "N/A"} days</li>
                        ${banEndDate ? `<li>End Date: ${new Date(banEndDate).toLocaleDateString()}</li>` : ""}
                         </ul>
                    </div>

                    <div class="access-info">
                        <p><strong>What You Can Still Do:</strong></p>
                        <ul>
                            <li>Access your account and log in</li> 
                            <li>View your existing content and profile</li>
                            <li>Read other users' content</li>
                            <li>Access your account settings</li>
                        </ul>
                    </div>
                    
                    <div class="restricted-features">
                        <p><strong>Temporarily Restricted Features:</strong></p>
                        <ul>
                            <li>Creating new posts or content</li>
                            <li>Commenting on other users' content</li>
                            <li>Liking or sharing content</li>
                            <li>Following or messaging other users</li>
                            <li>Participating in community discussions</li>
                        </ul>
                    </div>

                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Access Your Account</a>
                    </div>
                    
                    <p>Please use this time to review our <a href="${termsLink}">Terms of Service</a> and <a href="${guidelinesLink}">Community Guidelines</a>. Your account privileges will be automatically restored when the restriction period ends.</p>
                    
                    <p><strong>Important:</strong> Future violations may result in longer restrictions or permanent account termination.</p>
                    
                    <p>If you need to discuss this matter, please contact our support team at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a>.</p>
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
          console.error("Error sending account banned email:", err.message);
          reject(err);
        } else {
          console.log("Account banned email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAccountBannedEmail:", error);
    throw error;
  }
};
