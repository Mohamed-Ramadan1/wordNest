import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendVerificationSuccessEmail = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const loginLink = `${process.env.FRONTEND_URL}/login`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `Account Verified Successfully - Welcome to ${siteName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Verified - ${siteName}</title>
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
                .success-message {
                    font-size: 24px;
                    color: #27ae60;
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
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                .feature-card {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 5px;
                    text-align: center;
                }
                .feature-title {
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 10px;
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
                    .features-grid {
                        grid-template-columns: 1fr;
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
                    <h2 class="success-message">🎉 Account Verified Successfully!</h2>
                    
                    <p>Dear ${user.firstName},</p>
                    
                    <p>Great news! Your email has been successfully verified, and your account is now fully activated. You're ready to dive into all the amazing features ${siteName} has to offer!</p>
                    
                    <div style="text-align: center;">
                        <a href="${loginLink}" class="button">Start Exploring</a>
                    </div>
                    
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-title">Share Your Stories</div>
                            <p>Create and publish your blog posts to share your thoughts, experiences, and expertise with our community.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-title">Connect & Follow</div>
                            <p>Follow other writers you admire and build your own following of readers interested in your content.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-title">Engage & Interact</div>
                            <p>Comment on posts, participate in discussions, and connect with like-minded individuals in our community.</p>
                        </div>
                    </div>
                    
                    <p>Here are some quick tips to get started:</p>
                    <ul style="padding-left: 20px;">
                        <li>Complete your profile to help others find and connect with you</li>
                        <li>Write your first blog post to introduce yourself to the community</li>
                        <li>Explore content from other writers and follow those who inspire you</li>
                    </ul>
                    
                    <p>If you have any questions or need assistance, our support team is always here to help!</p>
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
          console.error(
            "Error sending verification success email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Verification success email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendVerificationSuccessEmail:", error);
    throw error;
  }
};
