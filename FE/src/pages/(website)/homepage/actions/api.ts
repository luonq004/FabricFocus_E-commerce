import axios from "axios";
import { ProductItem } from "../../cart/types";
const apiUrl = import.meta.env.VITE_API_URL;

interface IProductResponse {
  data: ProductItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export async function getProductByCategoryId(
  id: string
): Promise<IProductResponse> {
  try {
    const response = await axios.get(`${apiUrl}/products/?_category=${id}`);
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
