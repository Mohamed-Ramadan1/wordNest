// import slugify from "slugify";
// import { BlogModel } from "../features/blogs";

// export async function generateUniqueSlug(title: string): Promise<string> {
//   let slug = slugify(title, { lower: true, strict: true });

//   // Check if the slug already exists
//   let existingBlog = await BlogModel.findOne({ slug });

//   // If exists, append a unique identifier
//   if (existingBlog) {
//     const randomSuffix = Math.random().toString(36).substring(2, 6);
//     slug += `-${randomSuffix}`;
//   }

//   return slug;
// }

export async function generateUniqueSlug(title: string) {}
