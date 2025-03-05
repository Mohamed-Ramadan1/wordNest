import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendReactivationSuccessEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create login link
    const loginLink = `${process.env.FRONTEND_URL}/auth/login`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Your Account Has Been Successfully Reactivated`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Successfully Reactivated</title>
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
                .success-icon {
                    text-align: center;
                    margin: 20px 0;
                    font-size: 48px;
                }
                .welcome-message {
                    text-align: center;
                    font-size: 20px;
                    color: #27ae60;
                    margin: 20px 0;
                    font-weight: 500;
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
                .success-box {
                    background-color: #e8f5e9;
                    border: 1px solid #c8e6c9;
                    color: #2e7d32;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    text-align: center;
                }
                .next-steps {
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
                    <div class="success-icon">
                        ✅
                    </div>
                    
                    <h2 class="message-title">Welcome Back!</h2>
                    
                    <p>Hello ${user.firstName},</p>

                    <div class="welcome-message">
                        We're so happy to see you here again! 🎉
                    </div>
                    
                    <div class="success-box">
                        <h3>Your account has been successfully reactivated!</h3>
                        <p>You can now access all your account features and services. We've missed having you as part of our community!</p>
                    </div>
                    
                    <div class="next-steps">
                        <h3>Next Steps:</h3>
                        <ul>
                            <li>Log in using your existing email and password</li>
                            <li>Review your account settings and preferences</li>
                            <li>Update your security settings if needed</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Log In Now</a>
                    </div>
                    
                    <p style="margin-top: 30px;">If you have any questions or need assistance, our support team is here to help. Don't hesitate to reach out to us.</p>
                    
                    <p>Thank you for being a part of the ${siteName} community again. We look forward to providing you with the best possible experience!</p>
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
            "Error sending reactivation success email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Reactivation success email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendReactivationSuccessEmail:", error);
    throw error;
  }
};
