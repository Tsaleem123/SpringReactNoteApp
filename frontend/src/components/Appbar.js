import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Appbar() {
  return (
    <AppBar
      position="static"
      style={{
        marginTop: "2%",
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "none",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        style={{ fontWeight: "400", textAlign: "center" }}
      >
        Enter the name and content of your note.
      </Typography>
    </AppBar>
  );
}

export default Appbar;
