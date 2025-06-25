// export interface IProduct {
//   _id: string;
//   name: string;
//   category: string[];
//   price: number;
//   description: string;
//   image: string;
//   // status: "pending" | "processing" | "success" | "failed";
// }

export interface OrderResponse {
  message: string;
  order: { status: string }; // Cấu trúc order tùy theo backend của bạn
}
export interface IProduct {
  _id: string;
  name: string;
  type: string;
  category: Category[];
  countOnStock: number;
  count: number;
  price: number;
  priceSale: number;
  description: string;
  image: string;
  reviews: string[];
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  variants: Variant[];
  comments?: {
    _id: string;
    userId: string;
    content: string;
    rating: number;
    createdAt: Date;
  };
}
interface Address {
  _id: string;
  userId: string;
  country: string;
  cityId: string;
  districtId: string;
  wardId: string;
  phone: string;
  name: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  image: string;
  title: string;
  description: string;
  name: string;
  defaultCategory: boolean;
  slug: string;
  deleted: boolean;
  __v: number;
}

export interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category: Category[];
  image: string;
  price: number;
  type: string;
  description: string;
  deleted: boolean;
  reviews: any[];
  variants: string[];
  createdAt: string;
  updatedAt: string;
}

interface VariantItem {
  _id: string;
  name: string;
  type: string;
  value: string;
  price: number;
  priceSale: number;
  countOnStock: number;
  values: {
    _id: string;
    name: string;
    type: string;
    value: string;
    __v: number;
  }[]; // values có cấu trúc này
}

export interface OrderProduct {
  _id: string;
  email?: string;
  isPaid: boolean;
  addressId: {
    name?: string;
    addressDetail?: string;
    wardId?: string;
    districtId?: string;
    country?: string;
    cityId?: string;
    phone?: string;
  };
  payment?: string;
  userId: string;
  orderCode: string;
  status: string;
  products: {
    productItem: ProductItem;
    variantItem: VariantItem;
    image?: string;
    quantity: number;
    _id: string;
  }[];
  voucher: any[]; // Cập nhật kiểu nếu có dữ liệu voucher
  total: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  discount: number;
  subTotal: number;
}

export interface Order {
  _id: string;
  userId: string;
  addressId: Address;
  note: string;
  products: OrderProduct[];
  payment: string;
  status: string;
  totalPrice: number;
  orderCode: string;
  createdAt: string;
  __v: number;
}

export interface Variant {
  _id?: string;
  id?: string;
  price: number;
  priceSale?: number;
  values: {
    _id?: string;
    name: string;
    type: string;
    value: string;
  }[];
  countOnStock: number;
  image: string;
  deleted: boolean;
}

export interface Value {
  _id: string;
  name?: string;
  type?: string;
  value?: string;
}

export interface Attribute {
  _id: string;
  name: string;
  deleted: boolean;
  values: {
    _id: string;
    name: string;
    type: string;
    value: string;
  }[];
  image: string | File;
  countOnStock: number;
  originalPrice: number;
  id: string;
  price: number;
}

export interface AttributeInArr {
  _id: string;
  name: string;
  deleted: boolean;
  values: {
    _id: string;
    name: string;
    type: string;
    value: string;
  }[];
  image: string | File;
  countOnStock: number;
  originalPrice: number;
  id: string;
  price: number;
}

export interface AttributeValue {
  _id: string;
  name: string;
  type: string;
  deleted: boolean;
  value: string;
  createdAt: string;
  updatedAt: string;
  slugName: string;
}

export interface Data {
  _id: string;
  value: string;
  label: string;
  type: string;
}

export interface State {
  attributesChoose: Attribute[];
  valuesChoose: Data[][];
  valuesMix: Data[][];
}

export interface VariantFormValues {
  _id?: string;
  price: number;
  originalPrice: number;
  priceSale?: number;
  values: {
    _id: string;
    name?: string;
    value?: string;
    type: string;
    slugName?: string;
  }[];
  countOnStock: number;
  image?: string | File;
}

export interface ProductFormValues {
  _id?: string;
  name: string;
  description: string;
  descriptionDetail?: string;
  category?: string[];
  image?: string | File | undefined;
  price?: number;
  priceSale?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  variants: VariantFormValues[];
}

export type Action =
  | { type: "ADD_ATTRIBUTE"; payload: Attribute } // payload chắc chắn là Attribute
  | { type: "ADD_VALUE"; payload: Data[][] } // payload là mảng Data[]
  | { type: "DELETE_ONE_VALUE"; payload: string }
  | { type: "MIX_VALUES" }
  | { type: "UPDATE_ATTRIBUTES"; payload: Attribute }
  | { type: "CLEAR_VALUES" }
  | { type: "DELETE_INDEX_MIX_VALUE"; payload: number }
  | { type: "CLEAR" };
