export interface VoucherType {
  category: string;
  code: string;
  countOnStock: number;
  discount: number;
  dob: {
    from: Date | string;
    to: Date | string;
  };
  type: string;
}
