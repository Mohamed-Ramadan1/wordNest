//express imports
import { Response, Request, NextFunction } from "express";

// utils imports
import { catchAsync, validateDto } from "@utils/index";
import {
  BlogData,
  CreateBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";

// helpers imports (feature specific)
import { filterValidImages } from "@features/blogs/helpers/filterValidImages";

// DTO imports
import { CreateBlogPostDTO } from "../../dtos/createBlogPost.dto";
import { uploadImagesToCloudinary } from "@utils/uploadImagesToCloudinary";
export class BlogOwnerCRUDMiddleware {
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
}

