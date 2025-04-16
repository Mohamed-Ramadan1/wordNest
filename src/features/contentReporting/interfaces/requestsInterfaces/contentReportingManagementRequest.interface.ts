import { ObjectId } from "mongoose";
import {
  ResolutionType,
  IContentReporting,
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
}

export interface ReportManagementParams {
  id: ObjectId;
}
