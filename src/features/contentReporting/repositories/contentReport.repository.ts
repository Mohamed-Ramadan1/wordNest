//packages imports
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

// interfaces imports
import {
  ContentReportingStatus,
  IContentReporting,
  IContentReportRepository,
  ProcessReportRequestData,
  ReportRequestData,
} from "../interfaces/index";

/**
 * Repository class for managing content reporting requests.
 * Implements CRUD operations and additional functionalities for content reports.
 */
@injectable()
export class ContentReportRepository implements IContentReportRepository {
  /**
   * Creates an instance of ContentReportRepository.
   * @param apiFeatures - Utility for filtering, sorting, limiting, and paginating queries.
   * @param contentReportingModel - Mongoose model for content reporting.
   */
  constructor(
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IContentReporting[], IContentReporting>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IContentReporting>,
    @inject(TYPES.ContentReportingModel)
    private readonly contentReportingModel: Model<IContentReporting>
  ) {}

  /**
   * Creates a new content reporting request.
   * @param reportData - Data for the new reporting request.
   * @returns The created content reporting request.
   * @throws Error if the creation fails.
   */
  public async createReportingRequest(
    reportData: ReportRequestData
  ): Promise<IContentReporting> {
    try {
      const report: IContentReporting | null =
        await this.contentReportingModel.create(reportData);

      if (!report) {
        throw new Error("Error while creating reporting request.");
      }
      return report;
    } catch (err: any) {
      throw new Error(`Error while creating reporting request: ${err.message}`);
    }
  }

  /**
   * Retrieves content reporting requests with optional filtering, sorting, and pagination.
   * @param reqQuery - Query parameters for filtering, sorting, limiting, and pagination.
   * @returns An array of content reporting requests.
   * @throws Error if the retrieval fails.
   */
  public async getReportingRequests(
    reqQuery: ParsedQs
  ): Promise<IContentReporting[]> {
    try {
      const features = this.apiFeatures(
        this.contentReportingModel.find(),
        reqQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const reportsRequests: IContentReporting[] = await features.execute();
      return reportsRequests;
    } catch (err: any) {
      throw new Error(
        `Error while fetching reporting requests: ${err.message}`
      );
    }
  }

  /**
   * Retrieves a single content reporting request by its ID.
   * @param reportId - The ID of the reporting request.
   * @returns The content reporting request.
   * @throws Error if the report is not found or retrieval fails.
   */
  public async getContentReportById(
    reportId: ObjectId
  ): Promise<IContentReporting> {
    try {
      const reportRequest: IContentReporting | null =
        await this.contentReportingModel.findById(reportId);

      if (!reportRequest) {
        throw new Error("Reporting request not found with given id.");
      }

      return reportRequest;
    } catch (err: any) {
      throw new Error(`Error while fetching reporting request: ${err.message}`);
    }
  }

  /**
   * Deletes a content reporting request by its ID.
   * @param reportId - The ID of the reporting request to delete.
   * @throws Error if the report is not found or deletion fails.
   */
  public async deleteReportingRequest(reportId: ObjectId): Promise<void> {
    try {
      const deletedReport: IContentReporting | null =
        await this.contentReportingModel.findByIdAndDelete(reportId);

      if (!deletedReport) {
        throw new Error("Reporting request not found");
      }
    } catch (err: any) {
      throw new Error(`Error while deleting reporting request: ${err.message}`);
    }
  }

  /**
   * Processes a content reporting request by updating its data.
   * @param reportProcessedData - Data to update the reporting request.
   * @param reportId - The ID of the reporting request to process.
   * @throws Error if the report is not found or processing fails.
   */
  public async processReport(
    reportProcessedData: ProcessReportRequestData,
    reportId: ObjectId
  ): Promise<void> {
    try {
      const updatedReport: IContentReporting | null =
        await this.contentReportingModel.findByIdAndUpdate(
          reportId,
          reportProcessedData,
          { new: true }
        );
      if (!updatedReport) {
        throw new Error("Reporting request not found with given id.");
      }
    } catch (err: any) {
      throw new Error(
        `Error while processing reporting request: ${err.message}`
      );
    }
  }

  /**
   * Archives a content reporting request by setting its isArchived flag to true.
   * @param reportId - The ID of the reporting request to archive.
   * @throws Error if archiving fails.
   */
  public async archiveReport(reportId: ObjectId): Promise<void> {
    try {
      await this.contentReportingModel.findByIdAndUpdate(
        reportId,
        { isArchived: true },
        { new: true }
      );
    } catch (err: any) {
      throw new Error(
        `Error while archiving reporting request: ${err.message}`
      );
    }
  }

  /**
   * Unarchives a content reporting request by setting its isArchived flag to false.
   * @param reportId - The ID of the reporting request to unarchive.
   * @throws Error if unarchiving fails.
   */
  public async unarchiveReport(reportId: ObjectId): Promise<void> {
    try {
      await this.contentReportingModel.findByIdAndUpdate(
        reportId,
        { isArchived: false },
        { new: true }
      );
    } catch (err: any) {
      throw new Error(
        `Error while un-archiving reporting request: ${err.message}`
      );
    }
  }

  /**
   * Updates the status of a content reporting request.
   * @param reportId - The ID of the reporting request.
   * @param reportStatus - The new status for the reporting request.
   * @throws Error if the report is not found or updating fails.
   */
  public async updateReportStatus(
    reportId: ObjectId,
    reportStatus: ContentReportingStatus
  ): Promise<void> {
    try {
      const updatedReport: IContentReporting | null =
        await this.contentReportingModel.findByIdAndUpdate(
          reportId,
          { status: reportStatus },
          { new: true }
        );

      if (!updatedReport) {
        throw new Error("Reporting request not found with given id.");
      }
    } catch (err: any) {
      throw new Error(`Error while updating reporting request: ${err.message}`);
    }
  }
}
