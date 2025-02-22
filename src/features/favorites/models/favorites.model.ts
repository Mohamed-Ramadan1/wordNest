import { Schema, model } from "mongoose";
import { IFavorite } from "../interfaces/favorites.interface";
const favoriteSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
favoriteSchema.index({ user: 1, blogPost: 1 }, { unique: true });
favoriteSchema.index({ user: 1 });
favoriteSchema.index({ blogPost: 1 });

favoriteSchema.pre<IFavorite>(/^find/, function (next) {
  this.populate({
    path: "blogPost",
  });
  next();
});

export const FavoriteModel = model<IFavorite>("Favorite", favoriteSchema);
