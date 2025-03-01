// Define identifiers for bindings
export const TYPES = {
  // auth types
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  AuthRepository: Symbol.for("AuthRepository"),
  AccountRecoveryController: Symbol.for("AccountRecoveryController"), //
  AccountRecoveryService: Symbol.for("AccountRecoveryService"),

  // Interactions types
  InteractionsController: Symbol.for("InteractionsController"),
  InteractionService: Symbol.for("InteractionService"),
  InteractionsRepository: Symbol.for("InteractionsRepository"),
};
