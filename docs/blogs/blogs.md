# Blog Management API Documentation

## Overview

The Blog Management module in WordNest provides comprehensive functionality for creating, reading, updating, and deleting blog posts. This module supports different access levels (public, owner, admin) and includes features for scheduling posts, managing blog visibility, and archiving content.

## Base URLs

- **Public Access**: `/api/blogs`
- **Blog Owner Access**: `/api/blogs/owner`
- **Admin Access**: `/api/blogs/admin`

## Public Blog Endpoints

These endpoints are accessible to all users without authentication.

### Get All Blog Posts

Retrieve a list of all published blog posts.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Not required
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of posts per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
  - `tags` (optional): Filter by tags
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "results": 10,
      "data": {
        "blogs": [
          {
            "id": "blog-id",
            "title": "Blog Title",
            "slug": "blog-title",
            "content": "Blog content...",
            "author": {
              "id": "author-id",
              "firstName": "John",
              "lastName": "Doe",
              "profilePicture": "url-to-profile-picture"
            },
            "tags": ["technology", "programming"],
            "coverImage": "url-to-cover-image",
            "readTime": 5,
            "createdAt": "2025-01-01T00:00:00.000Z",
            "updatedAt": "2025-01-01T00:00:00.000Z"
          }
          // More blog posts...
        ]
      }
    }
    ```

### Get Blog Post by ID

Retrieve a specific blog post by its ID.

- **URL**: `/:blogId`
- **Method**: `GET`
- **Authentication**: Not required
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "blog": {
          "id": "blog-id",
          "title": "Blog Title",
          "slug": "blog-title",
          "content": "Blog content...",
          "author": {
            "id": "author-id",
            "firstName": "John",
            "lastName": "Doe",
            "profilePicture": "url-to-profile-picture"
          },
          "tags": ["technology", "programming"],
          "coverImage": "url-to-cover-image",
          "readTime": 5,
          "createdAt": "2025-01-01T00:00:00.000Z",
          "updatedAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found` - Blog post not found

### Get All Blog Posts by User

Retrieve all published blog posts by a specific user.

