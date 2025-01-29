// import { SEOMetadata, IBlog } from "./types";

// // Utility to strip HTML tags from content
// const stripHtml = (html: string): string => {
//   return html.replace(/<[^>]*>/g, "");
// };

// // Generate SEO excerpt from content
// const generateExcerpt = (content: string, maxLength: number = 160): string => {
//   const plainText = stripHtml(content);
//   if (plainText.length <= maxLength) return plainText;
//   return plainText.substring(0, maxLength).replace(/\s+\S*$/, "...");
// };

// export class BlogSEOHandler {
//   // Constants for SEO rules
//   private static readonly TITLE_MAX_LENGTH = 60;
//   private static readonly DESC_MAX_LENGTH = 160;
//   private static readonly MIN_KEYWORDS = 3;
//   private static readonly MAX_KEYWORDS = 10;

//   // Auto-generate SEO metadata from blog content
//   static generateSEOMetadata(blog: IBlog): SEOMetadata {
//     const plainContent = stripHtml(blog.content);

//     return {
//       // Meta title: Use blog title if under limit, otherwise truncate
//       metaTitle:
//         blog.title.length <= this.TITLE_MAX_LENGTH
//           ? blog.title
//           : `${blog.title.substring(0, this.TITLE_MAX_LENGTH - 3)}...`,

//       // Meta description: Use excerpt if available, otherwise generate from content
//       metaDescription: blog.excerpt || generateExcerpt(plainContent),

//       // Generate canonical URL from slug (implementation depends on your URL structure)
//       canonicalUrl: `https://yourblog.com/posts/${blog.slug}`,

//       // Extract keywords from content and tags
//       keywords: this.generateKeywords(blog),

//       // Use first image as OG image, or featured image if available
//       ogImage: blog.uploadedImages[0]?.url || "",

//       // OpenGraph specific fields
//       ogTitle: blog.title,
//       ogDescription: blog.excerpt || generateExcerpt(plainContent, 200),

//       // Default Twitter card type
//       twitterCard: "summary_large_image",
//     };
//   }

//   // Generate keywords from content and tags
//   private static generateKeywords(blog: IBlog): string[] {
//     const keywords = new Set<string>();

//     // Add tags as keywords
//     blog.tags.forEach((tag) => keywords.add(tag.toLowerCase()));

//     // Add categories as keywords
//     blog.categories.forEach((category) => keywords.add(category.toLowerCase()));

//     // Add primary category if exists
//     if (blog.primaryCategory) {
//       keywords.add(blog.primaryCategory.toLowerCase());
//     }

//     return Array.from(keywords).slice(0, this.MAX_KEYWORDS);
//   }

//   // Validate user-provided SEO metadata
//   static validateSEOMetadata(seo: SEOMetadata): {
//     isValid: boolean;
//     errors: string[];
//   } {
//     const errors: string[] = [];

//     // Validate title length
//     if (seo.metaTitle && seo.metaTitle.length > this.TITLE_MAX_LENGTH) {
//       errors.push(`Meta title exceeds ${this.TITLE_MAX_LENGTH} characters`);
//     }

//     // Validate description length
//     if (
//       seo.metaDescription &&
//       seo.metaDescription.length > this.DESC_MAX_LENGTH
//     ) {
//       errors.push(
//         `Meta description exceeds ${this.DESC_MAX_LENGTH} characters`
//       );
//     }

//     // Validate keywords count
//     if (seo.keywords) {
//       if (seo.keywords.length < this.MIN_KEYWORDS) {
//         errors.push(`Minimum ${this.MIN_KEYWORDS} keywords required`);
//       }
//       if (seo.keywords.length > this.MAX_KEYWORDS) {
//         errors.push(`Maximum ${this.MAX_KEYWORDS} keywords allowed`);
//       }
//     }

//     // Validate URLs
//     if (seo.canonicalUrl && !this.isValidUrl(seo.canonicalUrl)) {
//       errors.push("Invalid canonical URL format");
//     }
//     if (seo.ogImage && !this.isValidUrl(seo.ogImage)) {
//       errors.push("Invalid OG image URL format");
//     }

//     return {
//       isValid: errors.length === 0,
//       errors,
//     };
//   }

//   // Helper to validate URLs
//   private static isValidUrl(url: string): boolean {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   }
// }

// // Example usage in your blog service
// export class BlogService {
//   async createBlog(blogData: Partial<IBlog>): Promise<IBlog> {
//     // Generate initial SEO metadata
//     const initialSEO = BlogSEOHandler.generateSEOMetadata(blogData as IBlog);

//     // Merge with user-provided SEO data if exists
//     const seoMetadata = {
//       ...initialSEO,
//       ...blogData.seo,
//     };

//     // Validate final SEO metadata
//     const validation = BlogSEOHandler.validateSEOMetadata(seoMetadata);
//     if (!validation.isValid) {
//       throw new Error(`Invalid SEO metadata: ${validation.errors.join(", ")}`);
//     }

//     // Create blog with final SEO metadata
//     const blog = new Blog({
//       ...blogData,
//       seo: seoMetadata,
//     });

//     return await blog.save();
//   }
// }
