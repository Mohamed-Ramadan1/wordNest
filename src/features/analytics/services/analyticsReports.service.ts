// packages imports
import { inject, injectable } from "inversify";

import Redis from "ioredis";

// utils imports

import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
/**
 * @package
 */
import {
  IAnalyticsService,
  IAnalyticsRepository,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
  IAnalyticsReportsService,
} from "../interfaces/index";

@injectable()
export class AnalyticsReportsService implements IAnalyticsReportsService {
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  public async getAllBlogsAnalyticsReports(): Promise<void> {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async getAllUsersAnalyticsReports(): Promise<void> {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async getAllSupportTicketsAnalyticsReports(): Promise<void> {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async getAllContentReportingAnalyticsReports(): Promise<void> {
    try {
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