- **URL**: `/user/:userId`
- **Method**: `GET`
- **Authentication**: Not required
- **URL Parameters**:
  - `userId`: ID of the user
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of posts per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "results": 5,
      "data": {
        "blogs": [
          {
            "id": "blog-id",
            "title": "Blog Title",
            "slug": "blog-title",
            "content": "Blog content...",
            "tags": ["technology", "programming"],
            "coverImage": "url-to-cover-image",
            "readTime": 5,
            "createdAt": "2025-01-01T00:00:00.000Z",
            "updatedAt": "2025-01-01T00:00:00.000Z"
          }
          // More blog posts...
        ],
        "author": {
          "id": "author-id",
          "firstName": "John",
          "lastName": "Doe",
          "profilePicture": "url-to-profile-picture"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `404 Not Found` - User not found

## Blog Owner Endpoints

These endpoints are accessible only to authenticated users who own the blogs.

### Get All Owner's Blog Posts

Retrieve all blog posts owned by the authenticated user.

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of posts per page
  - `sort` (optional): Sort criteria (e.g., "createdAt", "-createdAt")
  - `status` (optional): Filter by status (e.g., "published", "draft", "archived")
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: Similar to Get All Blog Posts response

### Create Blog Post

Create a new blog post.

- **URL**: `/`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `title`: Blog post title
  - `content`: Blog post content
  - `tags` (optional): Array of tags
  - `blogImages` (optional): Up to 5 image files
  - `status` (optional): Blog status (default: "published")
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "blog": {
          "id": "blog-id",
          "title": "Blog Title",
          "slug": "blog-title",
          "content": "Blog content...",
          "author": "author-id",
          "tags": ["technology", "programming"],
          "images": ["url-to-image-1", "url-to-image-2"],
          "status": "published",
          "createdAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Get Blog Post by ID (Owner)

Retrieve a specific blog post owned by the authenticated user.

- **URL**: `/:blogId`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: Similar to Get Blog Post by ID response
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Update Blog Post

Update a specific blog post owned by the authenticated user.

- **URL**: `/:blogId`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Request Body**:
  - `title` (optional): Updated blog post title
  - `content` (optional): Updated blog post content
  - `tags` (optional): Updated array of tags
  - `image` (optional): New image file
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "blog": {
          "id": "blog-id",
          "title": "Updated Blog Title",
          "content": "Updated blog content...",
          "tags": ["updated", "tags"],
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Delete Blog Post

Delete a specific blog post owned by the authenticated user.

- **URL**: `/:blogId`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Convert Blog to Private

Make a blog post private (visible only to the owner).

- **URL**: `/:blogId/private`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post is now private",
      "data": {
        "blog": {
          "id": "blog-id",
          "status": "private",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Convert Blog to Public

Make a blog post public (visible to all users).

- **URL**: `/:blogId/public`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post is now public",
      "data": {
        "blog": {
          "id": "blog-id",
          "status": "published",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Archive Blog Post

Archive a blog post (hidden from public view but not deleted).

- **URL**: `/:blogId/archive`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post archived successfully",
      "data": {
        "blog": {
          "id": "blog-id",
          "status": "archived",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

### Restore Archived Blog Post

Restore an archived blog post to its previous status.

- **URL**: `/:blogId/unarchive`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post restored successfully",
      "data": {
        "blog": {
          "id": "blog-id",
          "status": "published",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the blog post
  - **Code**: `404 Not Found` - Blog post not found

## Scheduled Blog Posts Endpoints

These endpoints allow blog owners to schedule posts for future publication.

### Get All Scheduled Blog Posts

Retrieve all scheduled blog posts owned by the authenticated user.

- **URL**: `/scheduled`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "results": 3,
      "data": {
        "scheduledBlogs": [
          {
            "id": "scheduled-blog-id",
            "title": "Scheduled Blog Title",
            "content": "Scheduled blog content...",
            "scheduledFor": "2025-02-01T10:00:00.000Z",
            "status": "scheduled",
            "createdAt": "2025-01-01T00:00:00.000Z"
          }
          // More scheduled blog posts...
        ]
      }
    }
    ```

### Create Scheduled Blog Post

Create a new blog post scheduled for future publication.

- **URL**: `/scheduled`
- **Method**: `POST`
- **Authentication**: Required (JWT token)
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `title`: Blog post title
  - `content`: Blog post content
  - `tags` (optional): Array of tags
  - `blogImages` (optional): Up to 5 image files
  - `scheduledFor`: Date and time for publication (ISO format)
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "scheduledBlog": {
          "id": "scheduled-blog-id",
          "title": "Scheduled Blog Title",
          "content": "Scheduled blog content...",
          "scheduledFor": "2025-02-01T10:00:00.000Z",
          "status": "scheduled",
          "createdAt": "2025-01-01T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data or invalid date format
  - **Code**: `401 Unauthorized` - Invalid or expired token

### Get Scheduled Blog Post

Retrieve a specific scheduled blog post.

- **URL**: `/scheduled/:blogId`
- **Method**: `GET`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the scheduled blog post
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: Similar to Create Scheduled Blog Post response
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the scheduled blog post
  - **Code**: `404 Not Found` - Scheduled blog post not found

### Update Scheduled Blog Post

Update a specific scheduled blog post.

- **URL**: `/scheduled/:blogId`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the scheduled blog post
- **Request Body**:
  - `title` (optional): Updated blog post title
  - `content` (optional): Updated blog post content
  - `tags` (optional): Updated array of tags
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "scheduledBlog": {
          "id": "scheduled-blog-id",
          "title": "Updated Scheduled Blog Title",
          "content": "Updated scheduled blog content...",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid input data
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the scheduled blog post
  - **Code**: `404 Not Found` - Scheduled blog post not found

### Delete Scheduled Blog Post

Delete a specific scheduled blog post.

- **URL**: `/scheduled/:blogId`
- **Method**: `DELETE`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the scheduled blog post
- **Success Response**:
  - **Code**: `204 No Content`
- **Error Responses**:
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the scheduled blog post
  - **Code**: `404 Not Found` - Scheduled blog post not found

### Reschedule Blog Post

Change the scheduled publication date of a blog post.

- **URL**: `/scheduled/:blogId/reschedule`
- **Method**: `PATCH`
- **Authentication**: Required (JWT token)
- **URL Parameters**:
  - `blogId`: ID of the scheduled blog post
- **Request Body**:
  - `scheduledFor`: New date and time for publication (ISO format)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "status": "success",
      "message": "Blog post rescheduled successfully",
      "data": {
        "scheduledBlog": {
          "id": "scheduled-blog-id",
          "scheduledFor": "2025-03-01T10:00:00.000Z",
          "updatedAt": "2025-01-02T00:00:00.000Z"
        }
      }
    }
    ```
- **Error Responses**:
  - **Code**: `400 Bad Request` - Invalid date format
  - **Code**: `401 Unauthorized` - Invalid or expired token
  - **Code**: `403 Forbidden` - User is not the owner of the sched
(Content truncated due to size limit. Use line ranges to read in chunks)