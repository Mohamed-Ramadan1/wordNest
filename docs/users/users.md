# User Management API Documentation

## Overview

The User Management module in WordNest provides comprehensive functionality for managing user profiles, account settings, notifications, and account status. This module handles all aspects of user management beyond basic authentication.

## Base URL

```
/api/users
```

## User Profile Endpoints

### Get User Profile

Retrieve the authenticated user's profile information.

- **URL**: `/profile`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "user": {
          "id": "user-id",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "profilePicture": "url-to-profile-picture",
          "bio": "User bio",
          "createdAt": "2025-01-01T00:00:00.000Z",
          "updatedAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Update Profile Picture

Update the authenticated user's profile picture.

- **URL**: `/profile/picture`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `profilePicture`: Image file (JPG, PNG, etc.)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Profile picture updated successfully",
      "data": {
        "profilePicture": "url-to-new-profile-picture"
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid file format or size
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Update Profile Information

Update the authenticated user's profile information.

- **URL**: `/profile/information`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "firstName": "Updated First Name",
    "lastName": "Updated Last Name",
    "bio": "Updated user bio"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Profile information updated successfully",
      "data": {
        "user": {
          "id": "user-id",
          "firstName": "Updated First Name",
          "lastName": "Updated Last Name",
          "bio": "Updated user bio",
          "updatedAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token

## Account Management Endpoints

### Change Account Password

Change the authenticated user's password.

- **URL**: `/account/password`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "currentPassword": "current-password",
    "newPassword": "new-password",
    "confirmPassword": "new-password"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Password changed successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data or passwords don't match
  - **Code**: `401 Unauthorized` - Current password is incorrect

### Request Account Deletion

Request to delete the authenticated user's account.

- **URL**: `/account/deletion-request`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "password": "current-password"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Account deletion request sent successfully. Please check your email to confirm."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid password
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Confirm Account Deletion

Confirm account deletion using a token sent to the user's email.

- **URL**: `/account/confirm-deletion/:token`
- **Method**: `DELETE`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Account deletion confirmation token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Account deleted successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

## Account Status Endpoints

### Activate Account

Activate a deactivated account using a token.

- **URL**: `/account/activate/:token`
- **Method**: `POST`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Account activation token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Account activated successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

### Request Account Deactivation

Request to deactivate the authenticated user's account.

- **URL**: `/account/deactivate-request`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "password": "current-password"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Account deactivation request sent successfully. Please check your email to confirm."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid password
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Confirm Account Deactivation

Confirm account deactivation using a token sent to the user's email.

- **URL**: `/account/deactivate-confirm/:token`
- **Method**: `POST`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Account deactivation confirmation token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Account deactivated successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

## Notification Management Endpoints

### Enable Account Notifications

Enable notifications for the authenticated user's account.

- **URL**: `/account/notifications/enable`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "notificationTypes": ["email", "push", "in-app"]
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Notifications enabled successfully",
      "data": {
        "notificationSettings": {
          "email": true,
          "push": true,
          "in-app": true
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid notification types
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Disable Account Notifications

Disable notifications for the authenticated user's account.

- **URL**: `/account/notifications/disable`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "notificationTypes": ["email", "push"]
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Notifications disabled successfully",
      "data": {
        "notificationSettings": {
          "email": false,
          "push": false,
          "in-app": true
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid notification types
  - **Code**: `401 Unauthorized` - Invalid or expired token

## Email Management Endpoints

### Request Email Change

Request to change the authenticated user's email address.

- **URL**: `/account/email/change-request`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "newEmail": "new-email@example.com",
    "password": "current-password"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Email change request sent successfully. Please check both your current and new email addresses for confirmation."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid email or password
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `409 Conflict` - Email already in use

### Confirm Email Change

Confirm email change using a token sent to the current email address.

- **URL**: `/account/email/confirm-change/:token`
- **Method**: `PATCH`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Email change confirmation token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Email change confirmed. Please verify ownership of your new email address."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

### Verify New Email Ownership

Verify ownership of the new email address using a token sent to that email.

- **URL**: `/account/email/verify-new-email/:token`
- **Method**: `PATCH`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: New email verification token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "New email verified successfully. Your email has been updated."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

### Resend New Email Verification Token

Resend the verification token to the new email address.

- **URL**: `/account/email/resend-new-email-token`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Verification token resent to your new email address."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - No pending email change
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `429 Too Many Requests` - Rate limit exceeded

## Admin User Management

The admin routes for user management are available at `/api/admin/users` and require admin privileges. These endpoints provide administrative functions for managing users across the platform.

## Implementation Details

### User Profile Management

1. **Profile Retrieval**: Users can retrieve their profile information
2. **Profile Updates**: Users can update their profile picture and personal information
3. **Profile Visibility**: Profile information visibility can be controlled by the user

### Account Management Flow

1. **Password Management**: Users can change their password with current password verification
2. **Account Deletion**: Two-step process requiring email confirmation
3. **Account Deactivation/Activation**: Users can temporarily deactivate their accounts and reactivate them later

### Notification System

1. **Notification Types**: Email, push, and in-app notifications
2. **Notification Preferences**: Users can enable or disable specific notification types
3. **Notification Events**: Various system events trigger notifications based on user preferences

### Email Management

1. **Email Change Process**: Three-step verification process
   - Request with password verification
   - Confirmation from current email
   - Verification of new email ownership
2. **Security Measures**: Tokens with expiration times, rate limiting for sensitive operations

## Dependencies

- Express.js for routing
- Multer for file uploads
- Inversify for dependency injection
- Nodemailer for sending emails
- Cloudinary for image storage

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "message": "Detailed error message"
}
```

Common error scenarios:
- Invalid input validation
- Authentication failures
- Authorization issues
- Rate limiting
- Resource not found
- Conflict with existing resources
