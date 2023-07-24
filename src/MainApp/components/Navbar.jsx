import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/logout";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const isInRecords = location.pathname === "/records";

  const handleChangePage = () => {
    navigate(isInRecords ? "/" : "/records");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Calculator App
        </Typography>
        <Button color="inherit" onClick={handleChangePage}>
          {isInRecords ? "Operations" : "Records"}
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
