import { ObjectId } from "mongoose";
import { CommentData, IComment, UpdateCommentData } from "./index";
import { ParsedQs } from "qs";

/**
 * Interface for comment CRUD service operations.
 * This defines the business logic layer for handling comments.
 */
export interface ICommentCRUDService {
  /**
   * Creates a new comment.
   *
   * @param {CommentData} commentData - Data required to create the comment.
   * @returns {Promise<void>}
   */
  createComment(commentData: CommentData): Promise<void>;

  /**
   * Retrieves comments associated with a specific blog post.
   *
   * @param {ObjectId} blogId - The ID of the blog post.
   * @param {ParsedQs} queryString - Query parameters for filtering, sorting, pagination, etc.
   * @returns {Promise<IComment[]>}
   */
  getBlogPostComments(
    blogId: ObjectId,
    queryString: ParsedQs
  ): Promise<IComment[]>;

  /**
   * Retrieves a specific comment by its ID.
   *
   * @param {ObjectId} commentId - The ID of the comment to retrieve.
   * @returns {Promise<IComment>}
   */
  getComment(commentId: ObjectId): Promise<IComment>;

  /**
   * Updates a comment with new data.
   *
   * @param {UpdateCommentData} updateCommentData - Data to update in the comment.
   * @param {IComment} comment - The existing comment to be updated.
   * @returns {Promise<void>}
   */
  updateComment(
    updateCommentData: UpdateCommentData,
    comment: IComment
  ): Promise<void>;

  /**
   * Deletes a comment based on the user ID and comment ID.
   *
   * @param {ObjectId} userId - ID of the user attempting the delete.
   * @param {ObjectId} commentId - ID of the comment to delete.
   * @returns {Promise<void>}
   */
  deleteComment(userId: ObjectId, commentId: ObjectId): Promise<void>;
}
