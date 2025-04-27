# Comments API Documentation

## Overview

The Comments module in WordNest provides functionality for users to create, read, update, and delete comments on blog posts. This module enables interactive discussions and feedback on published content.

## Base URL

```
/api/comments
```

## Comment Endpoints

### Get Blog Post Comments

Retrieve all comments for a specific blog post.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "blogId": "blog-post-id"
  }
  ```
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of comments per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Comments retrieved successfully",
      "results": 10,
      "data": {
        "comments": [
          {
            "id": "comment-id",
            "content": "Comment content text",
            "author": {
              "id": "user-id",
              "firstName": "John",
              "lastName": "Doe",
              "profilePicture": "url-to-profile-picture"
            },
            "blogPost": "blog-post-id",
            "attachedImage": "url-to-attached-image",
            "createdAt": "2025-01-01T00:00:00.000Z",
            "updatedAt": "2025-01-01T00:00:00.000Z"
          }
          // More comments...
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid blog ID
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Blog post not found

### Create Comment

Create a new comment on a blog post.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `commentData`: JSON object containing:
    ```json
    {
      "content": "Comment text content",
      "blogPost": "blog-post-id"
    }
    ```
  - `attachedImage` (optional): Image file to attach to the comment
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Comment created successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Blog post not found

### Get Comment by ID

Retrieve a specific comment by its ID.

- **URL**: `/:commentId`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `commentId`: ID of the comment
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Comment retrieved successfully",
      "data": {
        "comment": {
          "id": "comment-id",
          "content": "Comment content text",
          "author": {
            "id": "user-id",
            "firstName": "John",
            "lastName": "Doe",
            "profilePicture": "url-to-profile-picture"
          },
          "blogPost": {
            "id": "blog-post-id",
            "title": "Blog Post Title"
          },
          "attachedImage": "url-to-attached-image",
          "createdAt": "2025-01-01T00:00:00.000Z",
          "updatedAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Comment not found

### Update Comment

Update an existing comment.

- **URL**: `/:commentId`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `commentId`: ID of the comment
- **Request Body**:
  - `updateCommentData`: JSON object containing:
    ```json
    {
      "content": "Updated comment text content"
    }
    ```
  - `attachedImage` (optional): New image file to attach to the comment
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Comment updated successfully"
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the author of the comment
  - **Code**: `404 Not Found` - Comment not found

### Delete Comment

Delete a specific comment.

- **URL**: `/:commentId`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `commentId`: ID of the comment
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the author of the comment or does not have permission
  - **Code**: `404 Not Found` - Comment not found

## Implementation Details

### Comment Structure

A comment in WordNest consists of:
- Content text (required)
- Author (automatically set to the authenticated user)
- Blog post reference (required)
- Optional attached image
- Creation and update timestamps

### Comment Creation Flow

1. User submits a comment with content and optional image
2. System validates the input data
3. System associates the comment with the authenticated user
4. System saves the comment and links it to the specified blog post
5. If an image is provided, it's uploaded to cloud storage and linked to the comment

### Comment Update Flow

1. User submits updated content and/or a new image
2. System verifies the user is the author of the comment
3. System validates the input data
4. System updates the comment with new content
5. If a new image is provided, the old image is replaced

### Comment Deletion Flow

1. User requests to delete a comment
2. System verifies the user is the author of the comment or has admin privileges
3. System removes the comment from the database
4. If the comment had an attached image, it's removed from storage

### Authorization Rules

- Any authenticated user can view comments
- Only the comment author can update or delete their own comments
- Administrators can delete any comment

## Dependencies

- Express.js for routing
- Multer for file uploads
- Inversify for dependency injection
- MongoDB for data storage
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
- Resource not found
- Rate limiting
