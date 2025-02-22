import { ObjectId } from "mongoose";

export interface FavoriteRequestBody {
  blogPostId: ObjectId;
}

export interface FavoriteRequestParams {
  favoriteId: ObjectId;
}
