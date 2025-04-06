import { CommentData } from "./index";

export interface ICommentCRUDService {
  createComment(commentData: CommentData): Promise<void>;
}
