import { ObjectId } from "mongoose";

export interface CreateReadingListItemRequestBody {
  blogPostId: ObjectId;
  notes?: string;
}

export interface ReadingListCRUDRequestParams {
  id: ObjectId;
}
