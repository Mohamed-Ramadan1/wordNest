import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendAccountLockedEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create appeal link
    const appealLink = `${process.env.FRONTEND_URL}/users/account/appeal/${user._id}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Your Account Has Been Locked`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Locked Notice</title>
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
                    background-color: #3498db;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #2980b9;
                }
                .account-info {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .reason-info {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .appeal-info {
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
                    <h2 class="message-title">Account Access Restricted</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We are writing to inform you that your account on ${siteName} has been locked.</p>
                    
                    <div class="account-info">
                        <p><strong>Account Details:</strong></p>
                        <ul>
                            <li>Account Name: ${user.firstName} ${user.lastName}</li>
                            <li>Email: ${user.email}</li>
                          <li>Locked Date: ${user.accountLockedAt ? new Date(user.accountLockedAt).toLocaleDateString() : "Not Locked"}</li>

                        </ul>
                    </div>
                    
                    <div class="reason-info">
                        <p><strong>Reason for Account Lock:</strong></p>
                        <p>${user.accountLockedReason || "A violation of our terms of service has been detected."}</p>
                    </div>
                    
                    <div class="appeal-info">
                        <p><strong>What You Can Do:</strong></p>
                        <ul>
                            <li>Submit an appeal to have your account reviewed</li>
                            <li>Contact our support team for assistance</li>
                            <li>Review our terms of service and community guidelines</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${appealLink}" class="button">Submit an Appeal</a>
                    </div>
                    
                    <p>If you believe this is a mistake or would like to discuss this matter further, please contact our support team at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a>.</p>
                    
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
          console.error("Error sending account locked email:", err.message);
          reject(err);
        } else {
          console.log("Account locked email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAccountLockedEmail:", error);
    throw error;
  }
};
