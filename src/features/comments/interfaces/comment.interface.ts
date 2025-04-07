import { Document, ObjectId } from "mongoose";
import { IUser } from "@features/users";
import { IBlog } from "@features/blogs/interfaces";

/**
 * Interface representing a comment on a blog post.
 */
export interface IComment extends Document {
  /**
   * Unique identifier for the comment.
   *
   * @type {ObjectId}
   */
  _id: ObjectId;

  /**
   * Blog post the comment is associated with.
   * Can be the blog's ObjectId or the populated blog document.
   *
   * @type {ObjectId | IBlog}
   */
  blog: ObjectId | IBlog;

  /**
   * Author of the comment.
   * Can be the user's ObjectId or the populated user document.
   *
   * @type {ObjectId | IUser}
   */
  comment_author: IUser | ObjectId;

  /**
   * Content of the comment.
   *
   * @type {string}
   */
  content: string;

  /**
   * Optional image attached to the comment.
   *
   * @type {{ public_id: string; url: string; } | undefined}
   */
  attachedImage?: {
    /**
     * Public ID of the image stored in a cloud service.
     */
    public_id: string;

    /**
     * Accessible URL of the image.
     */
    url: string;
  };

  /**
   * Date when the comment was created.
   *
   * @type {Date}
   */
  createdAt: Date;

  /**
   * Date when the comment was last updated.
   *
   * @type {Date}
   */
  updatedAt: Date;
}
