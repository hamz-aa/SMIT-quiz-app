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
  handleCloseFeedback,
}) => (
  <Dialog open={isFeedbackModalVisible} onClose={handleCloseFeedback}>
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
        onClick={handleCloseFeedback}
        variant="outlined"
        color="secondary"
      >
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default FeedbackModal;
