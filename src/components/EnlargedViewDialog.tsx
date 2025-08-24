import { ImageProps } from "@/app/interface";
import DeleteButton from "@/components/DeleteButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import Image from "next/image";

interface EnlargedViewDialogProps {
    isOpen:boolean
    onCloseDialog:()=>void
    onClickClose:()=>void
    selectedImage:ImageProps | null
    onClickDelete:()=>void
}

const EnlargedViewDialog = ({
    isOpen,
    onCloseDialog,
    onClickClose,
    selectedImage,
    onClickDelete
}:EnlargedViewDialogProps
) => {
  return (
    <Dialog
    open={isOpen}
    onClose={onCloseDialog}
    maxWidth="md"
    fullWidth
    slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          backgroundColor: "#121212",
          color: "#fff",
          p: 3,
          maxWidth: "90%",
        },
      }}
    >
    <DialogTitle sx={{ textAlign: "right", p: 2 }}>
      <IconButton
        aria-label="close"
        onClick={onClickClose}
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
      <DeleteButton onClick={onClickDelete} />
    </DialogActions>
  </Dialog>
  )
}

export default EnlargedViewDialog
