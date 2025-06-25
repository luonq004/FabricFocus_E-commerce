export interface IComment {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  productId: {
    _id: string;
    name: string;
    image: string;
  };
  infoProductBuy: string;
  content: string;
  rating: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
