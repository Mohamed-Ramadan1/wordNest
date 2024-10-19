# blog-backend-application

Blog api project

## Feature-based Modular Architecture

## project setup

```
.
├── docs/                                    # Documentation files
├── node_modules/                            # Node.js dependencies
├── src/                                     # Source code
│   ├── config/                              # Configuration files for the application
│   ├── email/                               # Email-related functionality
│   ├── features/                            # Core application features
│   │   ├── auth/                            # Authentication feature
│   │   └── users/                           # User management feature
│   │       ├── controllers/                 # Request handlers
│   │       ├── dtos/                        # Data Transfer Objects
│   │       ├── interfaces/                  # TypeScript interfaces
│   │       ├── middlewares/                 # Feature-specific middleware
│   │       ├── models/                      # Data models
│   │       ├── routes/                      # API route definitions
│   │       ├── services/                    # Business logic
│   │       └── tests/                       # Unit and integration tests
│   ├── jobs/                                # Background tasks and cron jobs
│   │   ├── cronJobs/                        # Scheduled tasks
│   │   ├── schedulers/                      # Job schedulers
│   │   └── index.ts                         # Jobs entry point
│   ├── logging/                             # Logging configuration and utilities
│   │   ├── formatters/                      # Custom log formatters
│   │   ├── loggers/                         # Logger instances
│   │   └── index.ts                         # Logging entry point
│   ├── middlewares/                         # Application-wide middleware
│   ├── types/                               # TypeScript type definitions
│   ├── utils/                               # Utility functions
│   ├── app.ts                               # Main application setup
│   └── index.ts                             # Application entry point
├── .dockerignore                            # Files to be ignored by Docker
├── .gitignore                               # Files to be ignored by Git
├── Docker-compose.yml                       # Docker Compose configuration
├── Dockerfile                               # Docker configuration
├── LICENSE                                  # License file
├── package-lock.json                        # Locked versions of dependencies
├── package.json                             # Project metadata and dependencies
├── README.md                                # Project documentation (this file)
└── tsconfig.json                            # TypeScript configuration
```
