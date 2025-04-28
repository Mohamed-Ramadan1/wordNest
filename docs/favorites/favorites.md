# Favorites API Documentation

## Overview

The Favorites module in WordNest allows users to create and manage a personal collection of favorite blog posts. Users can add blog posts to their favorites list, remove them, and retrieve their favorites. This feature enhances user experience by enabling quick access to content they find valuable or want to revisit later.

## Base URL

```
/api/favorites
```

## Favorites Endpoints

All endpoints require user authentication (JWT token).

### Get All Favorites

Retrieve all blog posts in the user's favorites list.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of items per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "User's favorite blog posts retrieved successfully.",
      "results": 10,
      "data": {
        "favorites": [
          {
            "id": "favorite-id",
            "user": "user-id",
            "blogPost": {
              "id": "blog-post-id",
              "title": "Blog Post Title",
              "excerpt": "Blog post excerpt...",
              "coverImage": "url-to-cover-image",
              "author": {
                "id": "author-id",
                "firstName": "John",
                "lastName": "Doe",
                "profilePicture": "url-to-profile-picture"
              }
            },
            "createdAt": "2025-01-01T00:00:00.000Z"
          }
          // More favorites...
        ]
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Add to Favorites

Add a blog post to the user's favorites list.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Request Body**:
  ```json
  {
    "blogPostId": "blog-post-id"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post added to favorites successfully."
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid blog post ID or blog post already in favorites
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Blog post not found

### Get Specific Favorite

Retrieve a specific blog post from the user's favorites list.

- **URL**: `/:favoriteId`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `favoriteId`: ID of the favorite item
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "User's favorite blog post retrieved successfully.",
      "data": {
        "favorite": {
          "id": "favorite-id",
          "user": "user-id",
          "blogPost": {
            "id": "blog-post-id",
            "title": "Blog Post Title",
            "content": "Full blog post content...",
            "coverImage": "url-to-cover-image",
            "author": {
              "id": "author-id",
              "firstName": "John",
              "lastName": "Doe",
              "profilePicture": "url-to-profile-picture"
            },
            "createdAt": "2025-01-01T00:00:00.000Z",
            "updatedAt": "2025-01-01T00:00:00.000Z"
          },
          "createdAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `404 Not Found` - Favorite item not found

### Remove from Favorites

Remove a blog post from the user's favorites list.

- **URL**: `/:favoriteId`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `favoriteId`: ID of the favorite item
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the favorite item
  - **Code**: `404 Not Found` - Favorite item not found

## Implementation Details

### Favorites Structure

A favorite item in WordNest consists of:
- User reference (the user who added the item to favorites)
- Blog post reference (the blog post that was added to favorites)
- Creation timestamp

### Favorites Management Flow

1. **Adding to Favorites**:
   - User submits a request with a blog post ID
   - System validates that the blog post exists
   - System checks if the blog post is already in the user's favorites
   - System creates a new favorite item linking the user and blog post

2. **Retrieving Favorites**:
   - User requests their favorites list
   - System retrieves all favorite items for the authenticated user
   - System populates blog post details for each favorite item

3. **Removing from Favorites**:
   - User requests to remove a specific favorite item
   - System verifies the user is the owner of the favorite item
   - System removes the favorite item from the database
   - System also removes any cached data related to the favorite item

### Performance Optimization

The Favorites feature implements Redis caching to improve performance:
- Individual favorite items are cached when retrieved
- Cache is invalidated when a favorite item is removed
- Cache expiration is set to 1 hour by default

### Authorization Rules

- Only authenticated users can access the Favorites endpoints
- Users can only view and manage their own favorites
- Users cannot access or modify favorites belonging to other users

## Dependencies

- Express.js for routing
- Inversify for dependency injection
- MongoDB for data storage
- Redis for caching

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
- Duplicate favorites (attempting to add the same blog post twice)
