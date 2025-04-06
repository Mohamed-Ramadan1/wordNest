// mongoose imports
import { ObjectId } from "mongoose";

export interface CommentData {
  blog: ObjectId;
  comment_author: ObjectId;
  content: string;
  attachedImage?: {
    public_id: string;
    url: string;
  };
}

export interface CreateCommentRequestBdy {
  blogId: ObjectId;
  content: string;
  attachedImage?: {
    public_id: string;
    url: string;
  };

  commentData: CommentData;
}

export interface UpdateCommentRequestBdy {}

export interface CommentCRUDRequestParams {
  commentId: string;
}
