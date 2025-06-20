export interface OrderDetail {
  addressId: string;
  createdAt: string;
  deleted: boolean;
  discount: number;
  email: string;
  fullName: string;
  isPaid: boolean;
  note: string;
  orderCode: string;
  payment: string;
  products: string[];
  status: string;
  statusHistory: [];
  totlalPrice: number;
  userId: string;
  _id: string;
}

export interface OrderCart {}
