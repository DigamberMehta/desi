// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

export const openCloudinaryWidget = (onSuccess, onError) => {
  if (!window.cloudinary) {
    console.error("Cloudinary widget not loaded");
    onError?.("Cloudinary widget not loaded");
    return;
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
      folder: "desi-products",
      resourceType: "auto",
      clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
      maxFileSize: 5242880, // 5MB
      maxImageHeight: 4000,
      maxImageWidth: 4000,
      multiple: false,
      defaultSource: "local",
      showPoweredBy: false,
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#F2F2F2",
          tabIcon: "#E60012",
          menuIcons: "#5A5A5A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#E60012",
          action: "#E60012",
          inactiveTabIcon: "#B3B3B3",
          error: "#F44235",
          inProgress: "#01897B",
          complete: "#4CAF50",
          sourceBg: "#F5F5F5",
        },
        fonts: {
          default: null,
          "'Helvetica Neue', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Roboto",
            active: true,
          },
        },
      },
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        onError?.(error.statusText || "Upload failed");
      }
      if (result?.event === "success") {
        onSuccess?.(result.info.secure_url);
      }
    },
  );

  widget.open();
};
