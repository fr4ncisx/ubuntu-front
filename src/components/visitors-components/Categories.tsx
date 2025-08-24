import {
  Box,
  Typography,
  Button,
  CardActionArea,
  Modal as ModalComponent,
} from "@mui/material";
import economiaSocialIcon from "../../assets/images/economia-social.png";
import { useNavigate } from "react-router";
import agroecologiaIcon from "../../assets/images/agroecologia.png";
import conservacionIcon from "../../assets/images/conservacion.png";
import empresasIcon from "../../assets/images/empresas.png";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import { useState } from "react";

const Categories = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (cat: string) => {
    navigate(`/microentrepreneaurship/${cat}`);
  };

  const handleNavigateToNearby = () => {
    handleClose();
    navigate("/microentrepreneurships/nearby");
  };

  return (
    <div style={{ backgroundColor: "#FDFDFE" }}>
      <Box
        sx={{
          fontFamily: "Lato, Helvetica, Arial, sans-serif",
          color: "#090909",
          textAlign: "center",
          margin: "0 auto",
          maxWidth: "300px",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Lato",
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: "25px",
            textAlign: "center",
          }}
        >
          Categorías de Microemprendimientos
        </Typography>
        <CardActionArea
          onClick={() => handleClick("eco")}
          sx={{
            backgroundColor: "#EAEAEA",
            margin: "16px 0",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "16px",
            marginTop: "36px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <Box
              sx={{
                border: "1px solid #226516",
                borderRadius: "50%",
                width: { xs: "40px", sm: "40px", md: "56px" },
                height: { xs: "40px", sm: "40px", md: "56px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={economiaSocialIcon}
                alt="icon"
                style={{ width: "90%", height: "auto" }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "80%", paddingLeft: "8px" }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                color: "#093C59",
                textAlign: "left",
              }}
            >
              Economía social/Desarrollo local/ Inclusión financiera
            </Typography>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#226516",
              }}
            />
          </Box>
        </CardActionArea>

        <CardActionArea
          onClick={() => handleClick("agro")}
          sx={{
            backgroundColor: "#EAEAEA",
            margin: "16px 0",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "16px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <Box
              sx={{
                border: "1px solid #226516",
                borderRadius: "50%",
                width: { xs: "40px", sm: "48px", md: "56px" },
                height: { xs: "40px", sm: "48px", md: "56px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={agroecologiaIcon}
                alt="icon"
                style={{ width: "90%", height: "auto" }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "80%", paddingLeft: "8px" }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                color: "#093C59",
                textAlign: "left",
              }}
            >
              Agroecología/Orgánicos/ Alimentacion Saludable
            </Typography>

            <Box
              sx={{
                height: "1px",
                backgroundColor: "#226516",
              }}
            />
          </Box>
        </CardActionArea>

        <CardActionArea
          onClick={() => handleClick("cons")}
          sx={{
            backgroundColor: "#EAEAEA",
            margin: "16px 0",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "16px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <Box
              sx={{
                border: "1px solid #226516",
                borderRadius: "50%",
                width: { xs: "40px", sm: "48px", md: "56px" },
                height: { xs: "40px", sm: "48px", md: "56px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={conservacionIcon}
                alt="icon"
                style={{ width: "90%", height: "auto" }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "80%", paddingLeft: "8px" }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                color: "#093C59",
                textAlign: "left",
              }}
            >
              Conservación/Regeneración/ Servicios ecosistémicos
            </Typography>

            <Box
              sx={{
                height: "1px",
                backgroundColor: "#226516",
              }}
            />
          </Box>
        </CardActionArea>

        <CardActionArea
          onClick={() => handleClick("emp")}
          sx={{
            backgroundColor: "#EAEAEA",
            margin: "16px 0",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "16px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <Box
              sx={{
                border: "1px solid #226516",
                borderRadius: "50%",
                width: { xs: "40px", sm: "48px", md: "56px" },
                height: { xs: "40px", sm: "48px", md: "56px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={empresasIcon}
                alt="icon"
                style={{ width: "90%", height: "auto" }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "80%", paddingLeft: "8px" }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                color: "#093C59",
                textAlign: "left",
              }}
            >
              Empresas/Organismos de impacto/ Economía circular
            </Typography>

            <Box
              sx={{
                height: "1px",
                backgroundColor: "#226516",
              }}
            />
          </Box>
        </CardActionArea>

        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            backgroundColor: "#093C59",
            color: "#FFFFFF",
            marginTop: 4,
            borderRadius: "100px",
            width: "100%",
            height: "40px",
            textTransform: "none",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TravelExploreIcon sx={{ marginRight: "4px" }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Lato",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            Microemprendimientos Cercanos
          </Typography>
        </Button>

        <ModalComponent
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                bgcolor: 'background.paper',
                border: 'none',
                borderRadius: '28px',
                boxShadow: 24,
                p: 4
            }}>
                <Box sx={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    <ShareLocationOutlinedIcon sx={{ color: "#004aad", fontSize: '70px' }} />
                </Box>
                <Typography  variant="h5" component="h2" fontWeight={500} sx={{ textAlign: 'center', }}>
                ¿Deseas activar la Geolocalización?
                </Typography>
                <Typography  variant="h6" sx={{ mt: 2, textAlign: 'left' }}>
                Para mostrarte los microemprendimientos cercanos, necesitamos acceder a tu ubicación.
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                    
                    <Button onClick={handleClose} variant="text" sx={{ mt: 2, textTransform: 'none' }}>
                        Cancelar
                    </Button>

                    <Button onClick={handleNavigateToNearby} variant="text" sx={{ mt: 2, textTransform: 'none' }}>
                        Aceptar
                    </Button>
                </Box>
            </Box>
        </ModalComponent>
      </Box>
    </div>
  );
};

export default Categories;
