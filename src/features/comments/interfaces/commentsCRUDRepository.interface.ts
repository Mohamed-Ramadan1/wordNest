import { CommentData } from "./index";

export interface ICommentCRUDRepository {
  createNewComment(commentData: CommentData): Promise<void>;
}
