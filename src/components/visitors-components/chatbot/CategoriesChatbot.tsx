import { useState } from "react";
import {
  Box,
  Divider,
  Grow,
  Typography,
  IconButton,
  Zoom,
} from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import apiClient from "../../../scripts/axiosConfig";
import { PuffLoader } from "react-spinners";

enum Category {
  INSTITUCIONAL = "INSTITUCIONAL",
  MICROEMPRENDIMIENTOS = "MICROEMPRENDIMIENTOS",
  PREGUNTAS_FRECUENTES = "PREGUNTAS_FRECUENTES",
}

interface Question {
  id: number;
  question: string;
}

const CategoriesChatbot = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [open, _setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (category: Category) => {
    setSelectedCategory(category);
    setActiveQuestionId(null);
    setAnswers({});
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/chatbot/category?name=${category}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = async (question: Question) => {
    setActiveQuestionId(question.id);
    if (!answers[question.id]) {
      try {
        const response = await apiClient.get(
          `/chatbot/response?id=${question.id}`
        );
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [question.id]: response.data.Respuesta,
        }));
      } catch (error) {
        console.error("Error al obtener la respuesta:", error);
      }
    } else {
      setActiveQuestionId(
        activeQuestionId === question.id ? null : question.id
      );
    }
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setActiveQuestionId(null);
    setAnswers({});
  };

  return (
    <Grow in={true} timeout={800}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "var(--grisClaro)",
          borderRadius: "20px",
          padding: "16px",
          width: "90%",
          height: "45%",
          marginBottom: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            {selectedCategory && (
              <IconButton
                onClick={handleBackClick}
                sx={{
                  color: "var(--azul)",
                  position: "absolute",
                  left: 0,
                }}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            )}
            <Typography
              variant="body1"
              sx={{
                color: "var(--azul)",
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              {selectedCategory ? selectedCategory : "Seleccioná una categoría"}
            </Typography>
          </Box>
          <Divider
            sx={{
              width: "100%",
              marginTop: "8px",
              borderColor: "var(--azul)",
              borderBottomWidth: "1px",
            }}
          />
        </Box>

        {!selectedCategory && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "0 12px",
            }}
          >
            <Grow in={open} timeout={900}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#59BA47",
                  borderRadius: "25px",
                  padding: "8px 8px",
                  width: "70%",
                  margin: "10px 0",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryClick(Category.INSTITUCIONAL)}
              >
                <Typography variant="body1">Institucional</Typography>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CorporateFareIcon sx={{ color: "var(--azul)" }} />
                </Box>
              </Box>
            </Grow>

            <Grow in={open} timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#59BA47",
                  borderRadius: "25px",
                  padding: "8px 8px",
                  width: "70%",
                  margin: "10px 0",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleCategoryClick(Category.MICROEMPRENDIMIENTOS)
                }
              >
                <Typography variant="body1">Microemprendimientos</Typography>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EnergySavingsLeafIcon sx={{ color: "var(--azul)" }} />
                </Box>
              </Box>
            </Grow>

            <Grow in={open} timeout={1100}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#59BA47",
                  borderRadius: "25px",
                  padding: "8px 8px",
                  width: "70%",
                  margin: "10px 0",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleCategoryClick(Category.PREGUNTAS_FRECUENTES)
                }
              >
                <Typography variant="body1">Preguntas Frecuentes</Typography>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ContactSupportIcon sx={{ color: "var(--azul)" }} />
                </Box>
              </Box>
            </Grow>
          </Box>
        )}

        {selectedCategory && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "0 12px",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <PuffLoader color="var(--azul)" size={60} />
              </Box>
            ) : (
              questions.map((question) => (
                <Box key={question.id} sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#59BA47",
                      borderRadius: "25px",
                      padding: "8px 8px",
                      width: "90%",
                      margin: "10px auto",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleQuestionClick(question)}
                  >
                    <Typography sx={{ fontSize: "12px" }}>
                      {question.question}
                    </Typography>
                  </Box>

                  {activeQuestionId === question.id && answers[question.id] && (
                    <Zoom in={true} timeout={200}>
                      <Box
                        sx={{
                          bgcolor: "white",
                          borderRadius: "15px",
                          padding: "8px",
                          width: "90%",
                          margin: "10px auto",
                          color: "#000",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px" }}>
                          {answers[question.id]}
                        </Typography>
                      </Box>
                    </Zoom>
                  )}
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default CategoriesChatbot;
