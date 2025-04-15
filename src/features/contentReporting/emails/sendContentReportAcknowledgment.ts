import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendContentReportAcknowledgment = async (
  user: IUser,
  reportId: string
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    // Create link to report tracking page (optional)
    const reportStatusLink = `${process.env.FRONTEND_URL}/reports/status/${reportId}`;

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `Your Content Report - ${siteName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Content Report Received - ${siteName}</title>
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
                .info-box {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 15px 0;
                }
                .alert {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .alert-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .process-steps {
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
                    <h2 class="title">We've Received Your Content Report</h2>
                    
                    <p>Hello ${user.firstName},</p>
                    
                    <p>Thank you for bringing potential concerns to our attention. We've received your report regarding content on our platform and have assigned it tracking ID: <strong>${reportId}</strong>.</p>
                    
                    <div class="alert">
                        <div class="alert-title">✓ Report Successfully Submitted</div>
                        <p>Your report has been logged in our system and will be reviewed by our content moderation team. No further action is required from you at this time.</p>
                    </div>
                    
                    <div class="process-steps">
                        <p><strong>What happens next:</strong></p>
                        <ul>
                            <li>Our content moderation team will review the reported content</li>
                            <li>We will evaluate the content against our community guidelines</li>
                            <li>Appropriate action will be taken based on our review findings</li>
                            <li>The content may be removed, modified, or left unchanged depending on our assessment</li>
                        </ul>
                    </div>
                    
                    <p>We take all reports seriously and are committed to maintaining a safe and respectful environment on ${siteName}. While you won't receive a notification about the outcome of our review, you can be confident that we will take appropriate measures if the content violates our policies.</p>
                    
                    <div class="info-box">
                        <p><strong>Note:</strong> For privacy and security reasons, we cannot disclose specific actions taken regarding other users' content. Rest assured that each report is thoroughly evaluated.</p>
                    </div>
                    
                    <p>If you have any additional concerns or observe other content that may violate our community guidelines, please don't hesitate to submit another report.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>Questions? Contact our support team at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
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
            "Error sending content report acknowledgment email:",
            err.message
          );
          reject(err);
        } else {
          console.log("Content report acknowledgment email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendContentReportAcknowledgment:", error);
    throw error;
  }
};
