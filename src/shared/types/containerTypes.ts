import { AUTH_TYPES } from "../constants/injectionContainerTypes/authTypes";
import { INTERACTIONS_TYPES } from "../constants/injectionContainerTypes/interactionsTypes";
import { USERS_TYPES } from "../constants/injectionContainerTypes/usersTypes";
import { FAVORITES_TYPES } from "../constants/injectionContainerTypes/favoritesTypes";
import { READING_LIST_TYPES } from "../constants/injectionContainerTypes/readingListTypes";
// Define identifiers for bindings
export const TYPES = {
  // auth types
  ...AUTH_TYPES,
  ...USERS_TYPES,
  // Reading list types
  ...READING_LIST_TYPES,
  // Favorites types
  ...FAVORITES_TYPES,
  // Interactions types
  ...INTERACTIONS_TYPES,
};
