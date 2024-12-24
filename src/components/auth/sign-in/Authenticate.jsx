import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../../../service/LocalStorageService";
import { Box, CircularProgress, Typography } from "@mui/material";


export default function Authenticate() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
  
    useEffect(() => {
      console.log("Authenticating...");
      console.log(window.location.href);
  
      const accessTokenRegex = /code=([^&]+)/;
      const isMatch = window.location.href.match(accessTokenRegex);
  
      if (isMatch) {
        const authCode = isMatch[1];
        console.log("Auth Code: ", authCode);
  
        // Kiểm tra xem authCode đến từ Google hay Facebook dựa trên URL hiện tại
        const isFacebook = window.location.href.includes("facebook");
  
        const authUrl = isFacebook
          ? `http://localhost:8080/api/v1/auth/outbound/facebook/authentication?code=${authCode}`
          : `http://localhost:8080/api/v1/auth/outbound/google/authentication?code=${authCode}`;
  
        fetch(authUrl, {
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Response Data:", data);
            setToken(data.content?.token);
            setIsLoggedin(true);
          })
          .catch((error) => console.error("Authentication error:", error));
      }
    }, []);
  
    useEffect(() => {
      if (isLoggedin) {
        navigate("/");
      }
    }, [isLoggedin, navigate]);
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Authenticating...</Typography>
      </Box>
    );
  }
  