"use client";
import { ImageProps } from "@/app/interface";
import DeleteDialog from "@/components/DeleteDialog";
import EnlargedViewDialog from "@/components/EnlargedViewDialog";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import Loading from "@/components/Loading";
import UploadButton from "@/components/UploadButton";
import Wrapper from "@/components/Wrapper";
import {
  Box,
  Grid
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function GalleryPage() {


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

  return (
    <Wrapper>
       {/* ローディング */}
       {loading && <Loading />}

  {/* ヘッダー */}
  <Box mb={4} textAlign="center">
    <Header text={" Every image. A story."} />

    <UploadButton onChange={handleUpload} />


  </Box>

  {/* 画像一覧 */}
  <Grid container spacing={3} justifyContent="center">
    {images.map((img, idx) => (
      <ImageCard
      key={idx}
      onClick={() => setSelectedImage(img)}
      url={img.url}
      />
    ))}
  </Grid>

  <EnlargedViewDialog
    isOpen={!!selectedImage}
    onCloseDialog={() => setSelectedImage(null)}
    onClickClose={() => setSelectedImage(null)}
    selectedImage={selectedImage}
    onClickDelete={() => setDeleteConfirmOpen(true)}
  />

  {/* 削除確認 */}
  <DeleteDialog
    isOpen={deleteConfirmOpen}
    onClose={() => setDeleteConfirmOpen(false)}
    onClickCancel={() => setDeleteConfirmOpen(false)}
    onClickDelete={handleDelete}
    />
  </Wrapper>

  );
}
