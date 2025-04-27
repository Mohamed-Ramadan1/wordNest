import mongoose, { Schema } from "mongoose";
import { ISupportTicketsCollectionAnalytics } from "../interfaces";

const SupportTicketsCollectionAnalyticsSchema =
  new Schema<ISupportTicketsCollectionAnalytics>({
    totalTickets: { type: Number, required: true, default: 0 },
    totalUserResponses: { type: Number, required: true, default: 0 },
    totalAdminResponses: { type: Number, required: true, default: 0 },
    totalAttachments: { type: Number, required: true, default: 0 },

    ticketsByStatus: { type: Map, of: Number, default: {} },
    ticketsByPriority: { type: Map, of: Number, default: {} },
    ticketsByCategory: { type: Map, of: Number, default: {} },

    ticketsCreatedToday: { type: Number, default: 0 },
    ticketsCreatedThisMonth: { type: Number, default: 0 },
    ticketsResolvedToday: { type: Number, default: 0 },
    ticketsResolvedThisMonth: { type: Number, default: 0 },
    ticketsReopenedToday: { type: Number, default: 0 },
    ticketsReopenedThisMonth: { type: Number, default: 0 },

    averageResolutionTimeHours: { type: Number, default: 0 },
    averageFirstResponseTimeHours: { type: Number, default: 0 },
    averageUserResponsesPerTicket: { type: Number, default: 0 },
    averageAdminResponsesPerTicket: { type: Number, default: 0 },

    mostActiveUsers: { type: [String], default: [] },
    mostActiveAdmins: { type: [String], default: [] },
    ticketsWithFollowUps: { type: Number, default: 0 },

    escalatedTickets: { type: Number, default: 0 },
    ticketsWithInternalNotes: { type: Number, default: 0 },

    mostCommonCategories: { type: [String], default: [] },
    mostCommonPriorities: { type: [String], default: [] },

    lastCalculatedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

// Pre-save middleware to update updatedAt
SupportTicketsCollectionAnalyticsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const SupportTicketsCollectionAnalyticsModel =
  mongoose.model<ISupportTicketsCollectionAnalytics>(
    "SupportTicketsCollectionAnalytics",
    SupportTicketsCollectionAnalyticsSchema
  );
