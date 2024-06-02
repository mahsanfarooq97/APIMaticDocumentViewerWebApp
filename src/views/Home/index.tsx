import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPages } from "../../redux/slice";
import { AppDispatch } from "../../redux/store";

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleButtonClick = () => {
    dispatch(getPages(inputValue));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <TextField
        label="Enter query"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Submit
      </Button>
    </Container>
  );
};

export default HomePage;
