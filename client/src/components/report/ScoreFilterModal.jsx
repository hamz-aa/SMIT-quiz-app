import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ScoreFilterModal = ({ open, onClose, applyFilter }) => {
  const [scoreFrom, setScoreFrom] = useState("");
  const [scoreTo, setScoreTo] = useState("");

  const handleApplyFilter = () => {
    applyFilter(scoreFrom, scoreTo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Advanced Score Filter</DialogTitle>
      <DialogContent>
        <TextField
          label="Score From"
          value={scoreFrom}
          onChange={(e) => setScoreFrom(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Score To"
          value={scoreTo}
          onChange={(e) => setScoreTo(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApplyFilter} variant="contained" color="primary">
          Apply Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScoreFilterModal;
