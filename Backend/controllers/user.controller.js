import mongoose from "mongoose";
import User from "../models/auth.models.js";
import { Client, Guarantor } from "../models/user.models.js";
import cloudinary from "../utils/cloudinary.js";
import { errorHandler } from "../utils/errorHandler.js";
import Auth from "../models/auth.models.js";

export const createClient = async (request, response, next) => {
  try {
    // Extract client details from request body
    const {
      first_name,
      last_name,
      id_number,
      phone_no,
      gender,
      marital_status,
      date_of_birth,
      institution_level,
      institution_name,
      course,
      adm_number,
      school_type,
      completion_year,
      nearest_primary_school,
      estate_village,
      town_city,
      constituency,
      county,
    } = request.body;

    if (!request.profileImageUrl || !request.idImageUrl) {
      return response.status(400).json({
        success: false,
        message: "Both profile and ID images are required",
      });
    }

    // Get the authenticated user's ID
    const authId = request.user.id;

    // Restrict regular users from creating multiple accounts
    const isAdmin = request.user.role === "admin";
    if (!isAdmin) {
      const existingClient = await Client.findOne({ authId });
      if (existingClient) {
        return next(
          errorHandler(403, "You can only create one client account")
        );
      }
    }

    // Assign the correct userId based on role
    const assignedUserId = isAdmin ? request.body.authId || authId : authId;
    // Ensure userId is available from authentication middleware
    if (!request.user || !request.user.id) {
      return next(errorHandler(401, "Unauthorized: User ID is missing"));
    }
    // Check if ID number, phone number, admission number, or KRA PIN already exists
    const existingUser = await Client.findOne({
      $or: [{ id_number }, { phone_no }, { adm_number }],
    });

    if (existingUser) {
      return next(
        errorHandler(400, "Client with provided details already exists")
      );
    }

    // Create new client
    const newClient = new Client({
      authId: assignedUserId,
      first_name,
      last_name,
      id_number,
      phone_no,
      gender,
      marital_status,
      image: request.profileImageUrl,
      id_image: request.idImageUrl,
      date_of_birth,
      institution_level,
      institution_name,
      course,
      adm_number,
      school_type,
      completion_year,
      nearest_primary_school,
      estate_village,
      town_city,
      constituency,
      county,
    });

    // Save to database
    const savedClient = await newClient.save();

    // Link the client to the Auth model by updating the `client` field
    await Auth.findByIdAndUpdate(authId, { clientId: savedClient._id });

    // Respond with success message
    response.status(201).json({
      success: true,
      message: "Client created successfully",
      savedClient,
    });
  } catch (error) {
    next(errorHandler(500, `Failed to create a client ${error}`));
  }
};

export const getAllClients = async (request, response, next) => {
  try {
    const clients = await Client.find().populate("authId", "username email");

    response.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch clients", error));
  }
};

export const getClientById = async (request, response, next) => {
  try {
    const clientId = request.params.id;

    const client = await Client.findById(clientId);
    if (!client) {
      return next(errorHandler(404, "Client not found"));
    }
    response.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Failed to fetch client", error));
  }
};

export const getClientByAuthId = async (request, response, next) => {
  try {
    const authId = request.params.authId;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(authId)) {
      return next(errorHandler(400, "Invalid user ID format"));
    }

    const client = await Client.findOne({ authId }).populate(
      "authId",
      "username email"
    );
    if (!client) {
      return next(errorHandler(404, "Client not found for auth id."));
    }

    response.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Failed to fetch client by User ID", error));
  }
};

export const updateClient = async (request, response, next) => {
  try {
    const {
      first_name,
      last_name,
      id_number,
      phone_no,
      gender,
      marital_status,
      image,
      id_image,
      date_of_birth,
      institution_level,
      institution_name,
      course,
      adm_number,
      adm_year,
      completion_year,
      nearest_primary_school,
      estate_village,
      town_city,
      constituency,
      county,
    } = request.body;

    const authId = request.user.id;

    // Find the client by ID
    const client = await Client.findById(authId);
    if (!client) {
      return next(errorHandler(404, "Client not found"));
    }

    const updatedClient = await Client.findByIdAndUpdate(
      authId,
      {
        full_name,
        id_number,
        phone_no,
        gender,
        marital_status,
        image,
        id_image,
        date_of_birth,
        institution_level,
        institution_name,
        course,
        adm_number,
        adm_year,
        completion_year,
        nearest_primary_school,
        estate_village,
        town_city,
        constituency,
        county,
      },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return next(errorHandler(404, "Client not found"));
    }

    response.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to update client", error));
  }
};

