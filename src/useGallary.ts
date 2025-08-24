import { ImageProps } from "@/app/interface";
import axios from "axios";
import { useEffect, useState } from "react";

import React from 'react';

export const useGallary = () => {
  const API_URL = "https://galleryappqjoaln.azurewebsites.net";
  const [images, setImages] = useState<ImageProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/items`);
      setImages(response.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(`${API_URL}/items`, formData);
        await fetchImages();
      } catch (err) {
        console.error("アップロード失敗:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedImage) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/items/${selectedImage.name}`);
        setImages((prev) => prev.filter((img) => img.name !== selectedImage.name));
        setSelectedImage(null);
        setDeleteConfirmOpen(false);
      } catch (err) {
        console.error("削除失敗:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    images,
    selectedImage,
    setSelectedImage,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleUpload,
    handleDelete
  }
}


