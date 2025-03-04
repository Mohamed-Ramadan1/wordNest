import { AUTH_TYPES } from "../constants/injectionContainerTypes/authTypes";
import { INTERACTIONS_TYPES } from "../constants/injectionContainerTypes/interactionsTypes";
import { USERS_TYPES } from "../constants/injectionContainerTypes/usersTypes";
import { FAVORITES_TYPES } from "../constants/injectionContainerTypes/favoritesTypes";
// Define identifiers for bindings
export const TYPES = {
  // auth types
  ...AUTH_TYPES,

  // Favorites types
  ...FAVORITES_TYPES,
  // Interactions types
  ...INTERACTIONS_TYPES,
};
