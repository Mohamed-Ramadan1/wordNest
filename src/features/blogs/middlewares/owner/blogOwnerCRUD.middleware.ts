// packages imports
import { inject, injectable } from "inversify";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import {
  catchAsync,
  validateDto,
  AppError,
  ICloudinaryUploader,
  TYPES,
} from "@shared/index";

// interfaces imports
import {
  BlogData,
  BlogParams,
  CreateBlogBodyRequest,
  DeleteBlogBodyRequest,
  UpdatesBlogBodyRequest,
  IBlogOwnerCRUDMiddleware,
  IBlogAuthorRepository,
  IBlog,
} from "../../interfaces/index";

// helpers imports (feature specific)
import { filterValidImages } from "@features/blogs/helpers/filterValidImages";

// DTO imports
import { CreateBlogPostDTO } from "../../dtos/createBlogPost.dto";

@injectable()
export class BlogOwnerCRUDMiddleware implements IBlogOwnerCRUDMiddleware {
  constructor(
    @inject(TYPES.BlogAuthorRepository)
    private readonly blogAuthorRepository: IBlogAuthorRepository,
    @inject(TYPES.CloudinaryUploader)
    private readonly cloudinaryUploader: ICloudinaryUploader
  ) {}
  // validate the create blog post request
  public validateCreateBlogPost = [
    validateDto(CreateBlogPostDTO),
    catchAsync(
      async (
        req: Request<{}, {}, CreateBlogBodyRequest>,
        res: Response,
        next: NextFunction
      ) => {
        const { title, content, categories } = req.body;

        const blogReadyData: BlogData = {
          title,
          content,
          categories,
          author: req.user,
          tags: req.body.tags || [],
        };

        if (req.files) {
          const blogImages = filterValidImages(req.files);
          const imagesData = await this.cloudinaryUploader.uploadMultipleImages(
            blogImages,
            "blogImages",
            "blogs-images"
          );

          blogReadyData.uploadedImages = imagesData;
        }

        req.body.blogData = blogReadyData;
        next();
      }
    ),
  ];

  // validate the delete blog post request
  public validateDeleteBlogPost = catchAsync(
    async (
      req: Request<BlogParams, {}, DeleteBlogBodyRequest>,
      res: Response,
      next: NextFunction
    ) => {
      const blogToBeDeleted: IBlog =
        await this.blogAuthorRepository.getBlogPostByIdAndAuthor(
          req.params.blogId,
          req.user._id
        );

      // check if its already mark as to be deleted
      if (blogToBeDeleted.toBeDeleted) {
        return next(
          new AppError(
            "This blog has already been marked for deletion.no farther actions are required by you.",
            400
          )
        );
      }

      req.body.blogToBeDeleted = blogToBeDeleted;

      next();
    }
  );

  public validateUpdateBlogPost = catchAsync(
    async (
      req: Request<BlogParams, {}, UpdatesBlogBodyRequest>,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog =
        await this.blogAuthorRepository.getBlogPostByIdAndAuthor(
          req.params.blogId,
          req.user._id
        );
      req.body.blogPost = blogPost;
      next();
    }
  );
}
