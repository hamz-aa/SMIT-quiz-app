import { useEffect, useState } from "react";
import SettingsForm from "../../components/settings/SettingsForm";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/settings")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the settings!", error);
      });
  }, []);

  const saveSettings = (updatedSettings) => {
    axios
      .put("http://localhost:5000/settings", updatedSettings)
      .then(() => {
        setSettings(updatedSettings);
        alert("Settings updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the settings!", error);
      });
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {settings && <SettingsForm settings={settings} onSave={saveSettings} />}
      </div>
    </div>
  );
};

export default Settings;
