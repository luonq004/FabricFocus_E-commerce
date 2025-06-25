export interface OrderResponse {
  _id: string;
  userId: string;
  addressId: {
    addressDetail: string;
    cityId: string;
    country: string;
    createdAt: string | Date;
    districtId: string;
    isDefault: boolean;
    name: string;
    updatedAt: string;
    wardId: string;
    _id: string;
    userId: string;
    phone: string;
  };
  createdAt: string;
  deleted: boolean;
  discount: number;
  email: string;
  fullName: string;
  isPaid: boolean;
  note: string;
  orderCode: string;
  payment: string;
  products: ProductInOrder[];
  status: string;
  statusHistory: StatusHistory[];
  totalPrice: number;
  __v: number;
}

interface ProductInOrder {
  _id: string;
  isCommented: boolean;
  productItem: ProductItem;
  quantity: number;
  selected: boolean;
  statusComment: string;
  variantItem: Variant;
}

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category: string[]; // ID danh mục
  countOnStock: number;
  createdAt: string;
  deleted: boolean;
  description?: string;
  descriptionDetail?: string;
  image: string;
  price: number;
  priceSale: number;
  slugName?: string;
  totalOriginalPrice?: number;
  updatedAt: string;
  variants?: string[]; // ID của các variant
}

interface Variant {
  countOnStock: number;
  createdAt: string;
  deleted: boolean;
  image: string;
  originalPrice: number;
  price: number;
  priceSale: number;
  updatedAt: string;
  values: VariantValue[];
}

interface VariantValue {
  _id: string;
  name: string;
  slugName: string;
  type: string; // ví dụ: "Màu sắc", "Kích cỡ"
  value: string; // ví dụ: "#ffffff" hoặc "XL"
  createdAt: string;
  deleted: boolean;
  slugValue?: string;
}

interface StatusHistory {
  status: string;
  timestamp: string;
  updatedBy: string;
  _id: string;
}
