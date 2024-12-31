import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendDeletionAccountSuccess = async (
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 30);
    const formattedDeletionDate = deletionDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const mailOptions = {
      from: `${siteName} <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${siteName} - We'll Miss You`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>We'll Miss You</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    background-color: #f3f4f6;
                }
                .container {
                    max-width: 550px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                }
                .header {
                    text-align: center;
                    padding: 40px 0;
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                    color: white;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: -0.5px;
                }
                .content {
                    padding: 32px;
                }
                .farewell-box {
                    text-align: center;
                    background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
                    padding: 24px;
                    border-radius: 16px;
                    margin-bottom: 24px;
                }
                .farewell-message {
                    font-size: 15px;
                    color: #4b5563;
                    margin: 0;
                }
                .countdown-box {
                    background: linear-gradient(to right, #fecaca 0%, #fee2e2 100%);
                    padding: 20px;
                    border-radius: 16px;
                    text-align: center;
                    color: #991b1b;
                    margin-bottom: 24px;
                }
                .info-box {
                    background: #f9fafb;
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 24px;
                }
                .info-box h3 {
                    margin: 0 0 12px 0;
                    color: #1f2937;
                    font-size: 16px;
                }
                .info-box ul {
                    margin: 0;
                    padding-left: 20px;
                    color: #4b5563;
                }
                .info-box li {
                    margin: 8px 0;
                }
                .action-box {
                    text-align: center;
                    padding: 16px;
                    border-radius: 16px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    border-radius: 99px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }
                .primary-button {
                    background: #4f46e5;
                    color: white !important;
                }
                .primary-button:hover {
                    background: #4338ca;
                    transform: translateY(-1px);
                }
                .secondary-button {
                    background: #6b7280;
                    color: white !important;
                    margin-left: 12px;
                }
                .secondary-button:hover {
                    background: #4b5563;
                    transform: translateY(-1px);
                }
                .footer {
                    text-align: center;
                    padding: 24px;
                    background: #f9fafb;
                    border-top: 1px solid #f3f4f6;
                    font-size: 13px;
                    color: #6b7280;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        margin: 0;
                        border-radius: 0;
                    }
                    .content {
                        padding: 24px;
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
                    <div class="farewell-box">
                        <p class="farewell-message">
                            Dear ${user.firstName}, we're sad to see you go. Thank you for being part of our community. We hope our paths cross again in the future.
                        </p>
                    </div>
                    
                    <div class="countdown-box">
                        <div style="font-size: 15px; font-weight: 600;">Account Deletion Date</div>
                        <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">
                            ${formattedDeletionDate}
                        </div>
                    </div>
                    
                    <div class="info-box">
                        <h3>Important Information</h3>
                        <ul>
                            <li>Your account is now suspended and will be deleted on ${formattedDeletionDate}</li>
                            <li>You have 30 days to recover your account if you change your mind</li>
                            <li>After deletion, you can register a new account with the same email</li>
                        </ul>
                    </div>
                    
                    <div class="action-box">
                        <a href="mailto:${siteOfficialEmail}" class="button primary-button">Contact Support</a>
                        <a href="${process.env.FRONTEND_URL}/feedback" class="button secondary-button">Share Feedback</a>
                    </div>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>Questions? Email us at ${siteOfficialEmail}</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err: Error | null, info: any) => {
        if (err) {
          console.error("Error sending deletion processed email:", err.message);
          reject(err);
        } else {
          console.log("Deletion processed email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendDeletionProcessedEmail:", error);
    throw error;
  }
};
