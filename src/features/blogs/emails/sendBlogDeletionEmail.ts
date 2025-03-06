import { IUser } from "@features/users";
import { IBlog } from "../interfaces/blog.interface";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendBlogDeletionEmail = async (
  user: IUser,
  blog: IBlog
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const guidelinesLink = `${process.env.FRONTEND_URL}/community-guidelines`;

    const mailOptions = {
      from: `${siteName} Content Team <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Important Notice: Your Blog Post Has Been Removed`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Content Removal Notice - ${siteName}</title>
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
                    background-color: #f8f0ff;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #e6d8ff;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #6200ee;
                }
                .content {
                    padding: 30px 20px;
                    background-color: #ffffff;
                }
                .warning-message {
                    font-size: 24px;
                    color: #6200ee;
                    margin-bottom: 20px;
                }
                .info-box {
                    background-color: #f8f0ff;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #6200ee;
                }
                .violation-list {
                    background-color: #fff0f0;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #ff3d00;
                }
                .action-steps {
                    background-color: #f0f8ff;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #0091ea;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #6200ee;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #3700b3;
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
                .status-indicator {
                    display: inline-block;
                    padding: 5px 10px;
                    background-color: #fff3cd;
                    color: #856404;
                    border-radius: 3px;
                    font-weight: bold;
                    margin: 10px 0;
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
                    <div class="logo">${siteName} Content Notice</div>
                </div>
                <div class="content">
                    <h2 class="warning-message">Important: Blog Post Removed</h2>
                    
                    <div class="info-box">
                        <p>Dear ${user.firstName},</p>
                        <p>We regret to inform you that your blog post titled "${blog.title}" has been removed from our platform due to violations of our Community Standards.</p>
                        
                        <p><strong>Post Details:</strong></p>
                        <ul>
                            <li>Post Title: ${blog.title}</li>
                            <li>Published Date: ${new Date(blog.publishedAt).toLocaleDateString()}</li>
                            <li>Removal Date: ${new Date().toLocaleDateString()}</li>
                        </ul>
                    </div>
                    
                    <div class="violation-list">
                        <p><strong>Community Guidelines Violations:</strong></p>
                        <ul>
                            <li>Violation of content policies</li>
                            <li>Non-compliance with community standards</li>
                            <li>Multiple reported issues from community members</li>
                        </ul>
                        
                        <div class="status-indicator">
                            Account Status: Warning Level 1
                        </div>
                    </div>
                    
                    <div class="action-steps">
                        <p><strong>Required Actions:</strong></p>
                        <ul>
                            <li>Review our Community Guidelines</li>
                            <li>Ensure all your content complies with our standards</li>
                            <li>Consider revising and resubmitting your content</li>
                        </ul>
                        
                        <p><strong>Important Notice:</strong> Repeated violations may result in:</p>
                        <ul>
                            <li>Account suspension</li>
                            <li>Permanent account ban</li>
                            <li>Account deletion</li>
                        </ul>
                        
                        <div style="text-align: center;">
                            <a href="${guidelinesLink}" class="button">Review Guidelines</a>
                        </div>
                    </div>
                    
                    <p>If you believe this decision was made in error, you may submit an appeal within 7 days. Please include detailed information supporting your case.</p>
                    
                    <p>We value your contributions to our community and encourage you to continue sharing while adhering to our guidelines.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>For content-related inquiries, contact us at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err: Error | null, info: any) => {
        if (err) {
          console.error("Error sending blog deletion email:", err.message);
          reject(err);
        } else {
          console.log("Blog deletion email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendBlogDeletionEmail:", error);
    throw error;
  }
};
