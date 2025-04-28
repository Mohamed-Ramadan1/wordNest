# Reading List API Documentation

## Overview

The Reading List module in WordNest allows users to save blog posts they want to read later. It provides features for adding/removing items, tracking reading status (unread, reading, completed), setting reading reminders, and managing auto-removal settings.

## Base URL

```
/api/reading-list
```

## Reading List CRUD Endpoints

These endpoints manage the basic creation, retrieval, and deletion of reading list items.

### Get All Reading List Items

Retrieve all items in the user's reading list. Supports filtering, sorting, and pagination.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Query Parameters**:
  - `sort` (string): Field to sort by (e.g., `createdAt`, `-status`).
  - `fields` (string): Comma-separated fields to include.
  - `page` (integer): Page number for pagination.
  - `limit` (integer): Number of items per page.
  - *Other filter parameters based on `IReadingList` fields (e.g., `status`, `blogPost`).*
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Reading list items retrieved successfully.",
      "results": 5,
      "data": {
        "readingListItems": [
          {
            "id": "reading-list-item-id",
            "user": "user-id",
            "blogPost": {
              "id": "blog-post-id",
              "title": "Blog Post Title",
              "excerpt": "Blog post excerpt...",
              "coverImage": "url-to-cover-image"
            },
            "status": "Unread", // Unread, Reading, Completed
            "notes": "Optional user notes",
            "reminderDate": "2025-05-15T10:00:00.000Z", // If reminder is set
            "autoRemove": false,
            "createdAt": "2025-01-15T10:00:00.000Z"
          }
          // ... more items
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or missing token

### Create Reading List Item

Add a blog post to the user's reading list.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "blogPostId": "blog-post-id",
    "notes": "Optional notes about why I saved this" // Optional
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Reading list item created successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data or item already exists
  - **Code**: `401 Unauthorized`
  - **Code**: `404 Not Found` - Blog post not found

### Get Reading List Item by ID

Retrieve details of a specific item in the reading list.

- **URL**: `/:id`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `id`: ID of the reading list item
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Reading list item retrieved successfully.",
      "data": {
        "readingListItem": { /* IReadingList object */ }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `404 Not Found` - Item not found or doesn't belong to user

### Delete Reading List Item

Remove a specific item from the user's reading list.

- **URL**: `/:id`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `id`: ID of the reading list item
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `404 Not Found` - Item not found or doesn't belong to user

### Clear Entire Reading List

Removes all items from the user's reading list.

- **URL**: `/`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Reading list cleared successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`

## Reading List Management Endpoints

These endpoints manage the status of reading list items.

### Mark Item as Unread

- **URL**: `/items/:itemId/unread`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Reading list item marked as unread successfully."
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

### Mark Item as Completed

- **URL**: `/items/:itemId/completed`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Reading list item marked as completed successfully."
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

### Mark Item as Reading

- **URL**: `/items/:itemId/reading`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Reading list item marked as currently being read successfully."
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

## Reading List Settings Endpoints

These endpoints manage reminders and auto-removal settings for reading list items.

### Set Reminder Alert

Schedule an email reminder for a specific reading list item.

- **URL**: `/items/:itemId/reminder-alert`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Request Body**:
  ```json
  {
    "alertInfo": {
      "alertDate": "YYYY-MM-DDTHH:mm:ss.sssZ", // ISO 8601 format
      "readingListItem": "reading-list-item-id", // Matches :itemId
      "user": "user-id"
    }
  }
  ```
- **Success Response**: `200 OK` with message "Reminder alert set successfully..."
- **Error Responses**: `400 Bad Request` (invalid date format, reminder already exists), `401 Unauthorized`, `404 Not Found`

### Reschedule Reminder Alert

Update the date/time for an existing reminder.

- **URL**: `/items/:itemId/reminder-reschedule`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Request Body**:
  ```json
  {
    "alertInfo": {
      "alertDate": "YYYY-MM-DDTHH:mm:ss.sssZ", // New date/time
      "readingListItem": "reading-list-item-id",
      "user": "user-id"
    }
  }
  ```
- **Success Response**: `200 OK` with message "Reminder alert rescheduled successfully."
- **Error Responses**: `400 Bad Request` (invalid date format), `401 Unauthorized`, `404 Not Found` (item or reminder job not found)

### Delete Reminder Alert

Cancel a scheduled reminder.

- **URL**: `/items/:itemId/reminder-delete`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Reminder alert deleted successfully."
- **Error Responses**: `401 Unauthorized`, `404 Not Found` (item or reminder job not found)

### Enable Auto-Remove

Set an item to be automatically removed from the reading list when marked as 'Completed'.

- **URL**: `/items/:itemId/auto-remove`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Auto-removal enabled successfully..."
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

### Disable Auto-Remove

Prevent an item from being automatically removed when marked as 'Completed'.

- **URL**: `/items/:itemId/auto-remove-disable`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `itemId`: ID of the reading list item
- **Success Response**: `200 OK` with message "Auto-removal disabled successfully..."
- **Error Responses**: `401 Unauthorized`, `404 Not Found`

## Implementation Details

### Architecture

- The feature is divided into three main concerns: CRUD (`ReadingListCRUDController`, `ReadingListCRUDService`), Management (`ReadingListManagementController`, `ReadingListManagementService`), and Settings (`ReadingListSettingsController`, `ReadingListSettingsService`).
- A single repository (`ReadingListRepository`) handles database interactions via the `ReadingList` Mongoose model.
- Middleware (`ReadingListCRUDMiddleware`, `ReadingListSettingsMiddleware`) validates requests.
- Reminder scheduling likely uses a job queue mechanism (e.g., Agenda.js, BullMQ - inferred from helper/service structure) to trigger email notifications (`sendReadingReminderEmail`).

### Reading Status

- Items can have statuses: `Unread`, `Reading`, `Completed`.
- Users can manually update the status via the management endpoints.

### Reminders

- Users can set a specific date and time to receive an email reminder for an item.
- The system schedules a job to send the email at the specified time.
- Reminders can be rescheduled or deleted.

### Auto-Removal

- Users can configure individual items to be automatically removed from the list once marked as `Completed`.

## Dependencies

- Express.js
- Inversify
- Mongoose (implied)
- Nodemailer (for reminder emails)
- A job scheduler library (inferred for reminders)

## Error Handling

- Consistent error response format: `{"status": "error", "message": "..."}`.
- Uses `catchAsync` and `ErrorUtils`.
- Specific validation middleware ensures data integrity.
