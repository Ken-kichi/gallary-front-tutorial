"use client";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 画像一覧取得（APIから取得する場合はfetchに置き換え）
  useEffect(() => {
    // 仮データ
    setImages([
      "https://picsum.photos/800",
      "https://picsum.photos/800",
      "https://picsum.photos/800",
    ]);
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // API に送信（例）
      // const formData = new FormData();
      // formData.append("file", file);
      // await fetch("/api/upload", { method: "POST", body: formData });

      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
    }
  };

  const handleDelete = () => {
    if (selectedImage) {
      setImages((prev) => prev.filter((img) => img !== selectedImage));
      setSelectedImage(null);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <Box p={3}>
      {/* アップロード部分 */}
      <Box mb={3}>
        <Button variant="contained" component="label">
          画像をアップロード
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
      </Box>

      {/* 画像一覧 */}
      <Grid container spacing={2}>
        {images.map((img, idx) => (
          <Grid item xs={6} sm={4} md={3} key={idx}>
            <Card onClick={() => setSelectedImage(img)} sx={{ cursor: "pointer" }}>
              <CardMedia component="img" height="140" image={img} alt={`img-${idx}`} />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 拡大表示 */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setSelectedImage(null)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="拡大画像" style={{ maxWidth: "100%" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteConfirmOpen(true)}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認モーダル */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>削除確認</DialogTitle>
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
