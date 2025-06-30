export interface IBlogResponse {
  data: IBlog[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface IBlog {
  author: string;
  category: string;
  content: string;
  createdAt: string | Date;
  description: string;
  image: string;
  isActive: boolean;
  title: string;
  updatedAt: string | Date;
  _id: string;
}
