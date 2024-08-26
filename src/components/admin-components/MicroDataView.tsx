import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import "./../../index.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router";
import { EditMicroFormProps, Image } from "../../models/InterfaceModels";

const commonTextFieldStyles = {
  width: "90%",
  maxWidth: "600px",
  height: "56px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--negro)",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "var(--azul)",
    },
    "&.MuiFormLabel-filled": {
      color: "var(--azul)",
    },
    "&.MuiInputLabel-shrink": {
      fontSize: "1.2rem",
      transform: "translate(14px, -12px) scale(0.85)",
      backgroundColor: "var(--blanco)",
      padding: "0 4px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "var(--negro)",
  },
  "& .MuiFormHelperText-root": {
    color: "var(--negro)",
    width: "328px",
    gap: "10px",
    fontSize: "0.875rem",
  },
};

const multilineTextFieldStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--negro)",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--negro)",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "var(--azul)",
    },
    "&.MuiFormLabel-filled": {
      color: "var(--azul)",
    },
    "&.MuiInputLabel-shrink": {
      fontSize: "1.2rem",
      transform: "translate(14px, -12px) scale(0.85)",
      backgroundColor: "var(--blanco)",
      padding: "0 4px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "var(--negro)",
  },
};

const MicroDataView: React.FC<{
  microemprendimiento?: EditMicroFormProps;
}> = ({}) => {
  const location = useLocation();
  const microemprendimiento = location.state?.micro;
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  if (!microemprendimiento) {
    return (
      <Typography variant="h4">
        No se encontraron Microemprendimientos.
      </Typography>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleBack = () => {
    navigate("/admin/micro");
  };

  const handleNextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < imageUrls.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const {
    nombre,
    categoria,
    subcategoria,
    pais,
    provincia,
    ciudad,
    descripcion,
    masInformacion,
    imagenes,
  } = microemprendimiento;

  const [imageUrls, _setImageUrls] = useState<string[]>(
    imagenes.map((img: Image) => img.url) || []
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Microemprendimiento</h1>

      <Box
        sx={{
          textAlign: "center",
          width: "80%",
          mx: "auto",
          marginTop: 6,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Lato",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "24px",
            textAlign: "center",
            color: "#093C59",
          }}
        >
          {nombre}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "Lato",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "25px",
            textAlign: "center",
            color: "#090909",
            marginTop: 2,
          }}
        >
          {categoria.nombre}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <TextField
          label="Subcategoría"
          variant="outlined"
          value={subcategoria}
          sx={commonTextFieldStyles}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <TextField
          label="País"
          variant="outlined"
          value={pais}
          sx={commonTextFieldStyles}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <TextField
          label="Provincia/Estado"
          variant="outlined"
          value={provincia}
          sx={commonTextFieldStyles}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <TextField
          label="Ciudad"
          variant="outlined"
          value={ciudad}
          sx={commonTextFieldStyles}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 4,
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Descripción del Microemprendimiento"
            variant="outlined"
            multiline
            InputProps={{
              readOnly: true,
            }}
            value={descripcion}
            sx={multilineTextFieldStyles}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 4,
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Más información del Microemprendedor"
            variant="outlined"
            multiline
            InputProps={{
              readOnly: true,
            }}
            value={masInformacion}
            sx={multilineTextFieldStyles}
          />
        </Box>
      </Box>

      {imageUrls.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            position: "relative",
            marginTop: 4,
          }}
        >
          {imageUrls.map((url: string, index: number) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "104px",
                height: "80px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(index)}
            >
              <Box
                component="img"
                src={url}
                alt={`Uploaded ${index}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ZoomInIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {selectedImageIndex !== null && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleClose}
        >
          <Button
            sx={{
              position: "absolute",
              top: 220,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--blanco)",
              color: "var(--azul)",
              padding: "4px 8px",
              borderRadius: "30px",
              zIndex: 1100,
              pointerEvents: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "var(--azul)",
                fontFamily: "Lato",
                fontWeight: 700,
                fontSize: "22px",
              }}
            >
              {selectedImageIndex + 1}/{imageUrls.length}
            </Typography>
          </Button>

          <Box sx={{ position: "relative", width: "100%", maxHeight: "100%" }}>
            <IconButton
              onClick={handlePreviousImage}
              disabled={selectedImageIndex === 0}
              sx={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                zIndex: 1100,
                backgroundColor: "rgba(9, 60, 89, 0.8)",
                borderRadius: "50%",
                width: 40,
                height: 40,
                "&:hover": {
                  backgroundColor: "rgba(9, 60, 89, 1)",
                },
              }}
            >
              <ArrowBackIosIcon
                sx={{
                  marginLeft: "6px",
                }}
              />
            </IconButton>

            <Box
              component="img"
              src={imageUrls[selectedImageIndex]}
              alt="Ampliada"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "100vh",
                objectFit: "contain",
                zIndex: 1000,
              }}
            />

            <IconButton
              onClick={handleNextImage}
              disabled={selectedImageIndex === imageUrls.length - 1}
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                zIndex: 1100,
                backgroundColor: "rgba(9, 60, 89, 0.8)",
                borderRadius: "50%",
                width: 40,
                height: 40,
                "&:hover": {
                  backgroundColor: "rgba(9, 60, 89, 1)",
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 8,
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            width: "30%",
            maxWidth: "600px",
            height: "40px",
            borderRadius: "100px",
            boxShadow: "none",
            textTransform: "none",
            gap: "8px",
            fontSize: "16px",
            color: "var(--blanco) !important",
            backgroundColor: "var(--azul)",
          }}
        >
          volver
        </Button>
      </Box>
    </div>
  );
};

export default MicroDataView;
