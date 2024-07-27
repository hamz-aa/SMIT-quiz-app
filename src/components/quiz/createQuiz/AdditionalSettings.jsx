import { Checkbox, FormControlLabel, TextField } from "@mui/material";

const AdditionalSettings = ({
  quiz,
  handleCheckboxChange,
  handleTimeLimitChange,
}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={quiz.location_restriction}
            onChange={handleCheckboxChange}
            name="location_restriction"
          />
        }
        label="Location Restriction"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={quiz.tab_switching_restriction}
            onChange={handleCheckboxChange}
            name="tab_switching_restriction"
          />
        }
        label="Tab Switching Restriction"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={quiz.custom_mode}
            onChange={handleCheckboxChange}
            name="custom_mode"
          />
        }
        label="Custom Mode"
      />
      {quiz.custom_mode && (
        <div>
          <TextField
            label="Easy Time Limit (minutes)"
            name="easy"
            type="number"
            value={quiz.time_limits.easy}
            onChange={handleTimeLimitChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medium Time Limit (minutes)"
            name="medium"
            type="number"
            value={quiz.time_limits.medium}
            onChange={handleTimeLimitChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Difficult Time Limit (minutes)"
            name="difficult"
            type="number"
            value={quiz.time_limits.difficult}
            onChange={handleTimeLimitChange}
            fullWidth
            margin="normal"
          />
        </div>
      )}
    </>
  );
};

export default AdditionalSettings;
