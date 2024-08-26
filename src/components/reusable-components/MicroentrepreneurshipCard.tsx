import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { MicroentrepreneurshipCardProps } from "../../models/InterfaceModels"; 

const MicroentrepreneurshipCard: React.FC<MicroentrepreneurshipCardProps> = ({
  id,
  nombre,
  subcategoria,
  categoria,
  ciudad,
  provincia,
  pais,
  descripcion,
  masInformacion,
  imagenes,
}) => {
  const ubicacion = `${ciudad}, ${provincia}, ${pais}`;

  const defaultImages = [
    "https://s3-alpha-sig.figma.com/img/68a6/c5bd/b5a3ad944d19f62052c903640efbe019?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gh4-NwW166JFJNmqeGZTww9Hu8fKrrEdg~G3pFAYsjedWzSh6aJ~MG25Er6MBlFbl3Ww9IXHmA-VH9J91hUZ-PaYIBCnMpV14a4G3OqcXdtZab9ZA3clh6e6Gcycx15djBHqKCTxZ5Qj-nLqpIOKlBbqhEKGhWnBFjpziZPE03IdzQ-u8kS9u2l8egQjOuhpsUDLRWg89JfjP6qldHkUoKggjFWAQH57FTWjWcbWoZCmzHOP6WkGF9atJFL9E0LzlSfqsfItVY6YmCbYhj44C3oZ2rNR5TX8mfvFCYBel3vBYmag4s-lWthGLrtny7nfA6lp3BaNXu~ijt9VJ3rXBw__",
    "https://s3-alpha-sig.figma.com/img/e5bb/e721/91b416bd095a0a5df2d9c86f133c2593?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HqFXp0fhgyMeoEbsw3HPHKFqnzQqDzOn6Wf4wSeHLO7CMIXDrPo~IPTdGPL-k9zsV4oNp32hhq-oyGkOq1YduLGc4Z-ayFHvZL1en9uhogT7WeYtDX2YrFhPow529yXUclxRoRJ4hz~KYRtnX~JvA-tQzWghLDrv7envvvTvaRX2hTF~G-e3aB5vm~3roq3PmgyYNxy9-kyWRBFSZEn5362vMEw~JQAFNzE2P3N5UeD6suYQegy72sVs4PX1UXHooFUvmrJyfGAtx7wM9lmxXw6uudF9JfUNmN3QhvrVQlLbohh~61LoW-iBUdAZvbdc20ZH2sDZWTYFqPZRSuwVWw__",
    "https://s3-alpha-sig.figma.com/img/eec2/cbe2/cbe692d6a1d887e05795a78c8527e6df?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OT8Blep3D7XqUanZpEF-gQ8TIrwAKiTmfXVjECDpgHiMOrqYJS0dMHyoPzdSa6QCWHSDfJ53tr4ogMdTOHNgJpqk9MZX1q1XX7Hpsxx~P1KqbrVuRU6cTT9oaZ1bDzzAbJa2ZPCP2t~~K2oXjdZI6m~yvJmRZfhTKkqqmMD2WlrlD3w7Htlz10WkSqtkxiDKsOUT8kOe0xW5fF4W~KZev8mM133buxL3b-qggW7Ox2NHWLbRUF9euaI50DeXzePVkdwBuY4Z4GJptiqXkHBmYbueu4TwklToAL-Cx7MxD45CFCfkwtiCCSFpVMPwTJkq-yN8xyc8jLNA82Tjceq6NA__"
  ];

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const imagesToShow = imagenes.length > 0 ? imagenes.map(img => img.url) : defaultImages;

  const navigate = useNavigate();

  const handleNavigate = (id:number, name:string) => {
    localStorage.setItem('microID', id.toString());
    localStorage.setItem('microName', name);
    navigate(`/contact/${id}`);
  };

  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: { xs: "328px", lg: "900px" },
        margin: "16px auto",
        borderRadius: "16px",
        backgroundColor: "#EAEAEA",
        boxShadow: "none",
      }}
    >
      <Box sx={{ padding: "16px", marginBottom: "-36px" }}>
        <Carousel
          navButtonsAlwaysVisible
          NextIcon={<ArrowForwardIosIcon />}
          PrevIcon={<ArrowBackIosIcon />}
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              borderRadius: 0,
              padding: 0,
            },
          }}
          navButtonsWrapperProps={{
            style: {
              top: "calc(50% - 30px)",
              height: "40px",
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "2px",
            },
          }}
          sx={{ borderRadius: "10px", marginBottom: "16px" }}
        >
          {imagesToShow.map((image, index) => (
            <Box
              key={index}
              component="img"
              sx={{
                width: { xs: "100%", lg: "900px" },
                height: { xs: "140px", lg: "400px" },
                objectFit: "cover",
                borderRadius: "10px",
              }}
              src={image}
              alt={`carousel image ${index + 1}`}
            />
          ))}
        </Carousel>
      </Box>
      <CardContent>
        <Box
          sx={{
            width: "304px",
            height: "112px",
            gap: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "304px",
              height: "44px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Lato",
                fontWeight: 600,
                fontSize: "18px",
                color: "#090909",
              }}
            >
              {nombre}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Lato",
                fontWeight: 700,
                fontSize: "14px",
                color: "#093C59",
              }}
            >
              {subcategoria}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              width: "304px",
              height: "16px",
              fontFamily: "Lato",
              fontWeight: 700,
              fontSize: "12px",
              color: "#090909",
            }}
          >
            {categoria}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "215px",
              height: "24px",
              fontFamily: "Lato",
              fontWeight: 700,
              fontSize: "12px",
              color: "#090909",
            }}
          >
            <LocationOnOutlinedIcon
              sx={{ marginRight: "2px", color: "#093C59" }}
            />
            {ubicacion}
          </Typography>
        </Box>
        {expanded && (
          <>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Lato",
                fontWeight: 600,
                fontSize: "14px",
                color: "#093C59",
                marginTop: "36px",
              }}
            >
              Descripción del Microemprendimiento
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: "8px",
                fontFamily: "Lato",
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "24px",
                color: "#090909",
              }}
            >
              {descripcion}
            </Typography>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#093C59",
                margin: "8px 0",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Lato",
                fontWeight: 600,
                fontSize: "14px",
                color: "#093C59",
                marginTop: "36px",
              }}
            >
              Más información de interés
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: "8px",
                fontFamily: "Lato",
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "24px",
                color: "#090909",
              }}
            >
              {masInformacion}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <Button
                onClick={() => handleNavigate(id, nombre)}
                variant="contained"
                sx={{
                  backgroundColor: "#093C59",
                  color: "#FFFFFF",
                  marginTop: "16px",
                  borderRadius: "100px",
                  width: "144px",
                  height: "40px",
                  padding: "10px 24px",
                  textTransform: "none",
                  boxShadow: "none",
                  gap: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Lato",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "white",
                    textAlign: "center",
                    width: "71px",
                    height: "20px",
                  }}
                >
                  Contactar
                </Typography>
              </Button>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleToggle}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#093C59",
              margin: "auto",
              marginBottom: "-24px",
              "& .MuiSvgIcon-root": {
                fontSize: "36px",
              },
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MicroentrepreneurshipCard;
