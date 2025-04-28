# Content Reporting API Documentation

## Overview

The Content Reporting module in WordNest allows users to report inappropriate or problematic content (such as blog posts or comments) and enables administrators to manage these reports effectively. This includes creating reports, reviewing them, processing them (e.g., taking action on the reported content), updating their status, and archiving/unarchiving them.

## Base URL

```
/api/v1/content-reporting
```

## Content Reporting Endpoints

### Create Content Report

Allows any authenticated user to submit a report about specific content.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "reportingRequestData": {
      "contentType": "Blog" | "Comment", // Type of content being reported
      "contentId": "content-id", // ID of the blog post or comment
      "reason": "Reason for reporting the content",
      "details": "Optional additional details about the report"
    }
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report content request created successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data (e.g., missing fields, invalid contentType)
  - **Code**: `401 Unauthorized` - Invalid or missing token
  - **Code**: `404 Not Found` - Reported content (Blog/Comment) not found

### Get All Content Reports (Admin Only)

Retrieves a list of all content reports. Supports filtering, sorting, and pagination.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**:
  - `sort` (string): Field to sort by (e.g., `createdAt`, `-status`).
  - `fields` (string): Comma-separated fields to include.
  - `page` (integer): Page number for pagination.
  - `limit` (integer): Number of items per page.
  - *Other filter parameters based on `IContentReporting` fields (e.g., `status`, `contentType`, `reporter`).*
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report content requests fetched successfully",
      "results": 15, // Number of reports in this response
      "data": {
        "requests": [
          {
            "id": "report-id",
            "reporter": "user-id",
            "contentType": "Blog",
            "contentId": "blog-id",
            "reason": "Spam content",
            "details": "...",
            "status": "Pending", // e.g., Pending, Investigating, Resolved, Dismissed
            "isArchived": false,
            "createdAt": "2025-01-10T10:00:00.000Z",
            "updatedAt": "2025-01-10T10:00:00.000Z"
          }
          // ... more reports
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden` - User is not an admin

### Get Content Report by ID (Admin Only)

Retrieves details of a specific content report.

- **URL**: `/:id`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report content request fetched successfully",
      "data": {
        "request": { /* IContentReporting object */ }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

### Delete Content Report (Admin Only)

Deletes a specific content report.

- **URL**: `/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Request Body** (Note: The route definition seems to expect data in the body via `deleteReportData`, which might be unusual for a DELETE request. Confirm implementation if needed. Typically, only the ID in the URL is used):
  ```json
  {
    "deleteReportData": {
      "reportId": "report-id" // Matches the :id parameter
    }
  }
  ```
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

## Content Report Management Endpoints (Admin Only)

These endpoints are used by administrators to manage the lifecycle of a report.

### Process Report

Marks a report as processed and records the action taken.

- **URL**: `/:id/process`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Request Body**:
  ```json
  {
    "reportProcessedData": {
      "actionTaken": "Content removed" | "Warning issued" | "No action needed",
      "adminNotes": "Notes regarding the decision and action taken."
    }
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report processed successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

### Update Report Status

Updates the status of a content report (e.g., from Pending to Investigating).

- **URL**: `/:id/update-status`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Request Body**:
  ```json
  {
    "reportStatus": "Pending" | "Investigating" | "Resolved" | "Dismissed"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report status updated successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid status value
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

### Archive Report

Archives a content report, typically after it has been resolved or dismissed.

- **URL**: `/:id/archive`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report archived successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

### Unarchive Report

Restores an archived content report.

- **URL**: `/:id/unarchive`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `id`: ID of the content report
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Report un-archived successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`
  - **Code**: `404 Not Found` - Report not found

## Implementation Details

### Architecture

- The feature uses separate controllers for CRUD (`ContentReportingCRUDController`) and management (`ContentReportingManagementController`) operations.
- Services (`ContentReportingCRUDService`, `ContentReportingManagementService`) encapsulate the business logic.
- A single repository (`ContentReportRepository`) handles database interactions via the `ContentReporting` Mongoose model.
- Middleware (`ContentReportingCRUDMiddleware`, `ContentReportingManagementMiddleware`) is used for request validation.
- Access control middleware (`AccessControlMiddleware`) restricts admin-only endpoints.

### Report Lifecycle

1.  **Creation**: A user submits a report.
2.  **Review (Admin)**: Admins can view pending reports.
3.  **Status Update (Admin)**: Admins can update the status (e.g., to `Investigating`).
4.  **Processing (Admin)**: Admins process the report, deciding on an action and adding notes.
The status might automatically change to `Resolved` or `Dismissed` upon processing.
5.  **Archiving (Admin)**: Resolved or dismissed reports can be archived.
6.  **Deletion (Admin)**: Reports can be deleted permanently.

### Email Notifications

- The system sends an acknowledgment email (`sendContentReportAcknowledgment`) to the user upon successful report submission.
- Additional emails might be sent during the management process (e.g., when a report is resolved), depending on implementation details not fully covered here.

## Dependencies

- Express.js
- Inversify
- Mongoose (implied)
- Nodemailer (for emails)

## Error Handling

- Consistent error response format: `{"status": "error", "message": "..."}`.
- Uses `catchAsync` and `ErrorUtils` for centralized error management.
- Specific validation middleware ensures data integrity before processing.
