import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllComment({ status }: { status: string | "" }) {
  try {
    const response = await axios.get(`${apiUrl}/comment?_status=${status}`);
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
