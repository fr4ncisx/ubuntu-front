import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import PublicationCard from "../visitors-components/PublicationCard";
import { useNavigate } from "react-router";
import apiClient from "../../scripts/axiosConfig";

interface PublicationImage {
  url: string;
}

interface Publication {
  id: number;
  title: string;
  description: string;
  date: string;
  imagenes: PublicationImage[];
}

const Publications: React.FC = () => {
  const navigate = useNavigate()
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await apiClient.get('/publications/find-all?ordered=true');
        setPublications(response.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box sx={{ margin: "2rem auto .5rem" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 16, textAlign: "center" }}>
          Publicaciones
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 22, textAlign: "center" }}>
          Finanzas con impacto
        </Typography>
      </Box>
      {publications.map((publication) => (
        <PublicationCard
          key={publication.id}
          id={publication.id}
          title={publication.title}
          date={publication.date}
          images={publication.imagenes.map(img => img.url)}
          description={publication.description}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "5rem" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/publications")}
          sx={{
            backgroundColor: "var(--azul)",
            color: "var(--blanco)",
            marginTop: "16px",
            borderRadius: "100px",
            width: "184px",
            height: "40px",
            textTransform: "none",
            boxShadow: "none",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Lato",
              fontWeight: 700,
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Ir a Publicaciones
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Publications;