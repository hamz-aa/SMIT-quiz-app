import { Button } from "@mui/material";

const SecondaryButton = ({ text, onClick }) => {
  return (
    <Button
      variant="outlined"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#34495e",
        color: "#34495e",
        borderRadius: "9999px", // rounded-full
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;
