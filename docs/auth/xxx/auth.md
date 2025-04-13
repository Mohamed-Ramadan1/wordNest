# Authentication API Documentation

## Overview

The Authentication module in WordNest provides comprehensive user authentication and account management functionality. This module handles user registration, login, logout, email verification, and password recovery operations.

## Base URL

```
/api/auth
```

## Authentication Endpoints

### User Registration

Register a new user with email and password.

- **URL**: `/register`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123"
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "token": "jwt-token-here",
      "data": {
        "user": {
          "id": "user-id",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `409 Conflict` - Email already exists

### User Login

Authenticate a user with email and password.

- **URL**: `/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "User logged in successfully",
      "token": "jwt-token-here"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid credentials
  - **Code**: `401 Unauthorized` - Account locked or inactive

### User Logout

Log out the currently authenticated user.

- **URL**: `/logout`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "User logged out successfully",
      "token": "invalidated-token"
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Social Authentication

Register a user with a social account (Google).

- **URL**: `/social-register`
- **Method**: `POST`
- **Authentication**: Not required
- **Notes**: This endpoint is prepared but not fully implemented in the current version.

## Account Recovery Endpoints

### Email Verification

Verify a user's email address using a verification token.

- **URL**: `/verify-email/:token`
- **Method**: `GET`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Email verification token
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Email Verified successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `404 Not Found` - User not found

### Resend Verification Email

Request a new verification email for the authenticated user.

- **URL**: `/verify-email/resend`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Verification email resent successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `429 Too Many Requests` - Rate limit exceeded

### Forgot Password

Request a password reset email.

- **URL**: `/password/forgot`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Password reset request was successful please check your email address."
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found` - Email not found
  - **Code**: `429 Too Many Requests` - Rate limit exceeded

### Reset Password

Reset a user's password using a reset token.

- **URL**: `/password/reset/:token`
- **Method**: `POST`
- **Authentication**: Not required (token in URL)
- **URL Parameters**:
  - `token`: Password reset token
- **Request Body**:
  ```json
  {
    "newPassword": "newSecurePassword123"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Password reset successfully now you can login with your new password."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid or expired token
  - **Code**: `400 Bad Request` - Password does not meet requirements

## Implementation Details

### Authentication Flow

1. **Registration**: Users register with email, first name, last name, and password
2. **Email Verification**: A verification email is sent to the user's email address
3. **Login**: Users can log in with their email and password after verification
4. **Token-based Authentication**: JWT tokens are used for maintaining user sessions
5. **Logout**: User sessions are invalidated on logout

### Password Recovery Flow

1. **Forgot Password Request**: User requests a password reset by providing their email
2. **Reset Email**: A password reset email with a secure token is sent to the user
3. **Password Reset**: User sets a new password using the token from the email

### Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Rate limiting for sensitive operations
- IP tracking for security monitoring
- Account locking after multiple failed attempts

## Dependencies

- Express.js for routing
- Inversify for dependency injection
- JWT for token-based authentication
- Nodemailer for sending emails

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
- User not found
- Email already exists
- Invalid credentials
- Expired tokens
- Rate limiting
