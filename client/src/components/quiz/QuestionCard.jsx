import React from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";

const QuestionCard = ({ question, selectedOption, handleOptionSelect }) => {
  return (
    <Card className="w-full mb-4">
      <CardContent>
        <Typography variant="h5" className="font-bold pb-5">
          {question.question}
        </Typography>
        <Grid container spacing={2}>
          {question.options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                className={`p-2 ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleOptionSelect(option)}
                style={{ height: "50px", padding: "10px" }}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
