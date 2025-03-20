import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import { Document, Query } from "mongoose";
import { ParsedQs } from "qs";
import { APIFeaturesInterface } from "../interfaces/apiKeyFeature.interface";
import { APIFeatures } from "../utils/apiKeyFeature";

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
});
