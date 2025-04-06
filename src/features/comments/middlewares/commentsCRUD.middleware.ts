// express imports
import { Request, Response, NextFunction } from "express";
// mongoose imports
import { Model } from "mongoose";
// packages imports
import { inject, injectable } from "inversify";

// shard imports
import {
  TYPES,
  validateDto,
  catchAsync,
  AppError,
  ICloudinaryUploader,
} from "@shared/index";

// interfaces imports
import {
  CommentData,
  CreateCommentRequestBdy,
  ICommentCRUDMiddleware,
} from "../interfaces/index";

// dtos imports
import { CreateCommentDTO } from "../dtos/index";
import { IBlog } from "@features/blogs/interfaces";

@injectable()
export class CommentCRUDMiddleware implements ICommentCRUDMiddleware {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.CloudinaryUploader)
    private readonly cloudinaryUploader: ICloudinaryUploader
  ) {}

  public validateCreateCommentRequest = [
    validateDto(CreateCommentDTO),
    catchAsync(
      async (
        req: Request<{}, {}, CreateCommentRequestBdy>,
        res: Response,
        next: NextFunction
      ) => {
        const blog: IBlog | null = await this.blogModel.findById(
          req.body.blogId
        );

        if (!blog) {
          return next(new AppError("Blog not found", 404));
        }

        const commentData: CommentData = {
          comment_author: req.user._id,
          blog: blog._id,
          content: req.body.content,
        };
        // handle the part of data existence ( attached images )
        console.log(req.file);
        if (req.file) {
          // handel the uploaded image to the cloudinary and save the data into the object
          console.log("igot here ");
          // the file will come inside the req.file
          const { public_id, url } =
            await this.cloudinaryUploader.uploadSingleFile(
              req.file.path,
              "comment-attachment"
            );
          commentData.attachedImage = {
            public_id,
            url,
          };
        }
        req.body.commentData = commentData;
        next();
      }
    ),
  ];
}
