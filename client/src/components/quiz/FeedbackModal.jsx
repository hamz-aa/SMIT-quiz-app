import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const FeedbackModal = ({
  isFeedbackModalVisible,
  handleFeedbackChange,
  handleFeedbackSubmit,
  feedback,
}) => (
  <Dialog
    open={isFeedbackModalVisible}
    // onClose={() => setIsFeedbackModalVisible(false)}
  >
    <DialogTitle>Feedback</DialogTitle>
    <DialogContent>
      <TextField
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter your feedback"
        rows={4}
        multiline
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleFeedbackSubmit}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button
        // onClick={() => setIsFeedbackModalVisible(false)}
        variant="outlined"
        color="secondary"
      >
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default FeedbackModal;
