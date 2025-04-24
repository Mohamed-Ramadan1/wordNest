// Packages imports
import { inject, injectable } from "inversify";

// utils imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import { IAnalyticsService, IAnalyticsRepository } from "../interfaces/index";

@injectable()
export class AnalyticsService implements IAnalyticsService {
  constructor(
    @inject(TYPES.AnalyticsRepository)
    private readonly analyticsRepository: IAnalyticsRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  public async getBlogsAnalytics(): Promise<void> {
    try {
      return await this.analyticsRepository.getBlogsAnalytics();
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async getUsersAnalytics(): Promise<void> {
    try {
      return await this.analyticsRepository.getUsersAnalytics();
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async getSupportTicketsAnalytics(): Promise<void> {
    try {
      return await this.analyticsRepository.getSupportTicketsAnalytics();
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
