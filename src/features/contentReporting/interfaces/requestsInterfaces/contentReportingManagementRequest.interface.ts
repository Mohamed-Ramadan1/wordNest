import { ObjectId } from "mongoose";
import {
  ResolutionType,
  ContentReportingStatus,
} from "../contentReporting.interface";

export interface ProcessReportRequestData {
  resolutionType: ResolutionType;
  processedBy: ObjectId;
  processedAt: Date;
  processedNotes: string;
}

export interface ProcessReportRequestBody {
  processedNotes: string;
  resolutionType: ResolutionType;
  reportProcessedData: ProcessReportRequestData;
}

export interface UpdateReportStatusRequestBody {
  reportStatus: ContentReportingStatus;
}
export interface ReportManagementParams {
  id: ObjectId;
}
