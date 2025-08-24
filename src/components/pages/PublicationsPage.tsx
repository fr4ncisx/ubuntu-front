import Box from "@mui/material/Box";
import publicationsMainImage from "../../assets/images/publications-main-image.jpg";
import Typography from "@mui/material/Typography";
import SearchBar from "../visitors-components/SearchBar/SearchBar";
import PublicationCard from "../visitors-components/PublicationCard";
import { useEffect, useState } from "react";
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

const PublicationsPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await apiClient.get('/publications/find-all?active=true');
        setPublications(response.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublications();
  }, []);
  
  return (
    <Box
      sx={{
        marginTop: 0,
        width: "100vw",
        height: "90vh",
        position: "relative",
      }}
    >
      <img
        src={publicationsMainImage}
        alt={publicationsMainImage}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          marginBottom: "24px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <SearchBar color="--blanco" position="absolute" type="publicaciones" top="0"/>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "64px", lg: "230px" },
          left: 0,
          width: { xs: "85%", lg: "50%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "#FDFDFE",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            top: "176px",
            left: "16px",
            height: "24px",
            fontFamily: "Lato",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "24px",
            textTransform: "uppercase",
          }}
        >
          PUBLICACIONES
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: "208px",
            left: "16px",
            height: "64px",
            fontFamily: "Lato",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "32px",
          }}
        >
          Explorando finanzas de impacto
        </Typography>

        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            top: { xs: "288px", lg: "258px" },
            left: "16px",
            height: "192px",
            fontFamily: "Lato",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "32px",
          }}
        >
          Conocé cómo decisiones financieras pueden impactar positivamente en la
          sociedad y el medio ambiente
        </Typography>
      </Box>
      <Box
        sx={{
          top: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
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
      </Box>
    </Box>
  );
};

export default PublicationsPage;
