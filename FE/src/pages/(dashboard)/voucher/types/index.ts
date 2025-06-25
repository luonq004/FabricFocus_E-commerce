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

export interface IVoucherData {
  countdown: number;
  voucher: {
    _id: string;
    code: string;
    category: string;
    countOnStock: number;
    discount: number;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IVoucherUseage {
  createdAt: string | Date;
  updatedAt: string | Date;
  usedDate: string | Date;
  userId: string;
  voucherId: string;
  _id: string;
}
