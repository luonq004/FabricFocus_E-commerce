import axios from "@/configs/axios";

export async function getProductEdit(id: string) {
  try {
    const response = await axios.get(`/products/${id}/forEdit`);
    document.title = `Page: ${response?.data.name}`;
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProduct({ status }: { status: string | "" }) {
  try {
    const response = await axios.get(`/products?_status=${status}&_limit=100`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAtributes() {
  try {
    const response = await axios.get("/attributes");
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
