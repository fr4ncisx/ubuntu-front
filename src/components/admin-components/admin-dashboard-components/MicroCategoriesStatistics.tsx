import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Divider,
  Box,
  CardContent,
  CircularProgress,
} from "@mui/material";
import apiClient from "../../../scripts/axiosConfig";
import { CategoryCounts } from "../../../models/InterfaceModels";

const categories = [
  {
    name: "Economía social/Desarrollo local/ Inclusión financiera",
    id: "cat:1",
  },
  { name: "Agroecología/Orgánicos/ Alimentación saludable", id: "cat:2" },
  { name: "Conservación/Regeneración/ Servicios ecosistémicos", id: "cat:3" },
  { name: "Empresas/Organismos de impacto/ Economía circular", id: "cat:4" },
];

const MicroCategoriesStatistics = () => {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({
    "cat:1": 0,
    "cat:2": 0,
    "cat:3": 0,
    "cat:4": 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await apiClient.get(
          "/micro/api/statistics/micro-category",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.Found) {
          setCategoryCounts(response.data.Found);
        }
      } catch (error) {
        console.error("Error fetching category counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: { xs: "356px", lg: "900px" },
        margin: "16px auto",
        borderRadius: "8px",
        backgroundColor: "#EAEAEA",
        boxShadow: "none",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Lato",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "25px",
          textAlign: "center",
          color: "#093C59",
          padding: "16px 16px 8px 16px",
        }}
      >
        Microemprendimientos por Categoría
      </Typography>

      <Divider
        sx={{
          backgroundColor: "#226516",
          height: "2px",
          margin: "0 auto",
        }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        {categories.map((category, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "16px 0",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "25px",
                  color: "#090909",
                  maxWidth: "75%",
                  textAlign: "left",
                }}
              >
                {category.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={12}
                    sx={{
                      color: "#093C59",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "25px",
                      color: "#090909",
                      textAlign: "center",
                    }}
                  >
                    {categoryCounts[category.id as keyof CategoryCounts]}
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider
              sx={{
                backgroundColor: "#226516",
                height: "1px",
                marginTop: "8px",
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MicroCategoriesStatistics;
