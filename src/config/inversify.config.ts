import "reflect-metadata";
import { Container } from "inversify";

import favoritesModule from "@features/favorites/module/favorites.module";
import authModule from "@features/auth/modules/auth.module";
import interactionsModule from "@features/interactions/modules/interactions.module";
import usersModule from "@features/users/modules/users.module";
import readingListModule from "@features/readingList/modules/readingList.module";
// Create an IoC container
const container = new Container();

container.load(
  favoritesModule,
  authModule,
  interactionsModule,
  usersModule,
  readingListModule
);

export { container };
