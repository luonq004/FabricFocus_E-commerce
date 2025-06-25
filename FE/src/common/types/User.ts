export interface User {
  _id?: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  Address: string;
  role: string;
  phone: string;
  gender: string;
  password?: string;
  isActive?: string;
  passwordPlaintext?: string;
  paymentInfo: string;
  orders: string;
  isBanned: boolean;
  isDeleted: boolean;
}

export interface UserResponse {
  message: string;
  data: User;
}

export interface Sender {
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: "User" | string; // Nếu role chỉ có "User", bạn có thể để literal
  _id: string;
}

export interface Message {
  createdAt: string; // ISO string, bạn có thể dùng Date nếu muốn convert
  sender: Sender;
  senderType: "User" | string;
  text: string;
  _id: string;
}
