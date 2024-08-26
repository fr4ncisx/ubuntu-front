import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Divider,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import apiClient from "../../scripts/axiosConfig";

const AdminProfile = () => {
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
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await apiClient.put(
        `/user/update?email=${user.sub}`,
        {
          ...editedData,
          imagen: user.imagen,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedUser = { ...user, ...editedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mi Perfil</h1>

      <Avatar
        src={user.imagen}
        alt={`${user.nombre} ${user.apellido}`}
        sx={{
          width: 130,
          height: 130,
          margin: "0 auto",
          marginTop: 6,
          marginBottom: 4,
          border: "2px solid #59BA47",
        }}
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
            backgroundColor: "var(--exitoGestionada)",
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
              sx={{ marginBottom: "8px" }}
            />
            <TextField
              label="Apellido"
              value={editedData.apellido}
              onChange={(e) =>
                setEditedData({ ...editedData, apellido: e.target.value })
              }
              sx={{ marginBottom: "8px" }}
            />
            <TextField
              label="Teléfono"
              value={editedData.telefono}
              onChange={(e) =>
                setEditedData({ ...editedData, telefono: e.target.value })
              }
              sx={{ marginBottom: "8px" }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "var(--azul)", marginRight: 1 }}
              >
                Recibir Newsletters:
              </Typography>
              <Switch
                checked={editedData.suscribed}
                onChange={(e) =>
                  setEditedData({ ...editedData, suscribed: e.target.checked })
                }
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              sx={{ marginTop: 2 }}
            >
              Aceptar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelClick}
              sx={{ marginLeft: 2, marginTop: 2 }}
            >
              Cancelar
            </Button>
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
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "var(--azul)" }}>
                Recibir Newsletters:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--negro)", marginLeft: 1 }}
              >
                {user.suscribed ? "SI" : "NO"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              sx={{ marginTop: 2 }}
            >
              Editar Información
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default AdminProfile;
