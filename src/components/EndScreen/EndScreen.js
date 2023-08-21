import React, { useEffect, useState } from "react";
import { questions } from "../../data/questionsData";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

const config = {
  headers: {
    "X-Api-Key": process.env.REACT_APP_API_NINJA,
  },
};

function EndScreen({
  score,
  setScore,
  handleReset,
  calculatePercentage,
  setShowQuestion,
  time,
  setQuestionFinished,
}) {
  const [meme, setMeme] = useState([]);
  const [joke, setJoke] = useState({
    joke: "",
  });
  const [randomMeme, setRandomMeme] = useState(null);

  const getChuckNorris = async () => {
    try {
      const imgApiResponse = await fetch(`https://api.imgflip.com/get_memes`);
      const imgApiData = await imgApiResponse.json();
      const memeURLs = imgApiData.data.memes.map((meme) => meme.url);
      setMeme(memeURLs);

      const randomMemeIndex = Math.floor(Math.random() * memeURLs.length);
      setRandomMeme(randomMemeIndex);

      const fetchApiResponse = await fetch(
        `https://api.chucknorris.io/jokes/random`
      );
      const apiResponse = await fetchApiResponse.json();
      setJoke({ ...joke, joke: apiResponse.value });
    } catch (error) {
      console.log(error);
    }
  };

  const getDadJoke = async () => {
    try {
      const limit = 1;
      const fetchApiResponse = await fetch(
        `https://api.api-ninjas.com/v1/dadjokes?limit=${limit}`,
        config
      );
      const apiResponse = await fetchApiResponse.json();
      setJoke({ ...joke, joke: apiResponse[0].joke });
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (time) => {
    return `${time.minutes}:${time.seconds < 10 ? "0" : ""}${time.seconds}`;
  };

  const percent = calculatePercentage();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (percent > 80) {
          await getChuckNorris();
        } else {
          await getDadJoke();
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [percent]);

  const handleReturnToMainPage = () => {
    setShowQuestion(false);
    handleReset();
    setScore(0);
    setQuestionFinished(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12}>
            <Typography>Your Score : {score}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Total Time : {formatTime(time)}</Typography>
          </Grid>
          {score !== questions.length ? (
            <Grid item xs={12}>
              <Typography>Oops!! Better Luck Next Time!&#128542;</Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography>Congratulations !!&#128522;</Typography>
            </Grid>
          )}

          {percent > 80 ? (
            <Grid item xs={12}>
              <Typography textAlign="center">Chuck Norris Fact :</Typography>
              <Typography variant="subtitle 2" component="h6">
                {joke.joke}
              </Typography>
              <Grid item xs={12}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={meme[randomMeme]}
                    alt=""
                  />
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography textAlign="center" variant="subtitle 1">
                Dad Joke :
              </Typography>
              <Typography variant="subtitle 2" component="h6">
                {joke.joke}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button onClick={handleReturnToMainPage}>Return to Main</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default EndScreen;
