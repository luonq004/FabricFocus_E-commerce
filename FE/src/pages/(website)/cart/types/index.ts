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
  category: string[];
  comments: string[];
  count: number;
  countOnStock: number;
  createdAt: string;
  deleted: boolean;
  description: string;
  descriptionDetail: string;
  image: string;
  name: string;
  price: number;
  slug: string;
  totalOrignalPrice: number;
  updatedAt: string;
  variants: string[];
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

// Interface for order email
export interface OrderEmail {
  addressId: string;
  createdAt: string;
  deleted: boolean;
  discount: number;
  email: string;
  fullName: string;
  isPaid: boolean;
  orderCode: string;
  payment: string;
  products: CartProduct[];
  status: string;
  statusHistory: string[];
  totalPrice: number;
  userId: string;
  _id: string;
}

export type CartActionType =
  | { type: "increaseItem" }
  | { type: "decreaseItem" }
  | { type: "changeQuantity" }
  | { type: "removeItem" }
  | { type: "applyVoucher" };

export type CartPayload = {
  quantity?: number;
  productId: string;
  variantId: string;
  discount?: number;
};

export type ActionType =
  | {
      type: "changeQuantity";
      value: {
        quantity: number;
        productId: string;

        variantId: string;
      };
    }
  | {
      type: "decreaseItem";
      value: {
        quantity: number;
        productId: string;

        variantId: string;
      };
    }
  | {
      type: "increaseItem";
      value: {
        productId: string;

        variantId: string;
      };
    }
  | {
      type: "removeItem";
      value: {
        productId: string;
        variantId: string;
      };
    }
  | { type: "applyVoucher"; value: { voucherCode: string } }
  | {
      type: "removeVoucher";
      value: {
        voucherCode: string;
      };
    }
  | {
      type: "selectedOne";
      value: { productId: string; variantId: string };
    }
  | {
      type: "selectedAll";
      value: NonNullable<unknown>;
    }
  | {
      type: "removeAllSelected";
      value: NonNullable<unknown>;
    };
