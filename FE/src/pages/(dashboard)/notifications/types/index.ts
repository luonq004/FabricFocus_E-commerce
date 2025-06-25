export interface Notification {
  _id: string;
  orderCode: string;
  orderId: string;
  productImage: string;
  message: string;
  status: string;
  type: string;
  isRead: boolean;
  isReadByAdmin: boolean;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}
