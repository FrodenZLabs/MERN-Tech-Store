import axios from "axios";

const API_URL = "http://localhost:8000";

export const createClient = async (clientPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/user/new_client`,
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
      `${API_URL}/api/user/new_guarantor`,
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

// Fetch user profile
export const fetchUserProfile = async (authId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/users/getUserProfile/${authId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// Fetch user client profile
export const fetchClientByAuthID = async (authId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/user/get_client/${authId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// Update a new user profile
export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/update`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
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

    return response.data; // Return the calculated price from backend
  } catch (error) {
    console.error(
      "Error fetching dynamic price:",
      error.response?.data || error.message
    );
    throw error.response?.data?.message || "Failed to fetch dynamic price.";
  }
};

export const fetchAllCreditRisks = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/prediction/admin/credit-risks`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch all credit risks.";
  }
};

export const fetchAllCreditRiskByID = async (creditRiskId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/prediction/admin/credit-risks/${creditRiskId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch all credit risks.";
  }
};

export const fetchAllClientDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/get_clients`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Failed to fetch all client details."
    );
  }
};

export const fetchAllGuarantorDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/get_guarantors`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Failed to fetch all guarantor details."
    );
  }
};

export const fetchGuarantorDetailsByID = async (guarantorId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/user/get_guarantor/${guarantorId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Failed to fetch all guarantor details by ID."
    );
  }
};
