import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
interface DeleteDialogProps {
    isOpen:boolean
    onClose:()=>void
    onClickCancel:()=>void
    onClickDelete:()=>void
}

const DeleteDialog = ({isOpen,
    onClose,
    onClickCancel,
    onClickDelete}:DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle sx={{ fontWeight: 600 }}>Delete confirmation</DialogTitle>
    <DialogContent>
      <Typography>Do you want to delete this image?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickCancel}>Cancel</Button>
      <Button color="error" variant="contained" onClick={onClickDelete}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DeleteDialog
