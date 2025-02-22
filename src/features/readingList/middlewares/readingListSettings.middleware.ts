//express imports
import { Response, Request, NextFunction } from "express";

// models imports
import { ReadingListModel } from "../models/readingList.model";
import BlogModel from "@features/blogs/models/blog.model";
// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// interfaces imports
import { CreateReadingListItemRequestBody } from "../interfaces/readingListCRUDRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

// dto imports
import { CreateReadingListItemDto } from "../dtos/createReadingListItem.dto";

export class ReadingListSettingsMiddleware {}
