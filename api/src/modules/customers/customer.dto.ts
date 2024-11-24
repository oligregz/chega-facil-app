export type CustomerDTO = {
  id?: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isActive: boolean;
};
