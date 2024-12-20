import { format } from "winston";

export const jsonFormatter = format.combine(format.timestamp(), format.json());
