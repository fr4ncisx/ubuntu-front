import React, { useState } from "react";
import { IconButton, Typography, Paper, Slide } from "@mui/material";
import bot from "/bot.png";
import InteractiveChatbot from "./InteractiveChatbot";

const Chatbot: React.FC = () => {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleChatbotClick = () => {
    setMessageVisible(!isMessageVisible);
  };

  const handlePaperClick = () => {
    setMessageVisible(false);
    setChatbotVisible(true);
  };

  const handleCloseChatbot = () => {
    setChatbotVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        bottom: "5%",
        right: 10,
      }}
    >
      <IconButton
        style={{
          cursor: "pointer",
          backgroundColor: "rgba(89, 186, 71, 0.3)",
          borderRadius: "50%",
          width: 70,
          height: 70,
        }}
        onClick={handleChatbotClick}
      >
        <img src={bot} alt="bot" style={{ width: "100%" }} />
      </IconButton>

      <Slide
        direction="left"
        in={isMessageVisible}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 0 }}
      >
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            bottom: "15px",
            right: 80,
            width: 180,
            padding: 5,
            borderRadius: "25px",
            textAlign: "center",
            cursor: "pointer",
            zIndex: 1000,
          }}
          onClick={handlePaperClick}
        >
          <Typography variant="body1">¿En qué puedo ayudarte?</Typography>
        </Paper>
      </Slide>

      {isChatbotVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "15%",
            right: "5%",
            zIndex: 1000,
          }}
        >
          <InteractiveChatbot onClose={handleCloseChatbot} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
