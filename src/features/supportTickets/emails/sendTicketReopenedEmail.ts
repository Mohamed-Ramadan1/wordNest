import { ISupportTicket } from "../interfaces/supportTicket.interface";
import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendTicketReopenedEmail = async (
  ticket: ISupportTicket,
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();
    const viewTicketUrl = `${process.env.FRONTEND_URL}/support/ticket/${ticket._id}`; // URL to view the reopened ticket

    // Format the reopenedAt date
    const reopenedAtDate = new Date(ticket.reopenedAt || new Date());
    const formattedDate = !isNaN(reopenedAtDate.getTime())
      ? reopenedAtDate.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })
      : "N/A";

    const mailOptions = {
      from: `${siteName} Support <${siteOfficialEmail}>`,
      to: user.email,
      subject: `[${ticket._id}] Your Support Ticket Has Been Reopened - ${siteName}`,
      html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Support Ticket Reopened</title>
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
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      padding: 20px 0;
                      background: linear-gradient(135deg, #007bff, #0056b3);
                      border-radius: 8px 8px 0 0;
                      color: #ffffff;
                  }
                  .logo {
                      font-size: 28px;
                      font-weight: bold;
                      color: #ffffff;
                  }
                  .content {
                      padding: 30px 20px;
                  }
                  .ticket-info {
                      background-color: #f8f9fa;
                      padding: 20px;
                      border-radius: 5px;
                      margin: 20px 0;
                  }
                  .button {
                      display: inline-block;
                      padding: 14px 28px;
                      background: linear-gradient(135deg, #007bff, #0056b3);
                      color: #ffffff !important;
                      text-decoration: none;
                      border-radius: 5px;
                      margin: 20px 0;
                      font-weight: bold;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      transition: background 0.3s ease;
                  }
                  .button:hover {
                      background: linear-gradient(135deg, #0056b3, #007bff);
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
                  .footer a {
                      color: #007bff;
                      text-decoration: none;
                  }
                  .footer a:hover {
                      text-decoration: underline;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <div class="logo">${siteName} Support</div>
                  </div>
                  <div class="content">
                      <h2>Support Ticket Reopened</h2>
                      <p>Hello ${user.firstName},</p>
                      <p>Your support ticket has been reopened for further assistance. Here are the details:</p>
                      
                      <div class="ticket-info">
                          <h3>Ticket Details:</h3>
                          <p><strong>Ticket ID:</strong> ${ticket._id}</p>
                          <p><strong>Subject:</strong> ${ticket.subject}</p>
                          <p><strong>Category:</strong> ${ticket.category}</p>
                          <p><strong>Reopened On:</strong> ${formattedDate}</p>
                      </div>
  
                      <p>Our support team will review your ticket and provide additional assistance. You can view your ticket and any updates by clicking the button below:</p>
  
                      <div style="text-align: center;">
                          <a href="${viewTicketUrl}" class="button">View Ticket</a>
                      </div>
  
                      <!-- Response Time Notice -->
                      <p style="margin-top: 20px; font-style: italic; color: #555;">
                          We aim to respond to all reopened tickets within 24 hours. Thank you for your patience.
                      </p>
  
                      <!-- Additional Information -->
                      <p style="margin-top: 20px;">
                          If you have any additional information to add to your ticket, please reply to this email or use the ticket portal to update your case.
                      </p>
                  </div>
                  <div class="footer">
                      <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                      <p>If you have any questions, contact us at <a href="mailto:${siteOfficialEmail}">${siteOfficialEmail}</a></p>
                      <p>Follow us: 
                          <a href="https://twitter.com/${siteName}" target="_blank">Twitter</a> | 
                          <a href="https://facebook.com/${siteName}" target="_blank">Facebook</a>
                      </p>
                  </div>
              </div>
          </body>
          </html>
        `,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err: Error | null, info: any) => {
        if (err) {
          console.error("Error sending ticket reopened email:", err.message);
          reject(err);
        } else {
          console.log("Ticket reopened email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendTicketReopenedEmail:", error);
    throw error;
  }
};
