// packages imports
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";

// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  CommentData,
  IComment,
  ICommentCRUDRepository,
  ICommentCRUDService,
  UpdateCommentData,
} from "../interfaces/index";
import { ObjectId } from "mongoose";

/**
 * @class CommentsCRUDService
 * @implements {ICommentCRUDService}
 * @description Service class for handling comment CRUD operations
 */
@injectable()
export class CommentsCRUDService implements ICommentCRUDService {
  /**
   * Creates an instance of CommentsCRUDService
   * @param {IErrorUtils} errorUtile - Error handling utility
   * @param {ICommentCRUDRepository} commentsCRUDRepository - Repository for comment CRUD operations
   */
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtile: IErrorUtils,
    @inject(TYPES.CommentCRUDRepository)
    private readonly commentsCRUDRepository: ICommentCRUDRepository
  ) {}

  /**
   * Creates a new comment
   * @async
   * @param {CommentData} commentData - Data for the new comment
   * @returns {Promise<void>}
   * @throws {Error} If comment creation fails (handled by error utility)
   */
  public async createComment(commentData: CommentData): Promise<void> {
    try {
      await this.commentsCRUDRepository.createNewComment(commentData);
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  /**
   * Retrieves a comment by its ID
   * @async
   * @param {ObjectId} commentId - ID of the comment
   * @returns {Promise<IComment>} The requested comment
   * @throws {Error} If comment retrieval fails (handled by error utility)
   */
  public async getComment(commentId: ObjectId): Promise<IComment> {
    try {
      const comment: IComment =
        await this.commentsCRUDRepository.getCommentById(commentId);
      return comment;
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  /**
   * Retrieves comments for a specific blog post
   * @async
   * @param {ObjectId} blogId - ID of the blog post
   * @param {ParsedQs} queryString - Query string parameters
   * @returns {Promise<IComment[]>} Array of comments
   * @throws {Error} If comment retrieval fails (handled by error utility)
   */
  public async getBlogPostComments(
    blogId: ObjectId,
    queryString: ParsedQs
  ): Promise<IComment[]> {
    try {
      const comments: IComment[] =
        await this.commentsCRUDRepository.getCommentsOnBlogPost(
          blogId,
          queryString
        );
      return comments;
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  /**
   * Updates an existing comment
   * @async
   * @param {UpdateCommentData} updateCommentData - Data to update the comment with
   * @param {IComment} comment - The comment to update
   * @returns {Promise<void>}
   * @throws {Error} If comment update fails (handled by error utility)
   */
  public async updateComment(
    updateCommentData: UpdateCommentData,
    comment: IComment
  ): Promise<void> {
    try {
      await this.commentsCRUDRepository.updateComment(
        comment,
        updateCommentData
      );
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }

  /**
   * Deletes a comment
   * @async
   * @param {ObjectId} userId - ID of the user requesting deletion
   * @param {ObjectId} commentId - ID of the comment to delete
   * @returns {Promise<void>}
   * @throws {Error} If comment deletion fails (handled by error utility)
   */
  public async deleteComment(
    userId: ObjectId,
    commentId: ObjectId
  ): Promise<void> {
    try {
      await this.commentsCRUDRepository.deleteComment(commentId, userId);
    } catch (err: any) {
      this.errorUtile.handleServiceError(err);
    }
  }
}
