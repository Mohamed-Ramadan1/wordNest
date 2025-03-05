import {
  ISupportTicket,
  SupportTicketPriority,
} from "../interfaces/supportTicket.interface";
import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

// Helper function to get priority color
const getPriorityColor = (priority: SupportTicketPriority): string => {
  const colors = {
    [SupportTicketPriority.LOW]: "#28a745",
    [SupportTicketPriority.MEDIUM]: "#ffc107",
    [SupportTicketPriority.HIGH]: "#fd7e14",
    [SupportTicketPriority.URGENT]: "#dc3545",
  };
  return colors[priority];
};

export const sendTicketCreationEmail = async (
  ticket: ISupportTicket,
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();
    const ticketUrl = `${process.env.FRONTEND_URL}/support/tickets/${ticket._id}`;

    // Format the createdAt date
    const createdAtDate = new Date(ticket.createdAt);
    const formattedDate = !isNaN(createdAtDate.getTime())
      ? createdAtDate.toLocaleString("en-US", {
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
      subject: `[${ticket._id}] Your Support Ticket Has Been Created - ${siteName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Support Ticket Created</title>
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
                .priority-badge {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 3px;
                    color: #ffffff;
                    font-weight: bold;
                    background-color: ${getPriorityColor(ticket.priority)};
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
                    <h2>Support Ticket Created</h2>
                    <p>Hello ${user.firstName},</p>
                    <p>Your support ticket has been successfully created. Our team will review it and respond as soon as possible.</p>
                    
                    <div class="ticket-info">
                        <h3>Ticket Details:</h3>
                        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
                        <p><strong>Subject:</strong> ${ticket.subject}</p>
                        <p><strong>Category:</strong> ${ticket.category}</p>
                        <p><strong>Priority:</strong> <span class="priority-badge">${ticket.priority}</span></p>
                        <p><strong>Status:</strong> ${ticket.status}</p>
                        <p><strong>Created:</strong> ${formattedDate}</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${ticketUrl}" class="button">View Ticket</a>
                    </div>
                    
                    <p>We aim to respond to all tickets within 24 hours. For urgent matters, please ensure your ticket is marked as high priority.</p>
                    
                    <p><strong>Note:</strong> You can track the status of your ticket and add additional information by clicking the button above or responding to this email.</p>
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
          console.error("Error sending ticket creation email:", err.message);
          reject(err);
        } else {
          console.log("Ticket creation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendTicketCreationEmail:", error);
    throw error;
  }
};
