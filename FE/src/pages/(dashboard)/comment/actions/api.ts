import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllComment({
  status,
  page,
  limit,
}: {
  status: string | "";
  page: number;
  limit: number;
}) {
  try {
    const response = await axios.get(
      `${apiUrl}/comment?_status=${status}&_limit=${limit}&_page=${page}`
    );
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
