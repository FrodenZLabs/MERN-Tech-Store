import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    // Personal Information
    first_name: {
      type: String,
      required: false, // Optional field
    },
    last_name: {
      type: String,
      required: false, // Optional field
    },
    id_number: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    marital_status: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or file path to the profile image
      required: true,
    },
    id_image: {
      type: String, // URL or file path to the ID image
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },

    // Education Background
    institution_level: {
      type: String,
      required: true,
    },
    institution_name: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    adm_number: {
      type: String,
      required: true,
      unique: true,
    },
    school_type: {
      type: String,
      required: true,
    },
    completion_year: {
      type: Number,
      required: true,
    },

    // Residence Details
    nearest_primary_school: {
      type: String,
      required: true,
    },
    estate_village: {
      type: String,
      required: true,
    },
    town_city: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const guarantorSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    // Guarantor Personal Details
    full_name: {
      type: String,
      required: false,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    id_number: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    kra_pin: {
      type: String,
      required: true,
      unique: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    marital_status: {
      type: String,
      required: true,
    },
    no_of_dependants: { type: Number, required: true },
    education_level: {
      type: String,
      required: true,
    },
    relationship_to_student: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);

export const Guarantor = mongoose.model("Guarantor", guarantorSchema);