export const deleteClient = async (request, response, next) => {
  try {
    const authId = request.user.id;
    const client = await Client.findById(authId);

    if (!client) {
      return next(errorHandler(404, "Client not found"));
    }

    const deletedClient = await Client.findByIdAndDelete(authId);
    if (!deletedClient) {
      return next(errorHandler(404, "Client not found"));
    }

    // Delete the associated user
    const deletedUser = await User.findByIdAndDelete(authId);
    if (!deletedUser) {
      return next(errorHandler(404, "Associated user with ID not found."));
    }

    response.status(200).json({
      success: true,
      message: "Client and user account deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to delete client", error));
  }
};

export const createGuarantor = async (request, response, next) => {
  try {
    const {
      full_name,
      phone_no,
      id_number,
      gender,
      kra_pin,
      date_of_birth,
      marital_status,
      no_of_dependants,
      education_level,
      relationship_to_student,
    } = request.body;

    const authId = request.user.id;
    const isAdmin = request.user.role !== "admin";

    // Restrict regular users from creating multiple accounts
    if (!isAdmin) {
      const existingClient = await Guarantor.findOne({ authId });
      if (existingClient) {
        return next(
          errorHandler(403, "You can only create one client account")
        );
      }
    }

    const existingUser = await Guarantor.findOne({
      $or: [{ id_number }, { phone_no }, { kra_pin }],
    });

    if (existingUser) {
      return next(
        errorHandler(400, "Guarantor with provided details already exists")
      );
    }

    // Create new guarantor
    const newGuarantor = new Guarantor({
      authId,
      full_name,
      phone_no,
      id_number,
      gender,
      kra_pin,
      date_of_birth,
      marital_status,
      no_of_dependants,
      education_level,
      relationship_to_student,
    });

    // Save to database
    const savedGuarantor = await newGuarantor.save();

    // Link the client to the Auth model by updating the `guarantor` field
    await Auth.findByIdAndUpdate(authId, { guarantorId: savedGuarantor._id });

    // Respond with success message
    response.status(201).json({
      success: true,
      message: "Guarantor created successfully",
      savedGuarantor,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Failed to create guarantor", error));
  }
};

export const getAllGuarantors = async (request, response, next) => {
  try {
    const guarantor = await Guarantor.find().populate(
      "authId",
      "username email"
    );

    response.status(200).json({
      success: true,
      count: guarantor.length,
      guarantor,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch guarantors", error));
  }
};

export const getGuarantorById = async (request, response, next) => {
  try {
    const guarantorId = request.params.id;
    const guarantor = await Guarantor.findById(guarantorId)
      .populate({
        path: "authId",
        select: "username email role clientId",
        populate: [
          {
            path: "clientId",
            model: "Client",
            select:
              "first_name last_name id_number phone_no gender marital_status image id_image date_of_birth",
          },
        ],
      })
      .lean();

    if (!guarantor) {
      return next(errorHandler(404, "Guarantor not found"));
    }
    response.status(200).json({
      success: true,
      guarantor,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch guarantor", error));
  }
};

export const updateGuarantor = async (request, response, next) => {
  try {
    const guarantorId = request.params.id;
    const {
      full_name,
      phone_no,
      id_number,
      gender,
      kra_pin,
      date_of_birth,
      marital_status,
      no_of_dependants,
      education_level,
      relationship_to_student,
    } = request.body;

    // Find the guarantor by ID
    const guarantor = await Guarantor.findById(guarantorId);
    if (!guarantor) {
      return next(errorHandler(404, "Guarantor not found"));
    }

    // Ensure user making the request is the owner of the client record
    if (guarantor.userId.toString() !== request.user.id) {
      return next(
        errorHandler(403, "Unauthorized: You can only update your own account")
      );
    }

    const updatedGuarantor = await Guarantor.findByIdAndUpdate(
      guarantorId,
      {
        full_name,
        phone_no,
        id_number,
        gender,
        kra_pin,
        date_of_birth,
        marital_status,
        no_of_dependants,
        education_level,
        relationship_to_student,
      },
      { new: true, runValidators: true }
    );

    if (!updatedGuarantor) {
      return next(errorHandler(404, "Guarantor not found"));
    }

    response.status(200).json({
      success: true,
      message: "Guarantor updated successfully",
      client: updatedGuarantor,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to update guarantor", error));
  }
};

export const deleteGuarantor = async (request, response, next) => {
  try {
    const guarantorId = request.params.id;
    const guarantor = await Guarantor.findById(guarantorId);

    if (!guarantor) {
      return next(errorHandler(404, "Guarantor not found"));
    }

    const deletedGuarantor = await Guarantor.findByIdAndDelete(guarantorId);
    if (!deletedGuarantor) {
      return next(errorHandler(404, "Guarantor not found"));
    }

    response.status(200).json({
      success: true,
      message: "Guarantor deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to delete guarantor", error));
  }
};
