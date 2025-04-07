// packages imports
import { inject, injectable } from "inversify";
import { ClientSession, Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

// interfaces imports
import {
  CommentData,
  IComment,
  ICommentCRUDRepository,
  UpdateCommentData,
} from "../interfaces/index";
import { IBlog } from "@features/blogs/interfaces";

/**
 * @class CommentCRUDRepository
 * @implements {ICommentCRUDRepository}
 * @description Repository class for handling comment CRUD operations
 */
@injectable()
export class CommentCRUDRepository implements ICommentCRUDRepository {
  /**
   * Creates an instance of CommentCRUDRepository
   * @param {Model<IComment>} commentModel - Mongoose model for comments
   * @param {Model<IBlog>} blogModel - Mongoose model for blogs
   * @param {(query: Query<IComment[], IComment>, queryString: ParsedQs) => APIFeaturesInterface<IComment>} apiFeatures - API features utility for query building
   */
  constructor(
    @inject(TYPES.CommentModel) private readonly commentModel: Model<IComment>,
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IComment[], IComment>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IComment>
  ) {}

  /**
   * Creates a new comment with transaction support
   * @async
   * @param {CommentData} commentData - Data for the new comment
   * @returns {Promise<void>}
   * @throws {Error} If comment creation fails
   */
  public async createNewComment(commentData: CommentData): Promise<void> {
    const session: ClientSession = await this.commentModel.startSession();
    try {
      session.startTransaction();
      const newComment = await this.commentModel.create([commentData], {
        session,
      });
      if (!newComment) {
        throw new Error("Failed to create the comment");
      }
      await this.blogModel.updateOne(
        { _id: commentData.blog },
        { $inc: { commentsCount: 1 } },
        { session }
      );
      await session.commitTransaction();
    } catch (err: any) {
      await session.abortTransaction();
      throw new Error(
        `Failed to create the comment on blog post.
        ${err.message}`
      );
    } finally {
      await session.endSession();
    }
  }

  /**
   * Retrieves comments for a specific blog post with query features
   * @async
   * @param {ObjectId} blogId - ID of the blog post
   * @param {ParsedQs} queryString - Query string parameters
   * @returns {Promise<IComment[]>} Array of comments
   * @throws {Error} If comment retrieval fails
   */
  public async getCommentsOnBlogPost(
    blogId: ObjectId,
    queryString: ParsedQs
  ): Promise<IComment[]> {
    try {
      const features = this.apiFeatures(
        this.commentModel.find({
          blog: blogId,
        }),
        queryString
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const comments: IComment[] = await features.execute();
      return comments;
    } catch (err: any) {
      throw new Error(
        `Failed to get the comments on the blog post.
        ${err.message}`
      );
    }
  }

  /**
   * Retrieves a comment by its ID
   * @async
   * @param {ObjectId} commentId - ID of the comment
   * @returns {Promise<IComment>} The requested comment
   * @throws {Error} If comment is not found or retrieval fails
   */
  public async getCommentById(commentId: ObjectId): Promise<IComment> {
    try {
      const comment: IComment | null =
        await this.commentModel.findById(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      return comment;
    } catch (err: any) {
      throw new Error(
        `Failed to get the comment.
        ${err.message}`
      );
    }
  }

  /**
   * Retrieves a comment by ID and user ID
   * @async
   * @param {ObjectId} commentId - ID of the comment
   * @param {ObjectId} userId - ID of the user
   * @returns {Promise<IComment>} The requested comment
   * @throws {Error} If comment is not found or retrieval fails
   */
  public async getCommentByIdAndUser(
    commentId: ObjectId,
    userId: ObjectId
  ): Promise<IComment> {
    try {
      const comment: IComment | null = await this.commentModel.findOne({
        _id: commentId,
        comment_author: userId,
      });

      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    } catch (err: any) {
      throw new Error(
        `Failed to get the comment.
        ${err.message}`
      );
    }
  }

  /**
   * Updates an existing comment
   * @async
   * @param {IComment} comment - The comment to update
   * @param {UpdateCommentData} updateCommentData - Data to update the comment with
   * @returns {Promise<void>}
   * @throws {Error} If update fails
   */
  public async updateComment(
    comment: IComment,
    updateCommentData: UpdateCommentData
  ): Promise<void> {
    try {
      if (updateCommentData.attachedImage)
        comment.attachedImage = updateCommentData.attachedImage;

      if (updateCommentData.content)
        comment.content = updateCommentData.content;
      await comment.save();
    } catch (err: any) {
      throw new Error(
        `Failed to update the comment.
        ${err.message}`
      );
    }
  }

  /**
   * Deletes a comment with transaction support
   * @async
   * @param {ObjectId} commentId - ID of the comment to delete
   * @param {ObjectId} userId - ID of the user requesting deletion
   * @returns {Promise<void>}
   * @throws {Error} If deletion fails
   */
  public async deleteComment(
    commentId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    const session: ClientSession = await this.commentModel.startSession();
    try {
      session.startTransaction();
      const deletedComment: IComment | null =
        await this.commentModel.findOneAndDelete(
          { _id: commentId, comment_author: userId },
          { session }
        );
      if (!deletedComment) {
        throw new Error("No comment found by this id and related ot this user");
      }
      await this.blogModel.updateOne(
        { _id: deletedComment.blog },
        { $inc: { commentsCount: -1 } },
        { session }
      );
      await session.commitTransaction();
    } catch (err: any) {
      await session.abortTransaction();
      throw new Error(
        `Failed to delete the comment .
        ${err.message}`
      );
    } finally {
      await session.endSession();
    }
  }
}
