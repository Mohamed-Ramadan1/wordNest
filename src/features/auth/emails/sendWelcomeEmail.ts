import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendWelcomeEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create verification link using environment variable and the generated token
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email/${user.emailVerificationToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `Welcome to ${siteName} - Please Verify Your Email`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ${siteName}</title>
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
                .welcome-message {
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
                .verification-link {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    word-break: break-all;
                    color: #3498db;
                    margin: 15px 0;
                }
                .features-list {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .features-list ul {
                    margin: 0;
                    padding-left: 20px;
                }
                .features-list li {
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
                    <h2 class="welcome-message">Welcome to ${siteName}, ${user.firstName}!</h2>
                    
                    <p>Thank you for joining our community of writers and readers. We're excited to have you on board!</p>
                    
                    <p>To get started, please verify your email address by clicking the button below:</p>
                    
                    <div style="text-align: center;">
                        <a href="${verificationLink}" class="button">Verify Email Address</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="verification-link">
                        ${verificationLink}
                    </div>
                    
                    <p><strong>Note:</strong> This verification link will expire in 1 hour for security reasons.</p>
                    
                    <div class="features-list">
                        <p><strong>With ${siteName}, you can:</strong></p>
                        <ul>
                            <li>Share your stories with our growing community</li>
                            <li>Connect with other writers and readers</li>
                            <li>Customize your profile and start building your following</li>
                        </ul>
                    </div>
                    
                    <p>If you didn't create an account with ${siteName}, please ignore this email.</p>
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
          console.error("Error sending welcome email:", err.message);
          reject(err);
        } else {
          console.log("Welcome email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
    throw error;
  }
};
