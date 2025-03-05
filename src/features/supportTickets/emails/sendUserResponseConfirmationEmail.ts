import { ISupportTicket } from "../interfaces/supportTicket.interface";
import { IUser } from "@features/users_feature";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

export const sendUserResponseConfirmationEmail = async (
  ticket: ISupportTicket,
  user: IUser
): Promise<void> => {
  try {
    const transport = createMailTransporter();
    const ticketUrl = `${process.env.FRONTEND_URL}/support/tickets/${ticket._id}`;

    // Extract the last user response directly from the ticket
    const lastUserResponse =
      ticket.userResponses[ticket.userResponses.length - 1];

    if (!lastUserResponse) {
      throw new Error("No user response found in the ticket.");
    }

    // Format the respondedAt date
    const respondedAtDate = new Date(lastUserResponse.respondedAt);
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
      subject: `[${ticket._id}] Your Response Has Been Received - ${siteName}`,
      html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Response Received</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <div class="container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <!-- Header Section -->
                  <div class="header" style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eeeeee;">
                      <div class="logo" style="font-size: 24px; font-weight: bold; color: #333333;">${siteName} Support</div>
                  </div>

                  <!-- Content Section -->
                  <div class="content" style="padding: 20px 0;">
                      <h2 style="color: #333333; font-size: 20px; margin-bottom: 20px;">Response Received</h2>
                      <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Hello ${user.firstName},</p>
                      <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">We have received your response to the support ticket. Our team will review it and provide updates as soon as possible.</p>
                      
                      <!-- Ticket Details -->
                      <div class="ticket-info" style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
                          <h3 style="color: #333333; font-size: 18px; margin-bottom: 10px;">Ticket Details:</h3>
                          <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Ticket ID:</strong> ${ticket._id}</p>
                          <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Subject:</strong> ${ticket.subject}</p>
                          <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Category:</strong> ${ticket.category}</p>
                          <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Status:</strong> ${ticket.status}</p>
                          <p style="color: #555555; font-size: 16px; line-height: 1.5;"><strong>Response Date:</strong> ${formattedDate}</p>
                      </div>
                      
                      <!-- View Ticket Button -->
                      <div style="text-align: center; margin-top: 20px;">
                          <a href="${ticketUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">View Ticket</a>
                      </div>
                      
                      <!-- Additional Information -->
                      <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-top: 20px;">We aim to respond to all tickets within 24 hours. For urgent matters, please ensure your ticket is marked as high priority.</p>
                      <p style="color: #555555; font-size: 16px; line-height: 1.5;"><strong>Note:</strong> You can track the status of your ticket and add additional information by clicking the button above or responding to this email.</p>

                      <!-- Thank-You Message -->
                      <p style="margin-top: 20px; font-style: italic; color: #555555; font-size: 16px; line-height: 1.5;">
                          Thank you for being a valued part of our community! We're truly happy to have you here and will work as quickly as possible to resolve your issue. Your satisfaction is our top priority.
                      </p>
                  </div>

                  <!-- Footer Section -->
                  <div class="footer" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center; color: #777777; font-size: 14px;">
                      <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                      <p>If you have any questions, contact us at <a href="mailto:${siteOfficialEmail}" style="color: #007bff; text-decoration: none;">${siteOfficialEmail}</a></p>
                      <p>Follow us: 
                          <a href="https://twitter.com/${siteName}" target="_blank" style="color: #007bff; text-decoration: none;">Twitter</a> | 
                          <a href="https://facebook.com/${siteName}" target="_blank" style="color: #007bff; text-decoration: none;">Facebook</a>
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
          console.error(
            "Error sending user response confirmation email:",
            err.message
          );
          reject(err);
        } else {
          console.log("User response confirmation email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendUserResponseConfirmationEmail:", error);
    throw error;
  }
};
