import axios from "axios";

const API_URL = "https://mern-ecommerce-yvj6.onrender.com";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage || "Error logging out.";
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const createClient = async (clientPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/client/new_client`,
      clientPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const createGuarantor = async (guarantorPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/client/new_guarantor`,
      guarantorPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const predictScore = async (creditScoreInput) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prediction/predict_score`,
      creditScoreInput,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const predictRisk = async (creditRiskInput) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prediction/predict_risk`,
      creditRiskInput,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while submitting the form."
    );
  }
};

export const fetchUserPrediction = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/prediction/user/${userId}`
    );

    return response.data.prediction || null;
  } catch (error) {
    if (error.response?.data?.statusCode === 404) {
      console.warn("Prediction not found, returning null.");
      return null;
    }
    throw error.response?.data?.errorMessage;
  }
};

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

export const fetchDynamicPrice = async (productId, durationMonths) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/prediction/${productId}/dynamic_price`,
      { duration_months: durationMonths },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.dynamicPrice; // Return the calculated price from backend
  } catch (error) {
    console.error(
      "Error fetching dynamic price:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Failed to fetch dynamic price.";
  }
};

export const createPayments = async (paymentPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/payments/create-payment-intent`,
      paymentPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching dynamic price:", error);
    throw error.response?.data?.message || "Failed to fetch dynamic price.";
  }
};
