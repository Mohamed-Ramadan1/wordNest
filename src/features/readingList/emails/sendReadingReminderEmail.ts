import { IUser } from "@features/users_feature";
import { IBlog, BlogCategory } from "@features/blogs/interfaces/blog.interface";
import { IReadingList } from "../interfaces/readingList.interface";
import createMailTransporter from "@config/mailTransporter.config";
import { siteName, siteOfficialEmail } from "@config/emails.config";

interface ReadingReminderData {
  user: IUser;
  readingItem: IReadingList;
  blog: IBlog;
}

export const sendReadingReminderEmail = async ({
  user,
  readingItem,
  blog,
}: ReadingReminderData): Promise<void> => {
  try {
    const transport = createMailTransporter();

    const readingLink = `${process.env.FRONTEND_URL}/reading-list/${blog._id}`;
    const settingsLink = `${process.env.FRONTEND_URL}/settings`;
    const estimatedReadingTime = Math.ceil(blog.content.length / 1500);
    const activeUserPercentage = Math.floor(Math.random() * 20 + 10);

    const getCategoryEmoji = (category: BlogCategory): string => {
      const emojiMap = {
        [BlogCategory.TECHNOLOGY]: "💻",
        [BlogCategory.HEALTH]: "🏥",
        [BlogCategory.BUSINESS]: "💼",
        [BlogCategory.POLITICS]: "🏛️",
        [BlogCategory.SPORTS]: "⚽",
        [BlogCategory.ENTERTAINMENT]: "🎬",
        [BlogCategory.FASHION]: "👗",
        [BlogCategory.ARTS]: "🎨",
        [BlogCategory.SCIENCE]: "🔬",
        [BlogCategory.EDUCATION]: "📚",
        [BlogCategory.RELIGION]: "🕊️",
        [BlogCategory.FOOD]: "🍳",
        [BlogCategory.TRAVEL]: "✈️",
        [BlogCategory.OTHER]: "📝",
      };
      return emojiMap[category] || "📝";
    };

    const mailOptions = {
      from: `${siteName} Reading Reminder <${siteOfficialEmail}>`,
      to: user.email,
      subject: `${getCategoryEmoji(blog.categories)} Time to Read: ${blog.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Reading Time - ${siteName}</title>
            <style>
                /* Previous styles remain the same */
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
                    background-color: #f0f8ff;
                    border-radius: 8px 8px 0 0;
                    border-bottom: 3px solid #e6f3ff;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0091ea;
                    margin-bottom: 10px;
                }
                .content {
                    padding: 30px 20px;
                }
                .article-card {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 4px solid #0091ea;
                }
                .button {
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #0091ea;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }
                .motivation-box {
                    background-color: #fff8e1;
                    border-left: 4px solid #ffc107;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 4px;
                }
                .stats-box {
                    background-color: #e3f2fd;
                    padding: 15px;
                    border-radius: 4px;
                    margin: 15px 0;
                }
                .stat-item {
                    display: inline-block;
                    padding: 8px 15px;
                    margin: 5px;
                    background-color: #ffffff;
                    border-radius: 20px;
                    font-size: 14px;
                }
                .quote-box {
                    text-align: center;
                    font-style: italic;
                    color: #666;
                    margin: 20px 0;
                    padding: 20px;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
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
                .benefits-list {
                    background-color: #f1f8e9;
                    padding: 15px 20px;
                    border-radius: 4px;
                    margin: 15px 0;
                }
                .benefits-list li {
                    margin: 10px 0;
                }
                .category-tag {
                    display: inline-block;
                    padding: 4px 12px;
                    background-color: #e3f2fd;
                    border-radius: 15px;
                    font-size: 12px;
                    color: #0091ea;
                    margin-top: 10px;
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        width: 100% !important;
                        margin: 0 !important;
                    }
                    .stat-item {
                        display: block;
                        margin: 10px 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">${siteName}</div>
                    <h1>${getCategoryEmoji(blog.categories)} Your Reading Reminder</h1>
                </div>

                <div class="content">
                    <h2>Hello ${user.firstName}! 👋</h2>

                    <p>Your saved article is waiting for you:</p>

                    <div class="article-card">
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt || ""}</p>
                        <p><strong>Added on:</strong> ${new Date(readingItem.addedAt).toLocaleDateString()}</p>
                        <div class="category-tag">
                            ${getCategoryEmoji(blog.categories)} ${blog.categories}
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <a href="${readingLink}" class="button">Read Now ${getCategoryEmoji(blog.categories)}</a>
                    </div>

                    <div class="motivation-box">
                        <h4>🌟 Your Learning Journey</h4>

                        <div class="stats-box">
                            <div class="stat-item">
                                ⏱️ ${estimatedReadingTime} min read
                            </div>
                            <div class="stat-item">
                                👥 ${blog.viewsCount || 0}+ views
                            </div>
                            <div class="stat-item">
                                🏆 Top ${activeUserPercentage}% active reader
                            </div>
                        </div>

                        <div class="benefits-list">
                            <p><strong>Why Read Now:</strong></p>
                            <ul>
                                <li>🎯 Fresh insights waiting to be discovered</li>
                                <li>🧠 Perfect for a productive break</li>
                                <li>📈 Boost your knowledge in minutes</li>
                                <li>💡 Stay ahead in your field</li>
                            </ul>
                        </div>
                    </div>

                    <div class="quote-box">
                        "Knowledge has a beginning but no end." - Geeta Iyengar
                    </div>

                    <p style="text-align: center;">
                        Take this moment to enrich your mind. Your future self will thank you! 🌱
                    </p>
                </div>

                <div class="footer">
                    <p>© ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
                    <p>
                        Manage your reading preferences in your
                        <a href="${settingsLink}" style="color: #0091ea;">account settings</a>
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
          console.error("Error sending reading reminder email:", err.message);
          reject(err);
        } else {
          console.log("Reading reminder email sent successfully");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error in sendReadingReminderEmail:", error);
    throw error;
  }
};
