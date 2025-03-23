import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalData: {},
  residenceData: {},
  educationData: {},
  guarantorData: {},
  guarantorFinancialData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPersonalData: (state, action) => {
      state.personalData = action.payload;
    },
    setResidenceData: (state, action) => {
      state.residenceData = action.payload;
    },
    setEducationData: (state, action) => {
      state.educationData = action.payload;
    },
    setGuarantorData: (state, action) => {
      state.guarantorData = action.payload;
    },
    setGuarantorFinancialData: (state, action) => {
      state.guarantorFinancialData = action.payload;
    },
    resetForm: (state) => {
      state.personalData = {};
      state.residenceData = {};
      state.educationData = {};
      state.guarantorData = {};
      state.guarantorFinancialData = {};
    },
  },
});

export const {
  setPersonalData,
  setResidenceData,
  setEducationData,
  setGuarantorData,
  setGuarantorFinancialData,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
