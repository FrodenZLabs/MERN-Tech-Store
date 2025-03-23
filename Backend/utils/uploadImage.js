import cloudinary from "./cloudinary.js";

export const uploadMultiple = async (request, response, next) => {
  try {
    const images = request.files;
    const imageUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });
      imageUrls.push(result.secure_url);
    }
    request.images = imageUrls;
    next();
  } catch (error) {
    next(error);
  }
};

export const uploadSingle = async (request, response, next) => {
  try {
    const image = request.file; // Extract the uploaded file

    if (!image) {
      return response
        .status(400)
        .json({ success: false, message: "No image provided" });
    }
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto",
    });

    // Attach the image URL to the request object
    request.imageUrl = result.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};

export const uploadUserImages = async (request, response, next) => {
  try {
    const profileImage = request.files["profileImage"]?.[0];
    const idImage = request.files["idImage"]?.[0];

    if (!profileImage || !idImage) {
      return response.status(400).json({
        success: false,
        message: "Both profile image and ID image are required",
      });
    }

    // Upload profile image
    const profileUpload = await cloudinary.uploader.upload(profileImage.path, {
      resource_type: "auto",
    });
    // Upload ID image
    const idUpload = await cloudinary.uploader.upload(idImage.path, {
      resource_type: "auto",
    });

    // Attach images to request
    request.profileImageUrl = profileUpload.secure_url;
    request.idImageUrl = idUpload.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};
