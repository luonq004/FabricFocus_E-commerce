interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  deleted: boolean;
  defaultCategory: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Variant {
  _id: string;
}

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  priceSale: number | null;
  image: string;
  description: string;
  descriptionDetail: string;
  count: number;
  countOnStock: number;
  totalOriginalPrice: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  comments: string[]; // Array of comment IDs
  variants: Variant[];
  category: Category[];
}

export interface Product {
  productItem: ProductItem;
}

// Dùng cho wishList response
// interface ProductResponse {
//   products: Product[];
// }
