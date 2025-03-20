import { Query, Document } from "mongoose";
import { ParsedQs } from "qs";

/**
 * Interface defining the structure and behavior of APIFeatures utility class
 * for building MongoDB queries with filtering, sorting, field limiting, and pagination.
 * @template T - The Mongoose Document type being queried
 */
export interface APIFeaturesInterface<T extends Document> {
  /**
   * The Mongoose query object being built and modified
   */
  query: Query<T[], T>;

  /**
   * The parsed query string object from the request URL
   */
  queryString: ParsedQs;

  /**
   * Filters the query based on query string parameters
   * Supports basic field matching and advanced operators (gte, gt, lte, lt)
   * Also handles text search if 'search' parameter is provided
   * @returns {this} Returns the instance for method chaining
   */
  filter(): this;

  /**
   * Sorts the query results based on the 'sort' query string parameter
   * Falls back to descending createdAt order if no sort is specified
   * @returns {this} Returns the instance for method chaining
   */
  sort(): this;

  /**
   * Limits the fields returned in the query results based on 'fields' parameter
   * Always includes _id unless explicitly excluded; excludes __v by default
   * @returns {this} Returns the instance for method chaining
   */
  limitFields(): this;

  /**
   * Applies pagination to the query based on 'page' and 'limit' parameters
   * Enforces reasonable bounds on page size (1-100)
   * @returns {this} Returns the instance for method chaining
   */
  paginate(): this;

  /**
   * Executes the built query and returns the results
   * @returns {Promise<T[]>} Promise resolving to array of documents
   * @throws {Error} If query execution fails
   */
  execute(): Promise<T[]>;
}
