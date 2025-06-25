interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  title: string;
  image: string;
  defaultCategory: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Value {
  _id: string;
  name: string;
  value: string;
  type: string;
  slugName?: string;
}

interface VariantItem {
  _id: string;
  price: number;
  originalPrice: number;
  priceSale: number;
  countOnStock: number;
  image: string;
  values: Value[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  descriptionDetail: string;
  price: number;
  priceSale: number;
  countOnStock: number;
  totalOriginalPrice: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category[];
  variants: string[];
  comments: string[];
}

export interface OrderDetailResponse {
  _id: string;
  productItem: ProductItem;
  variantItem: VariantItem;
  quantity: number;
  selected: boolean;
  count: number;
  isCommented: boolean;
  statusComment: boolean;
}
