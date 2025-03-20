import { ISupportTicket } from "../interfaces/supportTicket.interface";
import { IUser } from "@features/users";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendAdminResponseEmail = async (
  ticket: ISupportTicket,
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();
    const ticketUrl = `${process.env.FRONTEND_URL}/support/tickets/${ticket._id}`;

    // Extract the last admin response directly from the ticket
    const lastAdminResponse =
      ticket.adminResponses[ticket.adminResponses.length - 1];

    if (!lastAdminResponse) {
      throw new Error("No admin response found in the ticket.");
    }

    // Format the respondedAt date
    const respondedAtDate = new Date(lastAdminResponse.respondedAt);
    const formattedDate = !isNaN(respondedAtDate.getTime())
      ? respondedAtDate.toLocaleString("en-US", {
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
      subject: `[${ticket._id}] Update on Your Support Ticket - ${siteName}`,
      html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Response</title>
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
                    .admin-response {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .admin-response h3 {
                        margin-top: 0;
                        color: #007bff;
                    }
                    .admin-response p {
                        margin: 10px 0;
                    }
                    .attachments {
                        margin-top: 20px;
                    }
                    .attachments img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 5px;
                        margin-top: 10px;
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
                        <h2>Update on Your Support Ticket</h2>
                        <p>Hello ${user.firstName},</p>
                        <p>Our support team has responded to your ticket. Below are the details of the response:</p>
                        
                        <div class="ticket-info">
                            <h3>Ticket Details:</h3>
                            <p><strong>Ticket ID:</strong> ${ticket._id}</p>
                            <p><strong>Subject:</strong> ${ticket.subject}</p>
                            <p><strong>Category:</strong> ${ticket.category}</p>
                            <p><strong>Status:</strong> ${ticket.status}</p>
                            <p><strong>Response Date:</strong> ${formattedDate}</p>
                        </div>
    
                        <div class="admin-response">
                            <h3>Admin Response:</h3>
                            <p>${lastAdminResponse.message}</p>
                            ${
                              lastAdminResponse.attachment
                                ? `
                                <div class="attachments">
                                    <p><strong>Attachment:</strong></p>
                                    <img src="${lastAdminResponse.attachment.imageLink}" alt="Attachment" />
                                </div>
                                `
                                : ""
                            }
                        </div>
                        
                        <div style="text-align: center;">
                            <a href="${ticketUrl}" class="button">View Ticket</a>
                        </div>
                        
                        <p>If you have any further questions or need additional assistance, please feel free to respond to this email or click the button above to view the ticket.</p>
    
                        <!-- Thank-You Message -->
                        <p style="margin-top: 20px; font-style: italic; color: #555;">
                            Thank you for being a valued part of our community! We're here to help and will continue to work with you until your issue is resolved.
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
          console.error("Error sending admin response email:", err.message);
          reject(err);
        } else {
          console.log("Admin response email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendAdminResponseEmail:", error);
    throw error;
  }
};
