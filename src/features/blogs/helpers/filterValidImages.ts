export const filterValidImages = (
  files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] },
  maxSizeMB: number = 2
) => {
  const validFiles: { path: string }[] = [];

  // Convert maxSize to bytes (2MB = 2 * 1024 * 1024 bytes)
  const maxSizeInBytes = maxSizeMB * 1024 * 1024;

  const fileArray = Array.isArray(files) ? files : Object.values(files).flat();

  fileArray.forEach((file) => {
    // Check if file is an image based on mimetype
    if (file.mimetype.startsWith("image/") && file.size <= maxSizeInBytes) {
      validFiles.push({ path: file.path });
    }
  });

  return validFiles; // Return array of valid file objects with paths
};
