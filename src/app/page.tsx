"use client";
import DeleteDialog from "@/components/DeleteDialog";
import EnlargedViewDialog from "@/components/EnlargedViewDialog";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import Loading from "@/components/Loading";
import UploadButton from "@/components/UploadButton";
import Wrapper from "@/components/Wrapper";
import { useGallary } from "@/useGallary";
import {
  Box,
  Grid
} from "@mui/material";

export default function GalleryPage() {

  const {
    loading,
    images,
    selectedImage,
    setSelectedImage,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleUpload,
    handleDelete
  } = useGallary()


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
