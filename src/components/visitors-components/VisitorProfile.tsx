import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Divider,
  TextField,
  Button,
  Switch,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CampaignIcon from "@mui/icons-material/Campaign";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import apiClient from "../../scripts/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Modal from "../visitors-components/Modal";

const VisitorProfile = () => {
  const { updateProfileImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [editedData, setEditedData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    suscribed: user.suscribed || false,
  });
  const [imageUrl, setImageUrl] = useState(user.imagen || "");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      suscribed: user.suscribed || false,
    });
    setTempImageUrl("");
    setImageUrl(user.imagen || "");
  };

  const handleSaveClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      await apiClient.put(
        `/user/update?email=${user.sub}`,
        {
          ...editedData,
          imagen: tempImageUrl || imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedUser = {
        ...user,
        ...editedData,
        imagen: tempImageUrl || imageUrl,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setModalSuccess(true);
      setModalTitle("Actualización Exitosa");
      setModalDescription("Tus datos se han actualizado correctamente.");
      setModalOpen(true);

      if (tempImageUrl) {
        await updateProfileImage(tempImageUrl);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setModalSuccess(false);
      setModalTitle("Error al Actualizar");
      setModalDescription(
        "Hubo un problema al actualizar tus datos. Por favor, intenta nuevamente."
      );
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];

      if (
        ["image/png", "image/jpeg"].includes(imageFile.type) &&
        imageFile.size <= 3 * 1024 * 1024
      ) {
        const formData = new FormData();
        formData.append("images", imageFile);

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
          const newUrl = data["Imagen 1"];

          setTempImageUrl(newUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        alert(
          "Por favor, selecciona una imagen en formato .png, .jpg, o .jpeg con un tamaño máximo de 3MB."
        );
      }
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mi Perfil</h1>

      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          cursor: isEditing ? "pointer" : "default",
        }}
        onClick={isEditing ? handleImageUpload : undefined}
      >
        <Avatar
          src={tempImageUrl || imageUrl}
          alt={`${user.nombre} ${user.apellido}`}
          sx={{
            width: 130,
            height: 130,
            margin: "0 auto",
            marginTop: 0,
            marginBottom: 2,
            border: "2px solid #59BA47",
          }}
        />
        {isEditing && (
          <UploadFileIcon
            sx={{
              position: "absolute",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              padding: "8px",
              width: "24px",
              height: "24px",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <Card
        sx={{
          backgroundColor: "var(--grisClaro)",
          width: "80%",
          maxWidth: { xs: "328px", lg: "600px" },
          borderRadius: "16px",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "none",
          margin: "0 auto",
          marginBottom: isEditing ? 4 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <div
            style={{
              height: "16px",
              width: "16px",
              borderRadius: "100%",
              backgroundColor: "var(--exitoGestionada)",
              marginRight: "8px",
            }}
          ></div>

          <Typography variant="h1" sx={{ fontWeight: 400, fontSize: "1.4rem" }}>
            {user.rol}
          </Typography>
        </Box>

        <Divider
          sx={{
            backgroundColor: "#59BA47",
            height: "2px",
            width: "100%",
            margin: "16px auto",
          }}
        />

        {isEditing ? (
          <>
            <TextField
              label="Nombre"
              value={editedData.nombre}
              onChange={(e) =>
                setEditedData({ ...editedData, nombre: e.target.value })
              }
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "white",
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
              }}
              inputProps={{
                maxLength: 15,
              }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
            />

            <TextField
              label="Apellido"
              value={editedData.apellido}
              onChange={(e) =>
                setEditedData({ ...editedData, apellido: e.target.value })
              }
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "white",
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
              }}
              inputProps={{
                maxLength: 15,
              }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
            />

            <TextField
              label="Teléfono"
              value={editedData.telefono}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setEditedData({ ...editedData, telefono: `+${value}` });
              }}
              sx={{
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: "white",
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
              }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
              inputProps={{
                maxLength: 15,
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--azul)",
                  marginRight: 1,
                  marginTop: 1,
                  marginBottom: 2,
                }}
              >
                Recibir Newsletters:
              </Typography>
              <Switch
                checked={editedData.suscribed}
                onChange={(e) =>
                  setEditedData({ ...editedData, suscribed: e.target.checked })
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#59BA47",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#59BA47",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
                sx={{
                  width: "90%",
                  maxWidth: "600px",
                  height: "40px",
                  borderRadius: "100px",
                  marginTop: 1,
                  marginBottom: 1,
                  boxShadow: "none",
                  textTransform: "none",
                  gap: "8px",
                  fontSize: "16px",
                  color: "var(--blanco) !important",
                  backgroundColor: "#59BA47",
                  "&:hover": {
                    backgroundColor: "#59BA47",
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Aceptar"
                )}
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleCancelClick}
                sx={{
                  width: "90%",
                  maxWidth: "600px",
                  height: "40px",
                  borderRadius: "100px",
                  marginTop: 1,
                  marginBottom: 1,
                  boxShadow: "none",
                  textTransform: "none",
                  gap: "8px",
                  fontSize: "16px",
                  color: "var(--blanco) !important",
                  backgroundColor: "var(--azul)",
                  "&:hover": {
                    backgroundColor: "var(--azul)",
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                marginTop: 1,
              }}
            >
              <AccountCircleIcon sx={{ color: "var(--azul)" }} />
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginLeft: 1 }}
              >
                Nombre:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.nombre}
              </Typography>
            </Box>

            <Divider
              sx={{
                backgroundColor: "var(--grisMedio)",
                height: "1px",
                width: "100%",
                margin: "16px auto",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <AccountCircleIcon sx={{ color: "var(--azul)" }} />
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginLeft: 1 }}
              >
                Apellido:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.apellido}
              </Typography>
            </Box>

            <Divider
              sx={{
                backgroundColor: "var(--grisMedio)",
                height: "1px",
                width: "100%",
                margin: "16px auto",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <EmailIcon sx={{ color: "var(--azul)" }} />
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginLeft: 1 }}
              >
                Email:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.sub}
              </Typography>
            </Box>

            <Divider
              sx={{
                backgroundColor: "var(--grisMedio)",
                height: "1px",
                width: "100%",
                margin: "16px auto",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <PhoneIcon sx={{ color: "var(--azul)" }} />
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginLeft: 1 }}
              >
                Teléfono:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.telefono}
              </Typography>
            </Box>

            <Divider
              sx={{
                backgroundColor: "var(--grisMedio)",
                height: "1px",
                width: "100%",
                margin: "16px auto",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <CampaignIcon sx={{ color: "var(--azul)" }} />
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginLeft: 1 }}
              >
                Recibir Newsletters:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.suscribed ? "SI" : "NO"}
              </Typography>
            </Box>
          </>
        )}
      </Card>

      {!isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          sx={{
            width: "80%",
            maxWidth: "600px",
            height: "40px",
            borderRadius: "100px",
            marginTop: 2,
            marginBottom: 4,
            boxShadow: "none",
            textTransform: "none",
            gap: "8px",
            fontSize: "16px",
            color: "var(--blanco) !important",
            backgroundColor: "var(--azul)",
            "&:hover": {
              backgroundColor: "var(--azul)",
            },
          }}
        >
          Editar Información
        </Button>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isSuccess={modalSuccess}
        title={modalTitle}
        description={modalDescription}
      />
    </div>
  );
};

export default VisitorProfile;
