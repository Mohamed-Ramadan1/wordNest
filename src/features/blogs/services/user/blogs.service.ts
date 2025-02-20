// Packages imports
import { ParsedQs } from "qs";

import { ObjectId } from "mongoose";
import Redis from "ioredis";
// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError } from "@utils/index";

//interfaces imports
import {
  BlogData,
  UpdatesBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";
import {
  IBlog,
  DeletionStatus,
} from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// logging imports
import { blogsLogger } from "@logging/index";

export class BlogsService {}
