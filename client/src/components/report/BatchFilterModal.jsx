import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const BatchFilterModal = ({ open, onClose, applyFilter }) => {
  const [batchFrom, setBatchFrom] = useState("");
  const [batchTo, setBatchTo] = useState("");

  const handleApplyFilter = () => {
    applyFilter(batchFrom, batchTo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Advanced Batch Filter</DialogTitle>
      <DialogContent>
        <TextField
          label="Batch From"
          value={batchFrom}
          onChange={(e) => setBatchFrom(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Batch To"
          value={batchTo}
          onChange={(e) => setBatchTo(e.target.value)}
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

export default BatchFilterModal;
