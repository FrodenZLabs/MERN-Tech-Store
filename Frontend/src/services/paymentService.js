import axios from "axios";

const API_URL = "http://localhost:8000";

export const createPayments = async (paymentPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/payments/create-payment-intent`,
      paymentPayload,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching creating payment:", error);
    throw error.response?.data?.message || "Failed to fetch create payment.";
  }
};

export const fetchAllPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/payments/get_payments`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Failed to fetch all guarantor details."
    );
  }
};
