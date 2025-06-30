import axios from "axios";
import { IBlog, IBlogResponse } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllBlog(data: {
  _page: string;
  _category: string;
}): Promise<IBlogResponse> {
  try {
    const response = await axios.get(
      `${apiUrl}/blogs/?_category=${data._category}&_page=${data._page}`
    );
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getBlogById(id: string): Promise<IBlog> {
  try {
    const response = await axios.get(`${apiUrl}/blogs/${id}`);
    return response?.data;
  } catch (error) {
    // Kiểm tra lỗi có phải là AxiosError không
    if (axios.isAxiosError(error)) {
      // Có thể lấy được status code và message từ server
      const message = error.response?.data?.message || error.message;

      throw new Error(message);
    } else {
      // Lỗi không phải AxiosError (hiếm khi xảy ra)
      throw new Error("Lỗi không xác định: " + String(error));
    }
  }
}
