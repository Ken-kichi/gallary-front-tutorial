import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button
} from "@mui/material";

interface DeleteButtonProps {
    onClick:()=>void
}

const DeleteButton = ({onClick}:DeleteButtonProps) => {
  return (
    <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onClick}
            sx={{
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Delete
          </Button>
  )
}

export default DeleteButton
