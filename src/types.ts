export type ModalType = 'View' | 'Create' | 'Edit';

export interface Modal {
  isOpen: boolean;
  type: ModalType;
}

export type CustomersKey = 'id' | 'name' | 'email' | 'address.street' | 'address.city' | 'company.name';

export interface Customers {
  id?: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
}

export type Role = 'user' | 'admin';

export interface Authentications {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string | Role;
}

export interface Items {
  name: string;
  price: number;
  amount: number;
}

export interface Orders {
  id?: number;
  customer: string;
  items: Items[];
}
