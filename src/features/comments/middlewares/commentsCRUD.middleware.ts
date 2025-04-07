// express imports
import { Request, Response, NextFunction } from "express";
// mongoose imports
import { Model } from "mongoose";
// packages imports
import { inject, injectable } from "inversify";

// jobs imports
import { CloudinaryQueueJobs, cloudinaryQueue } from "@jobs/index";
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
  UpdateCommentRequestBdy,
  UpdateCommentData,
  IComment,
  ICommentCRUDRepository,
  CommentCRUDRequestParams,
} from "../interfaces/index";

// dtos imports
import { CreateCommentDTO } from "../dtos/index";

// users feature imports
import { IBlog } from "@features/blogs/interfaces";

/**
 * @class CommentCRUDMiddleware
 * @implements {ICommentCRUDMiddleware}
 * @description Middleware class for handling comment CRUD operations
 */
@injectable()
export class CommentCRUDMiddleware implements ICommentCRUDMiddleware {
  /**
   * Creates an instance of CommentCRUDMiddleware
   * @param {Model<IComment>} commentModel - Mongoose model for comments
   * @param {Model<IBlog>} blogModel - Mongoose model for blogs
   * @param {ICommentCRUDRepository} commentCRUDRepository - Repository for comment CRUD operations
   * @param {ICloudinaryUploader} cloudinaryUploader - Cloudinary uploader service
   */
  constructor(
    @inject(TYPES.CommentModel) private readonly commentModel: Model<IComment>,
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.CommentCRUDRepository)
    private readonly commentCRUDRepository: ICommentCRUDRepository,
    @inject(TYPES.CloudinaryUploader)
    private readonly cloudinaryUploader: ICloudinaryUploader
  ) {}

  /**
   * Middleware array to validate create comment requests
   * @type {Array<((req: Request<{}, {}, CreateCommentRequestBdy>, res: Response, next: NextFunction) => void)>}
   */
  public validateCreateCommentRequest = [
    validateDto(CreateCommentDTO),
    catchAsync(
      /**
       * Validates create comment request data and prepares comment data
       * @async
       * @param {Request<{}, {}, CreateCommentRequestBdy>} req - Express request object
       * @param {Response} res - Express response object
       * @param {NextFunction} next - Express next function
       * @returns {Promise<void>}
       */
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

        if (req.file) {
          // handel the uploaded image to the cloudinary and save the data into the object

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

  /**
   * Middleware to validate update comment requests
   * @type {(req: Request<CommentCRUDRequestParams, {}, UpdateCommentRequestBdy>, res: Response, next: NextFunction) => Promise<void>}
   */
  public validateUpdateCommentRequest = catchAsync(
    /**
     * Validates update comment request data and prepares update data
     * @async
     * @param {Request<CommentCRUDRequestParams, {}, UpdateCommentRequestBdy>} req - Express request object
     * @param {Response} res - Express response object
     * @param {NextFunction} next - Express next function
     * @returns {Promise<void>}
     */
    async (
      req: Request<CommentCRUDRequestParams, {}, UpdateCommentRequestBdy>,
      res: Response,
      next: NextFunction
    ) => {
      const { content } = req.body;

      if (!content && !req.file) {
        return next(
          new AppError("Please provide content or image to update ", 400)
        );
      }

      // check if the comment exists or not and have an image or not
      const comment: IComment =
        await this.commentCRUDRepository.getCommentByIdAndUser(
          req.params.commentId,
          req.user._id
        );

      const updateCommentData: UpdateCommentData = {};

      if (content && content.trim() !== "") {
        updateCommentData.content = content;
      }

      // handle the part of data existence ( attached images )
      if (req.file) {
        // handel the uploaded image to the cloudinary and save the data into the object
        if (comment.attachedImage) {
          cloudinaryQueue.add(CloudinaryQueueJobs.DeleteImage, {
            publicId: comment.attachedImage.public_id,
          });
        }
        // the file will come inside the req.file
        const { public_id, url } =
          await this.cloudinaryUploader.uploadSingleFile(
            req.file.path,
            "comment-attachment"
          );

        updateCommentData.attachedImage = {
          public_id,
          url,
        };
      }
      req.body.updateCommentData = updateCommentData;
      req.body.comment = comment;
      next();
    }
  );
}
