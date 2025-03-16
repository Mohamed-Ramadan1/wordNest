// packages imports
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { Request } from "express";

// mongoose imports
import { Model, ObjectId, Query } from "mongoose";

// interface imports
import { IBlogRepository, IBlog } from "../interfaces/index";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

@injectable()
export class BlogsRepository implements IBlogRepository {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IBlog[], IBlog>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IBlog>
  ) {}

  public async getBlogs(req: Request): Promise<IBlog[]> {
    try {
      const features = this.apiFeatures(this.blogModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogs: IBlog[] = await features.execute();
      return blogs;
    } catch (err: any) {
      throw new Error(`Failed to get blogs: ${err.message}`);
    }
  }

  public async getBlogPostsByUser(
    authorId: ObjectId,
    query: ParsedQs
  ): Promise<IBlog[]> {
    try {
      const features = this.apiFeatures(
        this.blogModel.find({
          author: authorId,
        }),
        query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogs: IBlog[] = await features.execute();
      return blogs;
    } catch (err: any) {
      throw new Error(`Failed to get blog posts by user: ${err.message}`);
    }
  }

  public async getBlogById(id: ObjectId): Promise<IBlog> {
    try {
      const blogPost: IBlog | null = await this.blogModel.findById(id);

      if (!blogPost) {
        throw new Error("Blog post not found with given ID.");
      }
      return blogPost;
    } catch (error: any) {
      throw new Error(`Failed to get blog by ID: ${error.message}`);
    }
  }
}
