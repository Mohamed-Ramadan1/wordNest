import { CommentData, IComment, UpdateCommentData } from "./index";

export interface ICommentCRUDService {
  createComment(commentData: CommentData): Promise<void>;
  updateComment(
    updateCommentData: UpdateCommentData,
    comment: IComment
  ): Promise<void>;
}
