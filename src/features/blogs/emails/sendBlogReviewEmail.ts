import { IUser } from "@features/users";
import { IBlog } from "../interfaces/blog.interface";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendBlogReviewEmail = async (
  user: IUser,
  blog: IBlog
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const viewBlogLink = `${process.env.FRONTEND_URL}/dashboard/blogs/${blog._id}`;
    const guidelinesLink = `${process.env.FRONTEND_URL}/community-guidelines`;

    const mailOptions = {
      from: `${siteName} Content Team <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - Notice: Your Blog Post Is Under Review`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Content Review Notice - ${siteName}</title>
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
                    background-color: #fff8e1;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #ffe082;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #ffa000;
                }
                .content {
                    padding: 30px 20px;
                    background-color: #ffffff;
                }
                .notice-message {
                    font-size: 24px;
                    color: #ffa000;
                    margin-bottom: 20px;
                }
                .info-box {
                    background-color: #fff8e1;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #ffa000;
                }
                .review-details {
                    background-color: #f5f5f5;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #757575;
                }
                .next-steps {
                    background-color: #e3f2fd;
                    padding: 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                    border-left: 4px solid #2196f3;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #ffa000;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
                    background-color: #ff6f00;
                }
                .secondary-button {
                    background-color: #2196f3;
                }
                .secondary-button:hover {
                    background-color: #1976d2;
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
                    <div class="logo">${siteName} Content Review</div>
                </div>
                <div class="content">
                    <h2 class="notice-message">Blog Post Under Review</h2>
                    
                    <div class="info-box">
                        <p>Dear ${user.firstName},</p>
                        <p>Your blog post titled "${blog.title}" has been temporarily unpublished and is currently under review by our content moderation team.</p>
                        
                        <div class="status-badge">
                            Current Status: Under Review
                        </div>
                        
                        <p><strong>Post Details:</strong></p>
                        <ul>
                            <li>Post Title: ${blog.title}</li>
                            <li>Published Date: ${new Date(blog.publishedAt).toLocaleDateString()}</li>
                            <li>Review Started: ${new Date().toLocaleDateString()}</li>
                        </ul>
                    </div>
                    
                    <div class="review-details">
                        <p><strong>What This Means:</strong></p>
                        <ul>
                            <li>Your post is temporarily hidden from public view</li>
                            <li>You retain full access to view and edit the post</li>
                            <li>Our team will review the content for compliance with community guidelines</li>
                            <li>You will receive a follow-up email with our decision</li>
                        </ul>
                    </div>
                    
                    <div class="next-steps">
                        <p><strong>Available Actions:</strong></p>
                        <ul>
                            <li>You can still access and edit your post during the review</li>
                            <li>Consider reviewing our community guidelines</li>
                            <li>You may provide additional context or make updates to your post</li>
                        </ul>
                        
                        <p><strong>Possible Outcomes:</strong></p>
                        <ul>
                            <li>Post republished if found compliant</li>
                            <li>Request for specific modifications</li>
                            <li>Post removal if found in violation</li>
                        </ul>
                        
                        <div style="text-align: center;">
                            <a href="${viewBlogLink}" class="button">View Your Post</a>
                            <a href="${guidelinesLink}" class="button secondary-button">Review Guidelines</a>
                        </div>
                    </div>
                    
                    <p>Our content moderation team aims to complete the review process within 48-72 hours. You will be notified immediately once a decision has been made.</p>
                    
                    <p>If you have any questions or would like to provide additional context for the review, please reply to this email.</p>
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
          console.error("Error sending blog review email:", err.message);
          reject(err);
        } else {
          console.log("Blog review email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendBlogReviewEmail:", error);
    throw error;
  }
};
