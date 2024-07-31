export type GlobalResponse<T> = {
  status: string;
  message: string;
  products: T;
};
