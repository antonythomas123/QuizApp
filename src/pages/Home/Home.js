import React, { useState } from "react";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen/MainScreen";
import Questions from "../../components/Questions/Questions";
import { questions } from "../../data/questionsData";
import { Grid } from "@mui/material";

function Home() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [questionFinished, setQuestionFinished] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTime({ minutes: 0, seconds: 0 });
    setIsActive(false);
  };

  const calculatePercentage = () => {
    const totalPercentage = (score / questions.length) * 100;
    return totalPercentage;
  };

  return (
    <>
      <Header
        time={time}
        setTime={setTime}
        isActive={isActive}
        questionFinished={questionFinished}
      />
      {showQuestion ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Questions
            score={score}
            setScore={setScore}
            setQuestionFinished={setQuestionFinished}
            handleReset={handleReset}
            calculatePercentage={calculatePercentage}
            setShowQuestion={setShowQuestion}
            time={time}
          />
        </Grid>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <MainScreen
            handleToggle={handleToggle}
            setShowQuestion={setShowQuestion}
          />
        </Grid>
      )}
    </>
  );
}

export default Home;
