"use client";
import {
    Button
} from "@mui/material";

interface UploadButtonProps {
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const UploadButton = ({onChange}:UploadButtonProps) => {
  return (
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
          Upload
          <input type="file" hidden accept="image/*" onChange={onChange} />
        </Button>
  )
}

export default UploadButton
