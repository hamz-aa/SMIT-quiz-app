import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const SettingsForm = ({ settings, onSave }) => {
  const [formData, setFormData] = useState({
    siteName: "",
    adminEmail: "",
    userRoles: [],
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="bg-white shadow rounded p-6" onSubmit={handleSubmit}>
      <TextField
        label="Site Name"
        name="siteName"
        value={formData.siteName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Admin Email"
        name="adminEmail"
        value={formData.adminEmail}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="User Roles (comma separated)"
        name="userRoles"
        value={formData.userRoles.join(", ")}
        onChange={(e) =>
          handleChange({
            target: { name: "userRoles", value: e.target.value.split(", ") },
          })
        }
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Settings
      </Button>
    </form>
  );
};

export default SettingsForm;
