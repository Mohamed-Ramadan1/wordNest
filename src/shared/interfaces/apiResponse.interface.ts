export interface ApiResponse<T> {
  status: string;
  message?: string;
  results?: number;
  token?: string;
  data: {
    data: T;
  };
}
