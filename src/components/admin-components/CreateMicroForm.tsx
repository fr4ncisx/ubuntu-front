import { useEffect, useRef, useState } from "react";
import apiClient from "../../scripts/axiosConfig";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Button,
  IconButton,
} from "@mui/material";
import "./../../index.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import Modal from "../visitors-components/Modal";

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

const collapsibleTextFieldStyles = {
  ...commonTextFieldStyles,
  width: "100%",
  "& .MuiInputBase-root": {
    cursor: "pointer",
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

const CreateMicroForm = () => {
  const navigate = useNavigate();
  const [microName, setMicroName] = useState("");
  const [category, setCategory] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [provinces, setProvinces] = useState<string[]>([]);
  const [openCountry, setOpenCountry] = useState(false);
  const [state, setState] = useState("");
  const [openState, setOpenState] = useState(false);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [_images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const maxDescriptionLength = 300;
  const maxInfoLength = 300;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories/search");
        const fetchedCategories = response.data.map(
          (category: { nombre: string }) => category.nombre
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get("/paises");
        const data = response.data;
        const countryNames = data.map(
          (country: { nombre: string }) => country.nombre
        );
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setIsSubmitDisabled(
      !(
        microName &&
        category &&
        subcategory &&
        selectedCountry &&
        state &&
        city &&
        description &&
        info &&
        imageUrls.length > 0
      )
    );
  }, [
    microName,
    category,
    subcategory,
    selectedCountry,
    state,
    city,
    description,
    info,
    imageUrls,
  ]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setOpenCategory(false);
  };

  const handleCountryChange = async (countryName: string) => {
    setSelectedCountry(countryName);
    setOpenCountry(false);
    try {
      const response = await apiClient.get("/provincias", {
        params: { pais: countryName },
      });
      const data = response.data;
      const provinceNames = data.map(
        (province: { nombre: string }) => province.nombre
      );
      setProvinces(provinceNames);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const handleStateChange = (stateName: string) => {
    setState(stateName);
    setOpenState(false);
  };

  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleClickCountry = () => {
    setOpenCountry(!openCountry);
  };

  const handleClickState = () => {
    setOpenState(!openState);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(event.target.value);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(
        (file) =>
          ["image/png", "image/jpeg"].includes(file.type) &&
          file.size <= 3 * 1024 * 1024
      );

      if (imageFiles.length > 0) {
        setLoading(true);
        setImages((prevImages) => [...prevImages, ...imageFiles].slice(0, 3));

        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));

        try {
          const response = await apiClient.post(
            "/api/cloudinary/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const data = response.data;
          const newUrls = [data["Imagen 1"], data["Imagen 2"], data["Imagen 3"]]
            .filter((url) => url)
            .slice(0, 3);

          setImageUrls((prevUrls) => {
            const updatedUrls = [...prevUrls, ...newUrls].slice(0, 3);
            return updatedUrls;
          });
        } catch (error) {
          console.error("Error uploading images:", error);
        } finally {
          setLoading(false);
        }
      } else {
        alert(
          "Por favor, selecciona imágenes en formato .png, .jpg, o .jpeg con un tamaño máximo de 3MB."
        );
      }
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      navigate("/admin/micro");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No se encontró un token de autenticación");
      return;
    }

    const requestData = {
      nombre: microName,
      descripcion: description,
      masInformacion: info,
      pais: selectedCountry,
      provincia: state,
      ciudad: city,
      categoria: {
        nombre: category,
      },
      subcategoria: subcategory,
      imagenes: imageUrls,
    };

    setIsFormSubmitting(true);

    try {
      const response = await apiClient.post("/micro/new", requestData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setIsModalOpen(true);
      } else if (response.status === 409) {
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setIsSuccess(false);
      setIsModalOpen(true);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: 6 }}>
        <Typography variant="h1" sx={{ fontWeight: 600, fontSize: "1.9rem" }}>
          Carga de Microemprendimiento
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            width: "80%",
            mx: "auto",
            marginTop: 6,
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: 400, fontSize: "1.4rem" }}>
            Completá el formulario para cargar un Microemprendimiento
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <TextField
          label="Nombre del Microemprendimiento*"
          variant="outlined"
          helperText="Se visualizará en el título de la publicación"
          sx={commonTextFieldStyles}
          value={microName}
          onChange={(e) => setMicroName(e.target.value)}
          inputProps={{ maxLength: 20 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Categoría*"
            variant="outlined"
            value={category}
            onClick={handleClickCategory}
            helperText="Seleccioná la categoría del Microemprendimiento"
            InputProps={{
              endAdornment: (
                <Box onClick={handleClickCategory} sx={{ cursor: "pointer" }}>
                  {openCategory ? <ExpandLess /> : <ExpandMore />}
                </Box>
              ),
            }}
            sx={collapsibleTextFieldStyles}
          />
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                backgroundColor: "var(--blanco)",
                border: "1px solid var(--negro)",
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
              }}
            >
              {categories.map((cat, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleCategoryChange(cat)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--grisMedio)",
                    },
                    padding: "10px 16px",
                  }}
                >
                  <ListItemText primary={cat} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <TextField
          label="Subcategoría*"
          variant="outlined"
          helperText="Escribí la Subcategoría del Microemprendimiento"
          sx={commonTextFieldStyles}
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          inputProps={{ maxLength: 25 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="País*"
            variant="outlined"
            value={selectedCountry}
            onClick={handleClickCountry}
            helperText="Seleccioná un país de la lista"
            InputProps={{
              endAdornment: (
                <Box onClick={handleClickCountry} sx={{ cursor: "pointer" }}>
                  {openCountry ? <ExpandLess /> : <ExpandMore />}
                </Box>
              ),
            }}
            sx={collapsibleTextFieldStyles}
          />
          <Collapse in={openCountry} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                backgroundColor: "var(--blanco)",
                border: "1px solid var(--negro)",
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
              }}
            >
              {countries.map((countryName, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleCountryChange(countryName)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--grisMedio)",
                    },
                    padding: "10px 16px",
                  }}
                >
                  <ListItemText primary={countryName} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Estado/Provincia*"
            variant="outlined"
            value={state}
            onClick={handleClickState}
            helperText="Seleccioná una Provincia/Estado de la lista"
            InputProps={{
              endAdornment: (
                <Box onClick={handleClickState} sx={{ cursor: "pointer" }}>
                  {openState ? <ExpandLess /> : <ExpandMore />}
                </Box>
              ),
            }}
            sx={collapsibleTextFieldStyles}
            disabled={!selectedCountry}
          />
          <Collapse in={openState} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                backgroundColor: "var(--blanco)",
                border: "1px solid var(--negro)",
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
              }}
            >
              {provinces.map((province, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleStateChange(province)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--grisMedio)",
                    },
                    padding: "10px 16px",
                  }}
                >
                  <ListItemText primary={province} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <TextField
          label="Ciudad*"
          variant="outlined"
          helperText="Sin abreviaturas, nombre completo"
          sx={commonTextFieldStyles}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          inputProps={{ maxLength: 20 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Descripción del Microemprendimiento*"
            variant="outlined"
            multiline
            rows={7}
            inputProps={{ maxLength: maxDescriptionLength }}
            value={description}
            onChange={handleDescriptionChange}
            sx={multilineTextFieldStyles}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4px",
              padding: "0 8px",
              color: "var(--negro)",
              fontSize: "0.875rem",
            }}
          >
            <span>Máximo {maxDescriptionLength} caracteres</span>
            <span>
              {description.length}/{maxDescriptionLength}
            </span>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <TextField
            label="Más información del Microemprendedor*"
            variant="outlined"
            multiline
            rows={7}
            inputProps={{ maxLength: maxInfoLength }}
            value={info}
            onChange={handleInfoChange}
            sx={multilineTextFieldStyles}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4px",
              padding: "0 8px",
              color: "var(--negro)",
              fontSize: "0.875rem",
            }}
          >
            <span>Máximo {maxInfoLength} caracteres</span>
            <span>
              {info.length}/{maxInfoLength}
            </span>
          </Box>
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
          {imageUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "104px",
                height: "80px",
              }}
            >
              <Box
                component="img"
                src={url}
                alt={`Uploaded ${index}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <IconButton
                onClick={() => handleDeleteImage(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 24,
                  height: 24,
                  padding: 0,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleImageUpload}
            startIcon={
              loading ? (
                <CircularProgress
                  size={12}
                  sx={{
                    color: "var(--azul)",
                    marginRight: "auto",
                  }}
                />
              ) : (
                <FileUploadOutlinedIcon
                  sx={{ width: "24px", height: "24px" }}
                />
              )
            }
            sx={{
              backgroundColor:
                imageUrls.length >= 3
                  ? "var(--grisOscuro) !important"
                  : "var(--azul)",
              position: "absolute",
              width: "152px",
              height: "40px",
              right: 0,
              marginTop: "8px",
              textTransform: "none",
              borderRadius: "100px",
              boxShadow: "none",
              gap: "8px",
              fontSize: "14px",
            }}
            disabled={imageUrls.length >= 3 || loading}
          >
            {loading ? "Cargando..." : "Subir imagen"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Box
            sx={{
              marginTop: "56px",
              marginLeft: "220px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              paddingRight: "2px",
              width: "152px",
              height: "64px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "var(--negro)",
              }}
            >
              *Requerida al menos una imagen
              <br />
              Hasta 3 imágenes. Máximo 3Mb cada una
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        <Button
          variant="contained"
          disabled={isSubmitDisabled || isFormSubmitting}
          onClick={handleSubmit}
          sx={{
            width: "90%",
            maxWidth: "600px",
            height: "40px",
            borderRadius: "100px",
            boxShadow: "none",
            textTransform: "none",
            gap: "8px",
            fontSize: "16px",
            color: "var(--blanco) !important",
            backgroundColor: isSubmitDisabled
              ? "var(--grisOscuro) !important"
              : "var(--azul)",
            "&:hover": {
              backgroundColor: isSubmitDisabled
                ? "var(--grisOscuro) !important"
                : "var(--azul)",
            },
          }}
        >
          {isFormSubmitting ? (
            <CircularProgress size={24} sx={{ color: "var(--blanco)" }} />
          ) : (
            "Cargar Microemprendimiento"
          )}
        </Button>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isSuccess={isSuccess}
        title={
          isSuccess
            ? "Microemprendimiento cargado con éxito"
            : "Lo sentimos, el Microemprendimiento no pudo ser cargadado"
        }
        description={isSuccess ? "" : "Por favor, volvé a intentarlo."}
        onRetry={!isSuccess ? handleSubmit : undefined}
      />
    </>
  );
};

export default CreateMicroForm;
