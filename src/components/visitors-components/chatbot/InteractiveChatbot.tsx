import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../../scripts/axiosConfig";
import {
  TextField,
  Typography,
  InputAdornment,
  Avatar,
  Box,
  Modal,
  Button,
  Grow,
  Zoom,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import bothead from "/bothead.png";
import CategoriesChatbot from "./CategoriesChatbot";
import { DotLoader } from "react-spinners";

interface InteractiveChatbotProps {
  onClose: () => void;
}

const InteractiveChatbot: React.FC<InteractiveChatbotProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; type: "user" | "chatbot" }[]
  >([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [open, _setOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name || user.email);
      setUserImage(user.imagen);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setMessages([...messages, { text: inputValue, type: "user" }]);
      setInputValue("");

      setIsTyping(true);

      try {
        const response = await apiClient.get("/chatbot/init", {
          params: { question: inputValue },
        });

        const botResponse = response.data.Respuesta?.answerFound;

        const messageToDisplay = botResponse
          ? botResponse
          : "Lo siento, no encontré una respuesta. Por favor, intenta nuevamente.";

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: messageToDisplay, type: "chatbot" },
        ]);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Lo siento, algo salió mal. Inténtalo nuevamente.",
            type: "chatbot",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const userAvatar = (
    <Avatar
      sx={{
        bgcolor: "var(--azul)",
        marginBottom: "3px",
        width: 30,
        height: 30,
      }}
    >
      {userImage ? (
        <img src={userImage} alt="User Avatar" style={{ width: "100%" }} />
      ) : (
        userName?.charAt(0) || "Tú"
      )}
    </Avatar>
  );

  const chatbotAvatar = (
    <Avatar
      src={bothead}
      alt="Chatbot"
      sx={{
        marginBottom: "-10px",
        width: "40px",
        height: "30px",
        backgroundColor: "white",
        backgroundSize: "cover",
      }}
    />
  );

  return (
    <Modal open={open} onClose={undefined}>
      <Grow in={open} timeout={500}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "30px",
            padding: "16px",
            width: "80%",
            maxWidth: "500px",
            margin: "auto",
            marginTop: "20%",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Grow in={open} timeout={800}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "var(--grisClaro)",
                borderRadius: "20px",
                padding: "16px",
                width: "90%",
                maxHeight: "55%",
                marginBottom: "8px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "var(--azul)",
                  marginBottom: "4px",
                  marginTop: "-10px",
                  fontWeight: "bold",
                }}
              >
                Ingresá tu consulta
              </Typography>

              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  width: "100%",
                  zIndex: 1000,
                  backgroundColor: "transparent",
                  padding: "-4px 0",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Ingresá tu pregunta"
                  autoComplete="off"
                  fullWidth
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50px",
                    height: "30px",
                  }}
                  InputProps={{
                    style: {
                      height: "30px",
                      padding: "2px 20px",
                      borderRadius: "50px",
                      border: "none",
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          marginRight: 0,
                        }}
                      >
                        <EditIcon
                          sx={{
                            color: "var(--azul)",
                            marginLeft: "-12px",
                            marginRight: "4px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                  marginTop: "8px",
                  paddingBottom: "6px",
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection:
                        message.type === "user" ? "row" : "row-reverse",
                      alignItems: "flex-start",
                      width: "100%",
                      margin: "5px 0",
                      gap: "8px",
                      marginTop: 2,
                    }}
                  >
                    <Zoom in={true} timeout={100}>
                      {message.type === "user" ? userAvatar : chatbotAvatar}
                    </Zoom>
                    <Zoom in={true} timeout={100 + 500}>
                      <Box
                        sx={{
                          backgroundColor:
                            message.type === "user" ? "white" : "#59BA47",
                          color: message.type === "user" ? "black" : "white",
                          borderRadius: "20px",
                          padding: "8px",
                          maxWidth: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px" }}>
                          {message.text}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Box>
                ))}

                {isTyping && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      width: "100%",
                      margin: "5px 0",
                      gap: "8px",
                    }}
                  >
                    <Zoom in={true} timeout={100} key="typing-avatar">
                      {chatbotAvatar}
                    </Zoom>
                    <Zoom in={true} timeout={600} key="typing-spinner">
                      <Box
                        sx={{
                          backgroundColor: "#59BA47",
                          color: "black",
                          borderRadius: "20px",
                          padding: "8px",
                          maxWidth: "100%",
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "-10px",
                        }}
                      >
                        <DotLoader color="white" size={20} />
                      </Box>
                    </Zoom>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>
            </Box>
          </Grow>

          <CategoriesChatbot />

          <Button
            variant="text"
            color="inherit"
            onClick={onClose}
            sx={{
              height: 4,
              alignSelf: "center",
              color: "var(--azul)",
              fontWeight: "bold",
            }}
          >
            CERRAR
          </Button>
        </Box>
      </Grow>
    </Modal>
  );
};

export default InteractiveChatbot;
