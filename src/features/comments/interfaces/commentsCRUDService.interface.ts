import { ObjectId } from "mongoose";
import { CommentData, IComment, UpdateCommentData } from "./index";

export interface ICommentCRUDService {
  createComment(commentData: CommentData): Promise<void>;
  getComment(commentId: ObjectId): Promise<IComment>;
  updateComment(
    updateCommentData: UpdateCommentData,
    comment: IComment
  ): Promise<void>;

  deleteComment(userId: ObjectId, commentId: ObjectId): Promise<void>;
}
