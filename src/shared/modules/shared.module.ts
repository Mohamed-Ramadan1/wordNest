// packages imports
import { ContainerModule, interfaces } from "inversify";
import { Document, Query } from "mongoose";
import { ParsedQs } from "qs";

// utils imports
import { ResponseUtils } from "../utils/responseUtils";
import { ErrorUtils } from "../utils/errorUtils";

// shard imports
import { TYPES, APIFeatures, TokenManagement } from "@shared/index";

// interfaces imports
import {
  ITokenManagement,
  APIFeaturesInterface,
  IErrorUtils,
  IResponseUtils,
} from "../interfaces/index";

export default new ContainerModule((bind: interfaces.Bind) => {
  // Bind a factory that creates APIFeatures instances
  bind<
    interfaces.Factory<
      (
        query: Query<any[], any>,
        queryString: ParsedQs
      ) => APIFeaturesInterface<any>
    >
  >(TYPES.APIFeatures).toFactory(() => {
    return <T extends Document>(
      query: Query<T[], T>,
      queryString: ParsedQs
    ) => {
      return new APIFeatures<T>(query, queryString);
    };
  });

  // Bind the TokenManagement class as a singleton
  bind<ITokenManagement>(TYPES.TokenManagement)
    .to(TokenManagement)
    .inSingletonScope();

  // Bind the ResponseUtils class as a singleton
  bind<IResponseUtils>(TYPES.ResponseUtils)
    .to(ResponseUtils)
    .inSingletonScope();

  // Bind the ErrorUtils class as a singleton
  bind<IErrorUtils>(TYPES.ErrorUtils).to(ErrorUtils).inSingletonScope();
});
