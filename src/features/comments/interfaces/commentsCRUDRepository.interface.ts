import { ObjectId } from "mongoose";
import { CommentData, IComment, UpdateCommentData } from "./index";

export interface ICommentCRUDRepository {
  createNewComment(commentData: CommentData): Promise<void>;
  getCommentById(commentId: ObjectId): Promise<IComment>;
  getCommentByIdAndUser(
    commentId: ObjectId,
    userId: ObjectId
  ): Promise<IComment>;

  updateComment(
    comment: IComment,
    updateCommentData: UpdateCommentData
  ): Promise<void>;
}
