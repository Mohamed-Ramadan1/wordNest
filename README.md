# WordNest

WordNest is a fully functional blog API application built with modern web technologies. It provides a robust backend infrastructure for blog platforms with features including authentication, content management, comments, reading lists, and content reporting. The application follows a feature-based modular architecture, making it scalable and maintainable.

## for full documentation you will find it in the docs folder

## DeepScan project analysis

![Deep scan analytics](/docs/globalDocs//d1.png)

![Deep scan analytics](/docs/globalDocs/d2.png)

![Deep scan analytics](/docs/globalDocs/d3.png)

## Key Features

- **User Authentication & Authorization**: Secure login, registration, and account recovery with JWT
- **Content Management**: Create, read, update, and delete blog posts with rich media support
- **Comments System**: Interactive commenting functionality with nested replies
- **Reading List**: Save and organize favorite content for later reading
- **Content Reporting**: Flag inappropriate content for moderation
- **Analytics**: powerful analytics dashboard that give insights about the whole application.
- **Real-time Notifications**: Socket.io integration for instant updates
- **Payment Processing**: Stripe integration for premium content and subscriptions
- **Background Jobs**: Scheduled tasks for maintenance and notifications
- **Email Services**: Automated email notifications and newsletters
- **API Documentation**: Comprehensive Swagger documentation
- **Containerization**: Docker and Docker Compose for easy deployment
- **Security**: Implementation of best practices for web security

Built with TypeScript and Express.js, WordNest leverages MongoDB for data storage and Redis for caching, providing a high-performance backend solution for modern blog applications.

## Email Notification Examples

WordNest includes a comprehensive email notification system for various user account events. Below are examples of the email templates:

### Account Restriction Notice

![Account Restriction Notice](/docs/auth/imgs/failedLoginAttempsEMail1.png)

### Account Deletion Confirmation

![Account Deletion Confirmation](/docs//auth/imgs/RequestResetPasswordEmail-2.png)

_Note: Additional email templates can be found in the `docs/users/images` directory of the repository._

## Used Tools and Technologies

| Category                         | Tools & Technologies                                                           |
| -------------------------------- | ------------------------------------------------------------------------------ |
| **Core Technologies**            | Node.js, TypeScript, Express.js                                                |
| **Database**                     | MongoDB, Mongoose, Redis                                                       |
| **Authentication & Security**    | JWT, bcryptjs, helmet, cors, express-rate-limit, hpp, xss-clean, sanitize-html |
| **Validation & Data Processing** | Joi, express-validator, class-validator, class-transformer                     |
| **File Upload & Storage**        | Multer, Cloudinary                                                             |
| **Payment Processing**           | Stripe                                                                         |
| **Background Processing**        | Bull, node-cron                                                                |
| **Email Services**               | Nodemailer                                                                     |
| **Documentation**                | Swagger (swagger-jsdoc, swagger-ui-express)                                    |
| **Logging**                      | Winston, Morgan                                                                |
| **Real-time Communication**      | Socket.io                                                                      |
| **Containerization**             | Docker, Docker Compose                                                         |
| **Build Tools**                  | Webpack, ts-loader                                                             |
| **Development Tools**            | ts-node-dev, prettier, eslint                                                  |
| **Testing**                      | Jest, Supertest                                                                |
| **Utilities**                    | date-fns, slugify, dotenv, compression, cookie-parser, body-parser             |
| **Dependency Injection**         | Inversify, reflect-metadata                                                    |

## Project Structure

```
root/
├── dev/                        # Development-related files and configurations
├── docs/                       # Documentation files for the project
│   ├── auth/                   # Authentication documentation
│   ├── blogs/                  # Blog feature documentation
│   ├── comments/               # Comments feature documentation
│   ├── favorites/              # Favorites feature documentation
│   ├── interactions/           # User interactions documentation
│   ├── readingLest/            # Reading list feature documentation
│   ├── support-tickets/        # Support tickets documentation
│   └── users/                  # User management documentation
│       └── images/             # Email notification templates and UI screenshots
├── logs/                       # General log files for the application
├── node_modules/               # Node.js modules installed via npm
├── public/                     # Static files (images, CSS, JavaScript for frontend)
├── src/                        # Main source code of the application
│   ├── config/                 # Configuration files (environment variables, app settings)
│   ├── features/               # Application features, organized by modules
│   │   ├── auth/               # Authentication module
│   │   │   ├── controllers/    # Controllers for auth operations
│   │   │   ├── dtos/           # Data transfer objects for request/response validation
│   │   │   ├── emails/         # Email templates for authentication-related emails
│   │   │   ├── interfaces/     # TypeScript interfaces for the auth module
│   │   │   ├── middlewares/    # Middleware for authentication checks
│   │   │   ├── models/         # Database models related to authentication
│   │   │   ├── routes/         # Routes for authentication endpoints
│   │   │   ├── services/       # Business logic for authentication
│   │   │   └── tests/          # Unit and integration tests for the auth module
│   │   ├── users/              # User management module
│   │   ├── posts/              # Blog posts module
│   │   ├── comments/           # Comments module
│   │   ├── reading-list/       # Reading list feature
│   │   └── content-reporting/  # Content reporting feature
│   ├── jobs/                   # Scheduled tasks or background jobs
│   ├── logging/                # Logging utilities for the application
│   ├── shared/                 # Shared utilities or modules used across the app
│   │   └── utils/              # Utility functions merged under shared directory
│   ├── types/                  # TypeScript type definitions for global use
│   ├── app.ts                  # Main application entry point
│   └── index.ts                # Application bootstrap file
├── .dockerignore               # Files and directories to ignore in Docker builds
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Dockerfile for containerizing the application
├── LICENSE                     # License for the project
├── package.json                # Node.js dependencies and scripts
├── package-lock.json           # Lock file for Node.js dependencies
├── README.md                   # Project overview and instructions
├── TODO.ts                     # Todo list for the project
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configuration
└── wordNest-API.postman_collection.json  # Postman collection for API testing
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Docker and Docker Compose (optional, for containerized deployment)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Mohamed-Ramadan1/wordNest.git
   cd wordNest
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=
   PORT=
   DATABASE=
   DATABASE_PASSWORD=
   EMAIL_PASSWORD=
   JWT_SECRET=
   JWT_EXPIRES_IN=90d
   JWT_LOGOUT_EXPIRES_IN=0
   JWT_COOKIE_EXPIRES_IN=90
   CLOUD_NAME=
   CLOUD_API_KEY=
   CLOUD_API_SECRET=
   FRONTEND_URL=
   REDIS_HOST=
   REDIS_PORT=
   FRONTEND_URL=
   LOG_DIR=
   GOOGLE_CLIENT_ID=
   GOOGLE_REDIRECT_URL=
   STRIPE_SECRET_KEY=
   STRIPE_SUCCESS_URL=
   STRIPE_CANCEL_URL=
   ```

   Note: Fill in the appropriate values for each variable. Ensure you provide a MongoDB connection string for the `DATABASE` variable (local or Atlas).

4. Run the development server

   ```bash
   npm run dev
   ```

5. build the application

   ```bash
   npm run build
   ```

### Docker Deployment

```bash
docker-compose up -d
```

## Webpack Build

To build the application using Webpack, run the following command:

```bash
npm run build
```

This will create a `dist` directory containing the bundled application files.

run the application using the following command:

```bash
npm start
```

This will start the application in production mode.

## API Documentation

Once the server is running, access the Swagger documentation at:

```
http://localhost:3000/api/v1/docs
```

## Postman Collection

A Postman collection is included for testing the API endpoints. You can import the `wordNest-API.postman_collection.json` file into Postman to explore and test the API.

## API documentation on Postman

## [Postman-Documentation](https://documenter.getpostman.com/view/31297722/2sB2j1hCkk#4119ae76-78d1-4364-be22-b4d0ce5eebc8)

## Author Information

**Mohamed Ramadan**

- GitHub: [Mohamed-Ramadan1](https://github.com/Mohamed-Ramadan1)
- Email: mohamedramadan11b@gmail.com
- LinkedIn: [Mohamed Ramadan](https://www.linkedin.com/in/mohamed-ramadan-758555236/)

I'm a dedicated backend software engineer with a passion for creating high-quality software solutions. My goal is to contribute to the tech community by developing innovative solutions that address real-world challenges. I'm always eager to learn new technologies and methodologies to enhance my skills and deliver better software.

Feel free to reach out to me for any questions, suggestions, or potential collaborations regarding this project or other backend development topics!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
