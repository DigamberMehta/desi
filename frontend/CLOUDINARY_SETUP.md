# Cloudinary Setup Guide

This project uses Cloudinary for direct image uploads in the admin panel.

## Prerequisites

- Cloudinary account with API credentials
- Cloud Name and Upload Preset configured

## Configuration Steps

### 1. Get Your Cloud Name

- Go to https://console.cloudinary.com/settings/general
- You'll see your Cloud Name (e.g., `dirg3c2ip`)
- Update `VITE_CLOUDINARY_CLOUD_NAME` in `.env`

### 2. Create an Upload Preset

- Go to https://console.cloudinary.com/settings/upload
- Click "Add upload preset" or "Create upload preset"
- **Important**: Set the Upload type to **"Unsigned"**
- Give it a name like `desi_product_upload`
- Configure settings:
  - Folder: `desi-products` (automatically creates folder)
  - Allowed file types: jpg, jpeg, png, webp, gif
  - Max file size: 5MB (5242880 bytes)
- Click "Save"
- Update `VITE_CLOUDINARY_UPLOAD_PRESET` in `.env`

### 3. Environment Variables

Add to your `.env` file:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
```

## Usage in Admin Panel

- Main Product Image: Click "Upload Image" button
- Gallery Images: Click "Add Gallery Image" button
- Images are automatically uploaded to Cloudinary
- URLs are stored and managed in the product form
- All images go into the `desi-products` folder in Cloudinary

## API Credentials

Your API Key and Secret are used for backend operations (if needed):

- API Key: 896321273289128
- API Secret: htk-2fe9mNc8EFL7dkY_vbvZ8HE

Never expose the API Secret in client-side code. If using it in the backend, store it in backend environment variables only.

## Troubleshooting

- **Widget not appearing**: Check console for errors, ensure Cloud Name is correct
- **Upload fails**: Verify Upload Preset is "Unsigned" and folder name is correct
- **CORS errors**: This shouldn't happen with Cloudinary's hosted widget
