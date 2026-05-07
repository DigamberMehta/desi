import React, { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { apiUrl } from "../lib/api";

const CloudinaryUpload = ({
  onUpload,
  onError,
  currentImageUrl,
  disabled,
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(apiUrl("/api/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onUpload?.(data.url);
      } else {
        onError?.(data.message || "Upload failed");
      }
    } catch (err) {
      onError?.(err.message || "Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || loading}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#E60012] hover:bg-[#c4000f] disabled:bg-neutral-300 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading…
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload Image
          </>
        )}
      </button>
      {currentImageUrl && (
        <img
          src={currentImageUrl}
          alt="preview"
          className="w-12 h-12 rounded-lg object-contain border border-neutral-200 bg-neutral-50 shrink-0"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
    </div>
  );
};

export default CloudinaryUpload;
