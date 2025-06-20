export interface CartResponse {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  subTotal: number;
  discount: number;
  products: CartProduct[];
  voucher: Voucher[];
}

export interface CartProduct {
  isCommented: boolean;
  selected: boolean;
  quantity: number;
  statusComment: boolean;
  productItem: ProductItem;
  variantItem: Variant;
}

export interface ProductItem {
  category: Categories[];
  comments: Comments[];
  count: number;
  countOnStock: number;
  createdAt: string;
  deleted: boolean;
  description: string;
  descriptionDetail: string;
  image: string;
  name: string;
  price: number;
  priceSale: number;
  slug: string;
  totalOrignalPrice: number;
  updatedAt: string;
  variants: Variant[];
  _id: string;
}

export interface Variant {
  countOnStock: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  _id: string;
  originalPrice: number;
  price: number;
  priceSale: number;
  image: string;
  values: VariantValue[];
}

export interface VariantValue {
  createdAt: string;
  deleted: boolean;
  name: string;
  slug: string;
  type: string;
  updatedAt: string;
  value: string;
  _id: string;
}

export interface Voucher {
  _id: string;
  code: string;
  category: string; // "product" | "shipping" | v.v nếu có enum
  countOnStock: number;
  createdAt: string;
  updatedAt: string;
  discount: number;
  endDate: string;
  startDate: string;
  status: "active" | "inactive"; // nếu cần enum
  type: "percent" | "fixed"; // loại giảm giá
}

export interface Comments {
  _id: string;
  content: string;
  createdAt: string;
  deleted: boolean;
  infoProductBuy: string;
  productId: string;
  rating: number;
  userId: {
    firstName: string;
    lastName: string;
    _id: string;
    imageUrl: string;
  };
}

export interface Categories {
  _id: string;
  createdAt: string;
  deleted: boolean;
  defaultCategory: boolean;
  description: string;
  name: string;
  slug: string;
  title: string;
  image: string;
  updatedAt: string;
}

export interface WishList {
  createdAt: string;
  updatedAt: string;
  _id: string;
  userId: string;
  products: {
    productItem: ProductItem;
  }[];
}
