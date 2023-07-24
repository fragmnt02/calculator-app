import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "../../global/hooks/AppContext";
import { useLoginRequest, useSignupRequest } from "../../global/hooks/request";

export const SignupPage = () => {
  const { updateIsLoggedIn } = useAppContext();
  const { signup, signupResponseStatus } = useSignupRequest();
  const { login, loginResponseStatus } = useLoginRequest();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      alert("Passwords should match");
      return;
    }

    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    await signup({
      ...credentials,
      status: "active",
    });
  };

  useEffect(() => {
    if (signupResponseStatus === 201) {
      const credentials = {
        username: formData.username,
        password: formData.password,
      };
      login(credentials);
    }
  }, [signupResponseStatus, login, formData]);

  useEffect(() => {
    if (loginResponseStatus === 200) {
      updateIsLoggedIn(true);
    }
  }, [loginResponseStatus, updateIsLoggedIn]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Calculator App Signup
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Signup
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: "16px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
