export type GlobalResponse<T> = {
  status: string;
  message: string;
  products: T;
};

export type SuccessResponse<T> = {
  success: boolean;
  status_code: number;
  data: T;
};
