"use client";
import { ImageProps } from "@/app/interface";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
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
    <Box
      sx={{
        p: 4,
        bgcolor: "#fff",
        minHeight: "100vh",
        fontFamily: "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ローディング */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <CircularProgress color="inherit" size={60} />
        </Box>
      )}

      {/* ヘッダー */}
      <Box mb={4} textAlign="center">
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 600,
          letterSpacing: "-0.02em",
          mb: 4,
          background: "linear-gradient(90deg, #000, #444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Every image. A story.
      </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            px: 3,
            py: 1,
            borderRadius: "30px",
            bgcolor: "#111",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          画像をアップロード
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
      </Box>

      {/* 画像一覧 */}
      <Grid container spacing={3} justifyContent="center">
        {images.map((img, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              onClick={() => setSelectedImage(img)}
              sx={{
                cursor: "pointer",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={img.url}
                alt={`img-${idx}`}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
  open={!!selectedImage}
  onClose={() => setSelectedImage(null)}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      backgroundColor: "#121212", // ダーク背景
      color: "#fff", // 文字色を白に
    },
  }}
>
  <DialogTitle sx={{ textAlign: "right", p: 2 }}>
    <IconButton
      aria-label="close"
      onClick={() => setSelectedImage(null)}
      sx={{ color: "#fff" }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent sx={{ textAlign: "center", p: 3 }}>
    {selectedImage && (
      <>
        <Image
          src={selectedImage.url}
          alt={selectedImage.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            objectFit: "contain",
          }}
        />
        <Box mt={3}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: "#fff" }}>
            {selectedImage.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc", mt: 1 }}>
            {new Date(selectedImage.creation_time).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      </>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
    <Button
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={() => setDeleteConfirmOpen(true)}
      sx={{
        borderRadius: "30px",
        px: 3,
        textTransform: "none",
        fontWeight: 500,
      }}
    >
      削除
    </Button>
  </DialogActions>
</Dialog>


      {/* 削除確認 */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>削除確認</DialogTitle>
        <DialogContent>
          <Typography>この画像を削除しますか？</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>キャンセル</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
