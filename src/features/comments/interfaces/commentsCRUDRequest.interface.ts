// mongoose imports
import { ObjectId } from "mongoose";
import { IComment } from "./index";

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

export interface UpdateCommentData {
  content?: string;
  attachedImage?: {
    public_id: string;
    url: string;
  };
}

export interface UpdateCommentRequestBdy {
  content?: string;
  comment: IComment;
  updateCommentData: UpdateCommentData;
}

export interface CommentCRUDRequestParams {
  commentId: ObjectId;
}
