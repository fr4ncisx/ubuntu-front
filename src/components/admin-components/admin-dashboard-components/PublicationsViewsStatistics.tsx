import { Card, Typography, Box, CardContent, Skeleton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { PublicationStatistic } from "../../../models/InterfaceModels";

const PublicationsViewsStatistics = () => {
  const [statistics, setStatistics] = useState<PublicationStatistic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://ubuntu.koyeb.app/publications/statistics?limitSize=10",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          width: "80%",
          mx: "auto",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 400, fontSize: "1.4rem" }}>
          Visualizaciones por Publicación
        </Typography>
      </Box>

      {loading
        ? Array.from(new Array(10)).map((_, index) => (
            <Card
              key={index}
              sx={{
                width: "90%",
                maxWidth: { xs: "356px", lg: "900px" },
                margin: "16px auto",
                borderRadius: "8px",
                border: "1px solid #093C59",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "16px",
                        width: "75%",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "14px", width: "50%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "-10px",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      sx={{ marginRight: "8px" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "18px", width: "24px", height: "24px" }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        : statistics.map((stat, index) => (
            <Card
              key={index}
              sx={{
                width: "90%",
                maxWidth: { xs: "356px", lg: "900px" },
                margin: "16px auto",
                borderRadius: "8px",
                border: "1px solid #093C59",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "#090909",
                        textAlign: "left",
                        marginBottom: "4px",
                        maxWidth: "75%",
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#090909",
                        textAlign: "left",
                        marginBottom: "-20px",
                        paddingBottom: "0px",
                      }}
                    >
                      {formatDate(stat.date)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "-10px",
                    }}
                  >
                    <VisibilityOutlinedIcon
                      sx={{
                        width: "24px",
                        height: "24px",
                        color: "#093C59",
                        marginRight: "8px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "#093C59",
                        textAlign: "center",
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      {stat.visualizations}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
    </>
  );
};

export default PublicationsViewsStatistics;
