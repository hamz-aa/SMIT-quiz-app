import { Checkbox, FormControlLabel, TextField } from "@mui/material";

const AdditionalSettings = ({
  quiz,
  handleCheckboxChange,
  handleTimeLimitChange,
}) => (
  <>
    <FormControlLabel
      control={
        <Checkbox
          checked={quiz.locationRestriction}
          onChange={handleCheckboxChange}
          name="locationRestriction"
        />
      }
      label="Location Restriction"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={quiz.tabSwitchingRestriction}
          onChange={handleCheckboxChange}
          name="tabSwitchingRestriction"
        />
      }
      label="Tab Switching Restriction"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={quiz.customMode}
          onChange={handleCheckboxChange}
          name="customMode"
        />
      }
      label="Custom Mode"
    />
    {quiz.customMode && (
      <div className="flex flex-col space-y-4">
        <TextField
          label="Easy Time Limit (minutes)"
          name="easy"
          type="number"
          value={quiz.timeLimits.easy}
          onChange={handleTimeLimitChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medium Time Limit (minutes)"
          name="medium"
          type="number"
          value={quiz.timeLimits.medium}
          onChange={handleTimeLimitChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Difficult Time Limit (minutes)"
          name="difficult"
          type="number"
          value={quiz.timeLimits.difficult}
          onChange={handleTimeLimitChange}
          fullWidth
          margin="normal"
        />
      </div>
    )}
  </>
);

export default AdditionalSettings;
