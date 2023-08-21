import React from "react";
//import "./MainScreen.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function MainScreen({ handleToggle, setShowQuestion }) {
  const handleStartQuiz = () => {
    handleToggle();
    setShowQuestion(true);
  };
  return (
    <Paper
      elevation={1}
      square={false}
      sx={{
        maxWidth: 600,
        maxHeight: 500,
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome
      </Typography>
      <Button variant="outlined" onClick={handleStartQuiz}>START THE QUIZ</Button>
    </Paper>
  );
}

export default MainScreen;
