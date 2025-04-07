import { ObjectId } from "mongoose";
import { CommentData, IComment, UpdateCommentData } from "./index";
import { ParsedQs } from "qs";

/**
 * Interface for comment CRUD operations in the repository layer.
 */
export interface ICommentCRUDRepository {
  /**
   * Creates a new comment.
   *
   * @param {CommentData} commentData - Data required to create the comment.
   * @returns {Promise<void>}
   */
  createNewComment(commentData: CommentData): Promise<void>;

  /**
   * Retrieves all comments associated with a specific blog post.
   *
   * @param {ObjectId} blogId - The ID of the blog post.
   * @param {ParsedQs} queryString - Query parameters for pagination, sorting, etc.
   * @returns {Promise<IComment[]>}
   */
  getCommentsOnBlogPost(
    blogId: ObjectId,
    queryString: ParsedQs
  ): Promise<IComment[]>;

  /**
   * Retrieves a comment by its ID.
   *
   * @param {ObjectId} commentId - The ID of the comment.
   * @returns {Promise<IComment>}
   */
  getCommentById(commentId: ObjectId): Promise<IComment>;

  /**
   * Retrieves a comment by its ID and the ID of the user who created it.
   *
   * @param {ObjectId} commentId - The ID of the comment.
   * @param {ObjectId} userId - The ID of the comment's author.
   * @returns {Promise<IComment>}
   */
  getCommentByIdAndUser(
    commentId: ObjectId,
    userId: ObjectId
  ): Promise<IComment>;

  /**
   * Updates a comment with new content or data.
   *
   * @param {IComment} comment - The comment document to update.
   * @param {UpdateCommentData} updateCommentData - The data to update in the comment.
   * @returns {Promise<void>}
   */
  updateComment(
    comment: IComment,
    updateCommentData: UpdateCommentData
  ): Promise<void>;

  /**
   * Deletes a comment by its ID and the user's ID.
   *
   * @param {ObjectId} commentId - The ID of the comment to delete.
   * @param {ObjectId} userId - The ID of the user who owns the comment.
   * @returns {Promise<void>}
   */
  deleteComment(commentId: ObjectId, userId: ObjectId): Promise<void>;
}
