import { IUser } from "@features/users";
import { IBlog } from "../interfaces/blog.interface";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendBlogRepublishEmail = async (
  user: IUser,
  blog: IBlog
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const viewBlogLink = `${process.env.FRONTEND_URL}/blog/${blog.slug}`;
    const dashboardLink = `${process.env.FRONTEND_URL}/dashboard/blogs`;

    const mailOptions = {
      from: `${siteName} Content Team <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Good News: Your Blog Post Has Been Republished`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Content Republished - ${siteName}</title>
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
                    background-color: #f0f9f0;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #c8e6c9;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #2e7d32;
                }
                .content {
                    padding: 30px 20px;
                    background-color: #ffffff;
                }
                .success-message {
                    font-size: 24px;
                    color: #2e7d32;
                    margin-bottom: 20px;
                }
                .info-box {
                    background-color: #f0f9f0;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #2e7d32;
                }
                .stats-box {
                    background-color: #e8f5e9;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #43a047;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #2e7d32;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 5px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #1b5e20;
                }
                .secondary-button {
                    background-color: #1976d2;
                }
                .secondary-button:hover {
                    background-color: #0d47a1;
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
                .status-badge {
                    display: inline-block;
                    padding: 5px 10px;
                    background-color: #e8f5e9;
                    color: #2e7d32;
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
                    <div class="logo">${siteName} Content Update</div>
                </div>
                <div class="content">
                    <h2 class="success-message">Good News! Your Blog Post is Back Online</h2>
                    
                    <div class="info-box">
                        <p>Dear ${user.firstName},</p>
                        <p>We're pleased to inform you that after careful review, your blog post titled "${blog.title}" has been cleared and republished. It is now accessible to the community again.</p>
                        
                        <div class="status-badge">
                            Status: Published & Active
                        </div>
                        
                        <p><strong>Post Details:</strong></p>
                        <ul>
                            <li>Title: ${blog.title}</li>
                            <li>Original Publish Date: ${new Date(blog.publishedAt).toLocaleDateString()}</li>
                            <li>Republished Date: ${new Date().toLocaleDateString()}</li>
                        </ul>
                    </div>
                    
                    <div class="stats-box">
                        <p><strong>Review Outcome:</strong></p>
                        <ul>
                            <li>✅ Content meets community guidelines</li>
                            <li>✅ No violations found</li>
                            <li>✅ Full public access restored</li>
                        </ul>
                        
                        <p>Your post has been fully restored with all original:</p>
                        <ul>
                            <li>Comments and interactions</li>
                            <li>View counts and metrics</li>
                            <li>SEO rankings</li>
                        </ul>
                    </div>
                    
                    <p>Thank you for your patience during our review process. We appreciate your commitment to maintaining high-quality content on our platform.</p>
                    
                    <div style="text-align: center;">
                        <a href="${viewBlogLink}" class="button">View Your Post</a>
                        <a href="${dashboardLink}" class="button secondary-button">Go to Dashboard</a>
                    </div>
                    
                    <p>Keep up the great work! We look forward to seeing more of your valuable contributions to our community.</p>
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
          console.error("Error sending blog republish email:", err.message);
          reject(err);
        } else {
          console.log("Blog republish email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendBlogRepublishEmail:", error);
    throw error;
  }
};
