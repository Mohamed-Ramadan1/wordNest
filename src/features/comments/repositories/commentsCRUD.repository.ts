// packages imports
import { inject, injectable } from "inversify";
import { ClientSession, Model, ObjectId } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import {
  CommentData,
  IComment,
  ICommentCRUDRepository,
  UpdateCommentData,
} from "../interfaces/index";
import { IBlog } from "@features/blogs/interfaces";

@injectable()
export class CommentCRUDRepository implements ICommentCRUDRepository {
  constructor(
    @inject(TYPES.CommentModel) private readonly commentModel: Model<IComment>,
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>
  ) {}
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

  public async getCommentByIdAndUser(
    commentId: Object,
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
  // public async getCommentsByBlogPost(): Promise<IComment[]> {}
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
