import { AUTH_TYPES } from "../constants/injectionContainerTypes/authTypes";
import { INTERACTIONS_TYPES } from "../constants/injectionContainerTypes/interactionsTypes";
import { USERS_TYPES } from "../constants/injectionContainerTypes/usersTypes";

// Define identifiers for bindings
export const TYPES = {
  // auth types
  ...AUTH_TYPES,
  // User types
  ...USERS_TYPES,
  // Interactions types
  ...INTERACTIONS_TYPES,
};
