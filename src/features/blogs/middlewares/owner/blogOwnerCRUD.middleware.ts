//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import {
  catchAsync,
  validateDto,
  AppError,
  uploadImagesToCloudinary,
} from "@shared/index";

// interfaces imports
import {
  BlogData,
  BlogParams,
  CreateBlogBodyRequest,
  DeleteBlogBodyRequest,
  UpdatesBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";

// helpers imports (feature specific)
import { filterValidImages } from "@features/blogs/helpers/filterValidImages";

// DTO imports
import { CreateBlogPostDTO } from "../../dtos/createBlogPost.dto";
// interfaces imports
import { IBlog } from "@features/blogs/interfaces/blog.interface";
// models imports
import BlogModel from "@features/blogs/models/blog.model";
export class BlogOwnerCRUDMiddleware {
  // validate the create blog post request
  public static validateCreateBlogPost = [
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
          const imagesData = await uploadImagesToCloudinary(
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
  public static validateDeleteBlogPost = catchAsync(
    async (
      req: Request<BlogParams, {}, DeleteBlogBodyRequest>,
      res: Response,
      next: NextFunction
    ) => {
      const blogToBeDeleted: IBlog | null = await BlogModel.findOne({
        _id: req.params.blogId,
        author: req.user._id,
      });

      if (!blogToBeDeleted) {
        return next(
          new AppError(
            "Blog not found with given id and related to this user.",
            404
          )
        );
      }

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

  public static validateUpdateBlogPost = catchAsync(
    async (
      req: Request<BlogParams, {}, UpdatesBlogBodyRequest>,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog | null = await BlogModel.findOne({
        _id: req.params.blogId,
        author: req.user._id,
      });
      if (!blogPost) {
        return next(
          new AppError(
            "Blog not found with given id and related to this user.",
            404
          )
        );
      }
      req.body.blogPost = blogPost;
      next();
    }
  );
}
