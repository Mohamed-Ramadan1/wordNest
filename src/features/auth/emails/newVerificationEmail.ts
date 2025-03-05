import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendNewVerificationEmail = async (user: IUser): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create new verification link using environment variable and the newly generated token
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email/${user.emailVerificationToken}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `New Verification Link for Your ${siteName} Account`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Verification Link - ${siteName}</title>
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
                .alert {
                    background-color: #fff3cd;
                    border: 1px solid #ffeeba;
                    color: #856404;
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
                    <h2 class="title">New Verification Link Requested</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>We received a request for a new verification link for your ${siteName} account. Your previous verification link has expired, but no worries - we've generated a new one for you!</p>
                    
                    <div style="text-align: center;">
                        <a href="${verificationLink}" class="button">Verify Email Address</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <div class="verification-link">
                        ${verificationLink}
                    </div>
                    
                    <div class="alert">
                        <div class="alert-title">⚠️ Security Notice</div>
                        <p>If you did not request this verification link or haven't signed up for ${siteName}, please ignore this email. Your email address may have been entered by mistake.</p>
                    </div>
                    
                    <div class="security-note">
                        <p><strong>Important Information:</strong></p>
                        <ul>
                            <li>This new verification link will expire in 1 hour</li>
                            <li>For security reasons, only the most recent verification link will work</li>
                            <li>If you need another link, you can request one from the verification page</li>
                        </ul>
                    </div>
                    
                    <p>Once verified, you'll have full access to all ${siteName} features, including:</p>
                    <ul>
                        <li>Creating and publishing blog posts</li>
                        <li>Following other writers</li>
                        <li>Engaging with the community</li>
                    </ul>
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
          console.error("Error sending new verification email:", err.message);
          reject(err);
        } else {
          console.log("New verification email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendNewVerificationEmail:", error);
    throw error;
  }
};
