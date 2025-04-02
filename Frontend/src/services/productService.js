import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchProducts = async (filters) => {
  try {
    let queryParams = new URLSearchParams();

    if (filters.searchTerm)
      queryParams.append("searchTerm", filters.searchTerm);
    if (filters.inStock) queryParams.append("inStock", "true");
    if (filters.outOfStock) queryParams.append("outOfStock", "true");

    const selectedTypes = Object.keys(filters.selectedType || {}).filter(
      (key) => filters.selectedType[key]
    );
    if (selectedTypes.length > 0)
      queryParams.append("productTypes", selectedTypes.join(","));

    if (filters.sortOrder) queryParams.append("sort", filters.sortOrder);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const response = await axios.get(
      `${API_URL}/api/products?${queryParams.toString()}`,
      {},
      { withCredentials: true }
    );

    return response.data.products || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const fetchProductsByID = async (productID) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products/${productID}`,
      {},
      { withCredentials: true }
    );

    return response.data.products || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/products/update_product/${productId}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/products/add_product`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/products/${productId}`,
      { withCredentials: true }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error.response?.data?.errorMessage;
  }
};
