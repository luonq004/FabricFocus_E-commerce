import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getWishList = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/wishlist/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = async (data: {
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/wishlist`, data);
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

// export const getWishList = async (id: string) => {
//   try {
//     const response = await axios.get(`${apiUrl}/users/getWishlist/${id}`);
//     return response?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
