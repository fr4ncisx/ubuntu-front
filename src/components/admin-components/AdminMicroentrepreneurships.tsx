import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import apiClient from "../../scripts/axiosConfig";
import Modal from "../visitors-components/Modal";

const AdminMicroentrepreneurships = () => {
  const navigate = useNavigate();
  const [microentrepreneurships, setMicroentrepreneurships] = useState<any[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedMicro, setSelectedMicro] = useState<any>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    isSuccess: true,
    title: "",
    description: "",
  });

  const handleButtonClick = () => {
    navigate("/admin/create-micro");
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    micro: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMicro(micro);
    setOpenMenuId(micro.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMicro(null);
    setOpenMenuId(null);
  };

  const handleEdit = () => {
    navigate("/admin/edit-micro", { state: { micro: selectedMicro } });
  };

  const handleHide = async () => {
    if (!selectedMicro) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No se encontró un token de autenticación");
      return;
    }

    try {
      await apiClient.put(
        `/micro/hide`,
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: { id: selectedMicro.id },
        }
      );

      setMicroentrepreneurships((prev) =>
        prev.filter((micro) => micro.id !== selectedMicro.id)
      );

      setModalData({
        isSuccess: true,
        title: "Microemprendimiento oculto",
        description: `El microemprendimiento "${selectedMicro.nombre}" se ha ocultado correctamente.`,
      });
    } catch (error) {
      console.error("Error al ocultar el microemprendimiento:", error);
      setModalData({
        isSuccess: false,
        title: "Error al ocultar",
        description: `Ocurrió un error al intentar ocultar el microemprendimiento "${selectedMicro.nombre}".`,
      });
    } finally {
      setModalOpen(true);
      handleClose();
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleView = (micro: any) => {
    navigate("/admin/view-micro", { state: { micro } });
  };

  useEffect(() => {
    const fetchMicroentrepreneurships = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No se encontró un token de autenticación");
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/micro/api/find-all", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        setMicroentrepreneurships(response.data);
      } catch (error) {
        console.error("Error al obtener los microemprendimientos:", error);
        alert("Ocurrió un error al obtener los microemprendimientos");
      } finally {
        setLoading(false);
      }
    };

    fetchMicroentrepreneurships();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Microemprendimientos</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            width: "90%",
            maxWidth: { xs: "328px", lg: "600px" },
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
          Cargar Microemprendimiento
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          width: "80%",
          mx: "auto",
          marginTop: 6,
          marginBottom: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 400, fontSize: "1.4rem" }}>
          Listado de Microemprendimientos
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginBottom: 4,
          }}
        >
          {[1, 2, 3].map((_, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: "#EAEAEA",
                width: "90%",
                maxWidth: { xs: "328px", lg: "600px" },
                height: "136px",
                borderRadius: "8px",
                padding: "8px",
                gap: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ paddingBottom: "16px !important" }}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "14px", width: "40%", marginBottom: 2 }}
                />
                <Divider
                  sx={{
                    width: "80%",
                    height: "0.5px",
                    backgroundColor: "#D2D2D2",
                    marginY: "8px",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "18px", width: "80%", marginTop: 4 }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginBottom: 4,
          }}
        >
          {microentrepreneurships.map((micro) => (
            <Card
              key={micro.id}
              sx={{
                backgroundColor: "#EAEAEA",
                width: "90%",
                maxWidth: { xs: "328px", lg: "600px" },
                height: "136px",
                borderRadius: "8px",
                padding: "8px",
                gap: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ paddingBottom: "16px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#093C59",
                    }}
                  >
                    {micro.nombre}
                  </Typography>
                  <Box
                    onClick={(event) => handleMenuClick(event, micro)}
                    sx={{
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        openMenuId === micro.id ? "#093C59" : "transparent",
                      borderRadius: "50%",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      position: "relative",
                      left: "2px",
                    }}
                  >
                    <MoreVertIcon
                      sx={{
                        color: openMenuId === micro.id ? "#FFFFFF" : "#090909",
                      }}
                    />
                  </Box>
                </Box>
                <Divider
                  sx={{
                    width: "80%",
                    height: "0.5px",
                    backgroundColor: "#226516",
                    marginBottom: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: 400,
                      flexGrow: 1,
                      textAlign: "left",
                    }}
                  >
                    {micro.categoria.nombre}
                  </Typography>
                  <IconButton
                    onClick={() => handleView(micro)}
                    sx={{
                      width: "24px",
                      height: "24px",
                      color: "#090909",
                    }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </CardContent>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    width: "120px",
                    marginLeft: "-48px",
                    marginTop: 1,
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={handleHide}>Ocultar</MenuItem>
              </Menu>
            </Card>
          ))}
        </Box>
      )}
      <Modal
        isOpen={modalOpen}
        isSuccess={modalData.isSuccess}
        title={modalData.title}
        description={modalData.description}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default AdminMicroentrepreneurships;
