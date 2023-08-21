import React, { useState } from "react";
import { questions } from "../../data/questionsData";
import EndScreen from "../EndScreen/EndScreen";
import { Box, Button, Checkbox, Container, Grid, Toolbar, Typography } from "@mui/material";
// import "./Questions.css";

function Questions({
  score,
  setScore,
  setQuestionFinished,
  handleReset,
  calculatePercentage,
  setShowQuestion,
  time
}) {

  const [selectedAnswer, setSelectedAnswer] = useState(
    Array(questions.length).fill("")
  );
  const [alert, setAlert] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChange = (current, choice) => {
    const updatedSelectedAnswers = selectedAnswer.map((answer, index) =>
      index === current ? choice : ""
    );
    setSelectedAnswer(updatedSelectedAnswers);
  };

  const handleQuestionChange = () => {
    if (selectedAnswer[currentQuestion] === "") {
      setAlert(true);
      return;
    }
    if (selectedAnswer[currentQuestion] === questions[currentQuestion].answer) {
      setAlert(false);
      setScore(score + 1);
    } else {
      setScore(score);
    }
    if (currentQuestion === questions.length - 1) {
      setQuestionFinished(true);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <Container maxWidth="sm">
      {currentQuestion < questions.length ? (
        <Grid>
          <Typography variant="h4">{questions[currentQuestion].question}</Typography>
          
          {questions[currentQuestion].choice.map((choice, key) => {
            return (
              <Toolbar key={key}>
                <Checkbox
                  type="checkbox"
                  name={choice}
                  value={choice}
                  checked={selectedAnswer[currentQuestion] === choice}
                  onChange={() => handleAnswerChange(currentQuestion, choice)}
                />
                <Typography>{choice}</Typography>
              </Toolbar>
            );
          })}

          {alert && (
            <Typography color="red">Please select atleast one Answer!</Typography>
          )}
          <div className="submit_button">
            <Button onClick={handleQuestionChange}>Submit</Button>
          </div>
          </Grid>
      ) : (
        <div className="end_screen">
          <EndScreen
            score={score}
            handleReset={handleReset}
            calculatePercentage={calculatePercentage}
            setShowQuestion={setShowQuestion}
            time={time}
            setScore={setScore}
            setQuestionFinished={setQuestionFinished}
          />
        </div>
      )}
    </Container>
  );
}

export default Questions;
