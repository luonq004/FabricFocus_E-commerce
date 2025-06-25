import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function deleteCategory(id: string) {
  try {
    const response = await axios.delete(`${apiUrl}/category/${id}`);
    return response?.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAllCategory({ status }: { status: string | "" }) {
  try {
    const response = await axios.get(`${apiUrl}/category?_status=${status}`);
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getCategoryByID(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/category/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProductWithCategory(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/category/${id}/product`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategoryByID(
  id: string,
  data: { name: string; title: string; image: string; description: string }
) {
  try {
    const response = await axios.put(`${apiUrl}/category/${id}`, data);
    return response?.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
