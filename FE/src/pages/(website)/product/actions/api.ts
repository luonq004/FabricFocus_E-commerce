import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Product
export async function getProductById(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    return response?.data;
  } catch (error) {
    return error;
  }
}

// //////////////////////////////////////////////////////////////////////
// Category

export async function getAllCategory() {
  try {
    const response = await axios.get(`${apiUrl}/category`);
    return response?.data;
  } catch (error) {
    return error;
  }
}
