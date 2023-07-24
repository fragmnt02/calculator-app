import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "../../global/hooks/AppContext";
import { useLoginRequest } from "../../global/hooks/request";

export const LoginPage = () => {
  const { updateIsLoggedIn } = useAppContext();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, loginResponseStatus } = useLoginRequest();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

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
          Calculator App Login
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: "16px" }}>
          Don't have an account? <Link to="/signup">Sign Up Instead</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
