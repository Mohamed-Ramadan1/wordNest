# Analytics API Documentation

## Overview

The Analytics module in WordNest provides administrators with insights into various aspects of the application's usage and content. This module offers endpoints to retrieve aggregated analytics data and detailed reports for blogs, users, support tickets, and content reporting. Access to all analytics endpoints is restricted to users with the 'admin' role.

## Base URL

```
/api/v1/analytics
```

## Analytics Endpoints

All endpoints require administrator authentication (JWT token with 'admin' role).

### Get Blog Analytics

Retrieve aggregated analytics data for the blogs collection.

- **URL**: `/blogs`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blogs analytics fetched successfully",
      "data": {
        "analytics": {
          "totalBlogs": 150,
          "totalViews": 12500,
          "totalShares": 800,
          "totalComments": 2300,
          "totalInteractions": 5400
          // ... other potential fields from IBlogsCollectionAnalytics
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `403 Forbidden` - User does not have admin role

### Get User Analytics

Retrieve aggregated analytics data for the users collection.

- **URL**: `/users`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Users analytics fetched successfully",
      "data": {
        "analytics": {
          "totalUsers": 5000,
          "activeUsersToday": 250,
          "newUsersThisMonth": 300
          // ... other potential fields from IUsersCollectionAnalytics
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `403 Forbidden` - User does not have admin role

### Get Support Ticket Analytics

Retrieve aggregated analytics data for the support tickets collection.

- **URL**: `/support-tickets`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Support ticket analytics fetched successfully",
      "data": {
        "analytics": {
          "totalTickets": 350,
          "openTickets": 50,
          "closedTicketsToday": 15
          // ... other potential fields from ISupportTicketsCollectionAnalytics
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `403 Forbidden` - User does not have admin role

### Get Content Reporting Analytics

Retrieve aggregated analytics data for the content reporting collection.

- **URL**: `/content-reporting`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Content reporting analytics fetched successfully",
      "data": {
        "analytics": {
          "totalReports": 120,
          "pendingReports": 20,
          "resolvedReportsThisWeek": 30
          // ... other potential fields from IContentReportingCollectionAnalytics
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `403 Forbidden` - User does not have admin role

## Analytics Reports Endpoints

These endpoints provide detailed, potentially paginated, sorted, and filtered reports.

### Get Blog Analytics Reports

Retrieve detailed analytics reports for blogs.

- **URL**: `/blogs/reports`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**:
  - `sort` (string): Field to sort by (e.g., `totalViews`, `-totalBlogs` for descending).
  - `fields` (string): Comma-separated fields to include (e.g., `totalBlogs,totalViews`).
  - `page` (integer): Page number for pagination.
  - `limit` (integer): Number of items per page.
  - *Other filter parameters based on `IBlogsCollectionAnalytics` fields may be supported.*
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blogs analytics reports fetched successfully",
      "results": 10, // Number of reports in this response
      "data": {
        "reports": [
          { /* IBlogsCollectionAnalytics object */ },
          { /* IBlogsCollectionAnalytics object */ }
          // ... up to 'limit' reports
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `403 Forbidden` - User does not have admin role

### Get User Analytics Reports

Retrieve detailed analytics reports for users.

- **URL**: `/users/reports`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**: Similar to Blog Reports (sort, fields, page, limit, filters based on `IUsersCollectionAnalytics`).
- **Success Response**: Similar structure to Blog Reports, containing an array of `IUsersCollectionAnalytics` objects.
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`

### Get Support Ticket Analytics Reports

Retrieve detailed analytics reports for support tickets.

- **URL**: `/support-tickets/reports`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**: Similar to Blog Reports (sort, fields, page, limit, filters based on `ISupportTicketsCollectionAnalytics`).
- **Success Response**: Similar structure to Blog Reports, containing an array of `ISupportTicketsCollectionAnalytics` objects.
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`

### Get Content Reporting Analytics Reports

Retrieve detailed analytics reports for content reporting.

- **URL**: `/content-reporting/reports`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**: Similar to Blog Reports (sort, fields, page, limit, filters based on `IContentReportingCollectionAnalytics`).
- **Success Response**: Similar structure to Blog Reports, containing an array of `IContentReportingCollectionAnalytics` objects.
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`

## Implementation Details

### Architecture

- The Analytics feature follows a standard MVC-like pattern with Controllers, Services, and Repositories.
- **Controllers** (`AnalyticsController`, `AnalyticsReportsController`): Handle incoming HTTP requests, validate inputs, and orchestrate responses.
- **Services** (`AnalyticsService`, `AnalyticsReportsService`): Contain the core business logic for fetching and processing analytics data. `AnalyticsService` utilizes Redis caching.
- **Repositories** (`AnalyticsRepository`, `AnalyticsReportingRepository`): Interact with the database (e.g., MongoDB via Mongoose models) to retrieve raw data.
- **Interfaces**: Define the structure and contracts for data objects (e.g., `IBlogsCollectionAnalytics`) and service/repository implementations.
- **Models**: Mongoose schemas defining the database structure for analytics data.
- **Routes**: Define the API endpoints and link them to controller methods, applying necessary middleware.

### Caching

- The basic analytics endpoints (`/blogs`, `/users`, etc.) utilize Redis caching (`AnalyticsService`) to improve performance and reduce database load. Cached data typically expires after a set period (e.g., 1 hour).
- Report endpoints (`/blogs/reports`, etc.) fetch data directly via `AnalyticsReportsService` to ensure up-to-date information and support dynamic querying (filtering, sorting, pagination).

### Access Control

- All analytics routes are protected using the `AccessControlMiddleware`.
- Authentication (`protect` middleware) ensures a valid JWT token is present.
- Authorization (`restrictTo('admin')` middleware) ensures the authenticated user has the 'admin' role.

## Dependencies

- Express.js: Web framework for routing and middleware.
- Inversify: Dependency injection container for managing class instances.
- ioredis: Redis client for caching.
- Mongoose: ODM for interacting with MongoDB (implied by models and repositories).

## Error Handling

- Endpoints use a centralized `catchAsync` utility to handle errors.
- Errors are processed by `ErrorUtils` within services.
- Responses follow a consistent format:
  - **Success**: `{"status": "success", "message": "...", "data": {...}}`
  - **Error**: `{"status": "error", "message": "Detailed error message"}`
- Common errors include authentication failures (401), authorization failures (403), and potential internal server errors (500) if data retrieval fails unexpectedly.
