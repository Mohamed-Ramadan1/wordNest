export interface ApiResponse<T> {
  status: string;
  message?: string;
  results?: number;
  token?: string;
  length?: number;
  data?: {
    [key: string]: T;
  };
}
