"use client";
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
    <DialogTitle sx={{ fontWeight: 600 }}>削除確認</DialogTitle>
    <DialogContent>
      <Typography>この画像を削除しますか？</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickCancel}>キャンセル</Button>
      <Button color="error" variant="contained" onClick={onClickDelete}>
        削除する
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DeleteDialog
