import { Button } from "@mui/material";

const PrimaryButton = ({ text, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        backgroundColor: "#34495e",
        borderRadius: "9999px", // rounded-full
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
