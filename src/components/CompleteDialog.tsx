import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type PropTypes = {
  handleDialogClose: () => void;
  dialogOpen: boolean;
};

const CompleteDialog = ({ handleDialogClose, dialogOpen }: PropTypes) => {
  return (
    <Box>
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">축하합니다</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            모든 단어의 암기를 완료했습니다
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompleteDialog;
