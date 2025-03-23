import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal Information
    full_name: {
      type: String,
      required: true,
    },
    id_number: {
      type: Number,
      required: true,
      unique: true,
    },
    phone_no: {
      type: Number,
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
      required: false,
      default:
        "https://imgs.search.brave.com/gV6Xy99WsNTWpgT2KUNxopKhP45u8QMrrL2DGi5HYxg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc",
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Guarantor Personal Details
    full_name: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
      unique: true,
    },
    id_number: {
      type: Number,
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
