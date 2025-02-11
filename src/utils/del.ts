import { BlogModel } from "@features/blogs";
import { get } from "http";
import { ObjectId } from "mongoose";
export async function getBlog() {
  try {
    const id = 123456;
    await BlogModel.findById(id);
  } catch (err) {}
}
