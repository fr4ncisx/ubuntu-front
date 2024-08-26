import { Box, Typography, Button, CardActionArea } from "@mui/material";
import economiaSocialIcon from "../../assets/images/economia-social.png";
import { useNavigate } from "react-router";
import agroecologiaIcon from "../../assets/images/agroecologia.png";
import conservacionIcon from "../../assets/images/conservacion.png";
import empresasIcon from "../../assets/images/empresas.png";

const Categories = () => {
  const navigate = useNavigate();
  const handleClick = (cat: string) => {
    navigate(`/microentrepreneaurship/${cat}`)
  }
  return (
    <div style={{ backgroundColor: "#FDFDFE" }}>
      <Box
        sx={{
          fontFamily: "Lato, Helvetica, Arial, sans-serif",
          color: "#090909",
          textAlign: "center",
          margin: "0 auto",
          padding: "16px",
          maxWidth: "700px",
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
          Categorías
        </Typography>
        <CardActionArea
          onClick={() => handleClick('eco')}
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
          onClick={() => handleClick('agro')}
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
          onClick={() => handleClick('cons')}
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
          onClick={() => handleClick('emp')}
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
        onClick={()=>navigate("/microentrepreneaurship")}
          variant="contained"
          sx={{
            backgroundColor: "#093C59",
            color: "#FFFFFF",
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
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            Ver más Categorías
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Categories;
