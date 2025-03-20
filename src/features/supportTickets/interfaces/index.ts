export {
  SupportTicketStatus,
  SupportTicketCategory,
  SupportTicketPriority,
  Attachment,
  AdminResponse,
  UserResponse,
  ISupportTicket,
} from "./supportTicket.interface";

export {
  TicketBody,
  TicketDeletionBody,
  TicketUPdateBody,
  TicketPriorityChangeBody,
  TicketCloseBody,
  TicketAdminResponseBody,
  TicketParams,
  TicketResponseData,
} from "./supportTicketAdminBody.interface";

export {
  SupportTicketBody,
  SupportTicketBodyReplay,
  SupportTicketParams,
} from "./supportTicketBody.interface";

export { ITicketsCRUDService } from "./servicesInterfaces/ticketCRUDService.interface";

export { ITicketPriorityService } from "./servicesInterfaces/ticketPriorityService.interface";

export { ISupportTicketService } from "./servicesInterfaces/supportTicketsService.interface";

export { ITicketResponseService } from "./servicesInterfaces/ticketResponseService.interface";

export { ITicketStatusService } from "./servicesInterfaces/ticketStatusService.interface";

export { ISupportTicketsMiddleware } from "./middlewaresInterfaces/supportTicketsMiddleware.interface";

export { ITicketStatusMiddleware } from "./middlewaresInterfaces/ticketStatusMiddleware.interface";

export { ITicketPriorityMiddleware } from "./middlewaresInterfaces/ticketPriorityMiddleware.interface";

export { ITicketResponseMiddleware } from "./middlewaresInterfaces/ticketResponseMiddleware.interface";

export { ITicketCRUDMiddleware } from "./middlewaresInterfaces/ticketsCRUDMiddleware.interface";

export { ISupportTicketRepository } from "./repositoryInterfaces/supportTicketRepository.interface";

export { ISupportTicketManagementRepository } from "./repositoryInterfaces/supportTicketManagementRepository.interface";
