import { Model, Schema, model } from "mongoose";
import { IComment } from "../interfaces/index";

const commentSchema: Schema = new Schema<IComment>(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Blog post is required"],
    },
    comment_author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment author is required"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
    attachedImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
// Add indexes for better performance
commentSchema.index({ blog: 1, createdAt: -1 });

// prev find populate the usr who mad the comment name and email only
commentSchema.pre<IComment>(/^find/, function (next) {
  this.populate({
    path: "comment_author",
    select: "firstName email",
  });
  next();
});

const CommentModel: Model<IComment> = model<IComment>("Comment", commentSchema);
export default CommentModel;
