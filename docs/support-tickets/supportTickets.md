# Support Tickets API Documentation

## Overview

The Support Tickets module in WordNest provides a system for users to submit requests for help or report issues, and for administrators to manage and respond to these tickets. It includes functionalities for ticket creation, viewing, replying, status management (open, closed, reopened), and priority assignment.

## Base URLs

- User-facing endpoints: `/api/support-tickets`
- Admin-facing endpoints: `/api/admin/support-tickets`

## User Support Ticket Endpoints (`/api/support-tickets`)

These endpoints are accessible to authenticated users.

### Get All User Support Tickets

Retrieve all support tickets submitted by the currently authenticated user.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Query Parameters**: Supports filtering, sorting, and pagination (e.g., `page`, `limit`, `sort`, `status`).
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "results": 5,
      "data": {
        "userSUpportTickets": [
          {
            "id": "ticket-id",
            "user": "user-id",
            "subject": "Issue with login",
            "description": "Cannot log in to my account.",
            "priority": "Medium",
            "status": "Open",
            "category": "Account Issue",
            "attachments": ["url-to-attachment"],
            "responses": [
              {
                "responder": "admin-id",
                "message": "We are looking into this.",
                "responseDate": "2025-01-20T11:00:00.000Z"
              }
            ],
            "createdAt": "2025-01-20T10:00:00.000Z",
            "updatedAt": "2025-01-20T11:00:00.000Z"
          }
          // ... more tickets
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`

### Create Support Ticket

Submit a new support ticket.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `subject` (string): Title of the support ticket.
  - `description` (string): Detailed description of the issue.
  - `category` (string): Category of the issue (e.g., "Bug Report", "Feature Request", "Account Issue").
  - `priority` (string, optional): User-suggested priority (e.g., "Low", "Medium", "High"). Defaults might apply.
  - `attachment` (file, optional): File attachment (e.g., screenshot).
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Support ticket created successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data.
  - **Code**: `401 Unauthorized`

### Get Support Ticket by ID

Retrieve details of a specific support ticket submitted by the user.

- **URL**: `/:ticketId`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "userTIcket": { /* ISupportTicket object */ }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `404 Not Found` - Ticket not found or does not belong to the user.

### Reply to Support Ticket

Add a response to an existing support ticket.

- **URL**: `/:ticketId/reply`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Request Body**:
  - `message` (string): The user's reply message.
  - `attachment` (file, optional): File attachment for the reply.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Support ticket replied successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data.
  - **Code**: `401 Unauthorized`
  - **Code**: `404 Not Found` - Ticket not found or does not belong to the user.

## Admin Support Ticket Endpoints (`/api/admin/support-tickets`)

These endpoints are accessible only to administrators.

### Get All Tickets (Admin)

Retrieve all support tickets in the system. Supports filtering, sorting, and pagination.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **Query Parameters**: Supports filtering (e.g., `status`, `priority`, `user`), sorting, and pagination.
- **Success Response**: Similar to user's `GET /`, but includes tickets from all users.
- **Error Responses**:
  - **Code**: `401 Unauthorized`
  - **Code**: `403 Forbidden`

### Create Ticket (Admin)

Allows an admin to create a ticket, potentially on behalf of a user.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (Admin JWT)
- **Content-Type**: `multipart/form-data`
- **Request Body**: Similar to user creation, but may allow specifying the user ID.
- **Success Response**: `201 Created` with success message.
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`

### Get Ticket by ID (Admin)

Retrieve details of any specific support ticket.

- **URL**: `/:ticketId`
- **Method**: `GET`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Success Response**: `200 OK` with ticket details.
- **Error Responses**: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Update Ticket (Admin)

Update details of a specific support ticket (e.g., category, description).

- **URL**: `/:ticketId`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Request Body**: Contains fields to be updated (e.g., `subject`, `description`, `category`).
- **Success Response**: `200 OK` with success message.
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Delete Ticket (Admin)

Permanently delete a support ticket.

- **URL**: `/:ticketId`
- **Method**: `DELETE`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Success Response**: `204 No Content`
- **Error Responses**: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Change Ticket Priority (Admin)

Update the priority level of a ticket.

- **URL**: `/:ticketId/priority`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Request Body**:
  ```json
  {
    "newPriority": "Low" | "Medium" | "High" | "Urgent"
  }
  ```
- **Success Response**: `200 OK` with message `Priority updated to [newPriority]`.
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Close Ticket (Admin)

Mark a support ticket as closed.

- **URL**: `/:ticketId/status/close`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Success Response**: `200 OK` with message "Ticket closed successfully."
- **Error Responses**: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Reopen Ticket (Admin)

Change the status of a closed ticket back to open.

- **URL**: `/:ticketId/status/reopen`
- **Method**: `PATCH`
- **Authentication**: Required (Admin JWT)
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Success Response**: `200 OK` with message "Ticket reopened successfully..."
- **Error Responses**: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

### Respond to Ticket (Admin)

Add an administrative response to a support ticket.

- **URL**: `/:ticketId/response`
- **Method**: `POST`
- **Authentication**: Required (Admin JWT)
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `ticketId`: ID of the support ticket.
- **Request Body**:
  - `message` (string): The admin's reply message.
  - `attachment` (file, optional): File attachment for the reply.
- **Success Response**: `200 OK` with message "Ticket response sent successfully."
- **Error Responses**: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`

## Implementation Details

### Architecture

- The feature separates user and admin functionalities into distinct controllers, services, and routes.
- **User**: `SupportTicketController`, `SupportTicketService` handle user actions.
- **Admin**: `TicketsCRUDController`, `TicketStatusController`, `TicketPriorityController`, `TicketResponseController` and their corresponding services handle admin actions.
- Repositories (`SupportTicketRepository`, `SupportTicketManagementRepository`) manage database interactions.
- Middleware validates requests and handles authorization (user vs. admin).
- Multer is used for handling file attachments.

### Ticket Lifecycle

1.  **Creation**: User (or Admin) creates a ticket.
2.  **Assignment/Review (Admin)**: Admins review new tickets.
3.  **Response (User/Admin)**: Users and Admins can add responses/replies.
4.  **Priority Change (Admin)**: Admins can adjust ticket priority.
5.  **Status Change (Admin)**: Admins can close or reopen tickets.
6.  **Resolution**: Ticket is closed when the issue is resolved.
7.  **Deletion (Admin)**: Admins can delete tickets.

### Email Notifications

The system sends various emails throughout the ticket lifecycle:
- Ticket creation confirmation to the user.
- Notification to the user when an admin responds.
- Confirmation to the user when their reply is received.
- Notification to the user when a ticket is closed or reopened.

## Dependencies

- Express.js
- Inversify
- Mongoose (implied)
- Multer
- Nodemailer (for emails)

## Error Handling

- Consistent error response format: `{"status": "error", "message": "..."}`.
- Uses `catchAsync` and `ErrorUtils`.
- Specific validation middleware ensures data integrity.
