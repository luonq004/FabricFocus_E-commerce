export interface ValueAttribute {
  _id: string;
  name: string;
  slugName: string;
  type: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
}

export interface ProductVariant {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  countOnStock: number;
  image: string | File | undefined;
  price: number;
  priceSale?: number;
  originalPrice: number;
  values: ValueAttribute[];
}

// export interface IReplace {
//   name: string;
//   description: string;
//   variants: {
//     values: {
//       type: string;
//       _id: string;
//     }[];
//     price: number;
//     originalPrice: number;
//     countOnStock: number;
//     image?: string | File | undefined;
//     _id?: string | undefined;
//     priceSale?: number | undefined;
//   }[];
//   createdAt: string;
//   deletedAt: string;
// }
