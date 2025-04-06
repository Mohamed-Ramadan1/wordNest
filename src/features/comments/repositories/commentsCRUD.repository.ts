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
  // public async getCommentById(commentId: Object): Promise<IComment> {}
  // public async getCommentsByBlogPost(): Promise<IComment[]> {}
  // public async updateComment(): Promise<void> {}
  // public async deleteComment(commentId: ObjectId): Promise<void> {}
}
