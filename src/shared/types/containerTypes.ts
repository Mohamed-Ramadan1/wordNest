import {
  AUTH_TYPES,
  INTERACTIONS_TYPES,
  USERS_TYPES,
  FAVORITES_TYPES,
  READING_LIST_TYPES,
  SUPPORT_TICKETS_TYPES,
  BLOGS_TYPES,
  LOGGING_TYPES,
  SHARED_TYPES,
  COMMENTS_TYPES,
  JOBS_TYPES,
  CONTENT_REPORTING_TYPES,
  ANALYTICS_TYPES,
} from "../constants/index";

// Define identifiers for bindings
export const TYPES = {
  // auth types
  ...AUTH_TYPES,
  // Blog types
  ...BLOGS_TYPES,
  // Users types
  ...USERS_TYPES,
  // Comments types
  ...COMMENTS_TYPES,
  // Reading list types
  ...READING_LIST_TYPES,
  // Favorites types
  ...FAVORITES_TYPES,
  // Interactions types
  ...INTERACTIONS_TYPES,
  // Support tickets types
  ...SUPPORT_TICKETS_TYPES,
  // Logging types
  ...LOGGING_TYPES,
  // Shard types
  ...SHARED_TYPES,
  // Jobs types
  ...JOBS_TYPES,
  // Content reporting types
  ...CONTENT_REPORTING_TYPES,
  // Analytics types
  ...ANALYTICS_TYPES,
};
