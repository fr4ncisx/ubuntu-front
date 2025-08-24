import { useEffect, useState } from 'react';
import { Box, Typography, Button, Skeleton, Card } from "@mui/material";
import PublicationCard from "../visitors-components/PublicationCard";
import { useNavigate } from "react-router-dom";
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

const AdminPublications = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/create-publication");
  };

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPublications = async () => {
    try {
      const response = await apiClient.get('/publications/find-all?active=true');
      setPublications(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleDisable = async (id: number) => {
    try {
      await apiClient.put(`/publications/disable?id=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      fetchPublications();
    } catch (error) {
      console.error('Error al deshabilitar la publicación:', error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h1" fontSize={28} fontWeight={"600"} padding={"1.5rem"}>Publicaciones</Typography>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          width: "90%",
          maxWidth: "600px",
          height: "40px",
          borderRadius: "100px",
          boxShadow: "none",
          textTransform: "none",
          gap: "8px",
          fontSize: "1rem",
          fontWeight: "600",
          color: "var(--blanco)",
          backgroundColor: "var(--azul)",
        }}
      >
        Crear Publicación
      </Button>
      <Typography variant="h2" fontSize={22} fontWeight={"600"} padding={"2rem 1.5rem"}>Publicaciones cargadas</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Card
              key={index}
              sx={{
                width: "90vw",
                borderRadius: "1rem",
                backgroundColor: "var(--grisClaro)",
                padding: "16px 0px 8px 0px",
                margin: "auto 1rem",
                boxShadow: "none",
              }}
            >
              <Box sx={{ padding: "0 16px 16px 16px" }}>
                <Skeleton variant="text" sx={{ fontSize: 18, width: "50%", marginBottom: "1rem" }} />
                <Skeleton variant="rectangular" sx={{ borderRadius: "1rem", width: "100%", height: { xs: "140px", lg: "400px" }, marginBottom: "8px" }} />
                <Skeleton variant="text" sx={{ fontSize: 14, width: "30%", margin: 0 }} />
                <Skeleton variant="text" sx={{ fontSize: 16, width: "100%", height: "15vh" }} />
              </Box>
            </Card>
          ))
        ) : (
          publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              id={publication.id}
              title={publication.title}
              date={publication.date}
              images={publication.imagenes.map(img => img.url)}
              description={publication.description}
              onDisable={handleDisable}
            />
          ))
        )}
      </Box>
    </Box>

  );
};

export default AdminPublications;