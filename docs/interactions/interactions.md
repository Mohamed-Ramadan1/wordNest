# Interactions API Documentation

## Overview

The Interactions module in WordNest enables users to engage with blog posts through various interaction types such as likes, dislikes, and other forms of engagement. This feature enhances user engagement and provides valuable feedback metrics for content creators and administrators.

## Base URL

```
/api/interactions
```

## Interactions Endpoints

All endpoints require user authentication (JWT token).

### Get All Interactions for a Blog Post

Retrieve all interactions associated with a specific blog post.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "blogPostId": "blog-post-id"
  }
  ```
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of items per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
  - `interactionType` (optional): Filter by interaction type
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Interactions with blog post retrieved successfully.",
      "results": 25,
      "data": {
        "interactions": [
          {
            "id": "interaction-id",
            "user": {
              "id": "user-id",
              "firstName": "John",
              "lastName": "Doe",
              "profilePicture": "url-to-profile-picture"
            },
            "blogPost": "blog-post-id",
            "interactionType": "Like",
            "createdAt": "2025-01-01T00:00:00.000Z",
            "updatedAt": "2025-01-01T00:00:00.000Z"
          }
          // More interactions...
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid blog post ID
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Blog post not found

### Create Interaction with Blog Post

Create a new interaction with a blog post (like, dislike, etc.).

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "newInteractionData": {
      "blogPost": "blog-post-id",
      "interactionType": "Like", // or "Dislike", etc.
      "user": "user-id" // Optional, defaults to authenticated user
    }
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Successfully interacted with blog post."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data or user already interacted with this blog post
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Blog post not found

### Update Interaction with Blog Post

Update an existing interaction with a blog post (e.g., change from like to dislike).

- **URL**: `/:interactionId`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `interactionId`: ID of the interaction to update
- **Request Body**:
  ```json
  {
    "interaction": {
      "id": "interaction-id",
      "user": "user-id",
      "blogPost": "blog-post-id"
      // Other interaction properties
    },
    "interactionType": "Dislike" // New interaction type
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Interaction with blog post updated successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the interaction
  - **Code**: `404 Not Found` - Interaction not found

### Delete Interaction with Blog Post

Remove an interaction with a blog post.

- **URL**: `/:interactionId`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `interactionId`: ID of the interaction to delete
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the interaction
  - **Code**: `404 Not Found` - Interaction not found

## Implementation Details

### Interaction Structure

An interaction in WordNest consists of:
- User reference (the user who created the interaction)
- Blog post reference (the blog post being interacted with)
- Interaction type (Like, Dislike, or other engagement types)
- Creation and update timestamps

### Interaction Types

The system supports various interaction types, which may include:
- Like: Positive feedback on a blog post
- Dislike: Negative feedback on a blog post
- Other custom interaction types as defined in the application

### Interaction Flow

1. **Creating an Interaction**:
   - User submits an interaction with a blog post
   - System validates that the blog post exists
   - System checks if the user has already interacted with the blog post
   - If the user has already interacted, the system may reject the request or update the existing interaction
   - System creates a new interaction record linking the user, blog post, and interaction type

2. **Updating an Interaction**:
   - User requests to update their interaction (e.g., change from Like to Dislike)
   - System verifies the user is the owner of the interaction
   - System updates the interaction type

3. **Deleting an Interaction**:
   - User requests to remove their interaction
   - System verifies the user is the owner of the interaction
   - System removes the interaction record

### Authorization Rules

- Only authenticated users can create, update, or delete interactions
- Users can only update or delete their own interactions
- Any authenticated user can view interactions on a blog post

## Dependencies

- Express.js for routing
- Inversify for dependency injection
- MongoDB for data storage

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
- Authorization issues (attempting to modify another user's interaction)
- Resource not found
- Duplicate interactions (attempting to create multiple interactions of the same type on the same blog post)
