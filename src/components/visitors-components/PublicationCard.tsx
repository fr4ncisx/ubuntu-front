import React, { useState } from "react";
import { Box, Card, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import apiClient from "../../scripts/axiosConfig";
import { useNavigate } from "react-router";
import Modal from "../visitors-components/Modal";

interface PublicationCardProps {
  id: number;
  title: string;
  date: string;
  images: string[];
  description: string;
  onDisable?: (id: number) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  id,
  title,
  date,
  images,
  description,
  onDisable
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalSuccess, setIsSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.rol === 'ADMIN';
  const isUser = user.rol === 'USER' || !user.rol;
  const navigate = useNavigate();
  const truncatedText = description ? (description.length > 200 ? `${description.slice(0, 200)}...` : description) : '';

  const handleToggle = async () => {
    if (!expanded && isUser) {
      try {
        await apiClient.put(`/publications/click?id=${id}`, {}, {});
      } catch (error) {
        console.error('Error al registrar el clic:', error);
      }
    }
    setExpanded(!expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/publications/edit/${id}`);
  };

  const handleHide = async () => {
    if (onDisable) {
      try {
        onDisable(id);
        handleClose();
        setModalTitle('Publicación ocultada con éxito');
        setIsSuccess(true);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error al ocultar la publicación:', error);
        setModalTitle('Error al ocultar la publicación');
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    };
  }

  const handleRetry = () => {
    handleHide();
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <Card
        sx={{
          borderRadius: "1rem",
          backgroundColor: "var(--grisClaro)",
          padding: "16px 0px 8px 0px",
          margin: "auto 1rem",
          boxShadow: "none",
        }}
      >
        <Box sx={{ padding: "0 16px 16px 16px" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "1rem", fontSize: 18 }}>
              {title}
            </Typography>
            {isAdmin && (
              <IconButton
                onClick={handleClick}
                sx={{
                  width: 35,
                  height: 35,
                  color: open ? 'var(--blanco)' : 'inherit',
                  backgroundColor: open ? 'var(--azul)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'var(--azul)',
                    color: 'var(--blanco)',
                  },
                  borderRadius: '100%'
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{ '& .MuiPaper-root': { backgroundColor: 'var(--blanco)' } }}
            >
              <MenuItem onClick={handleEdit}>Editar</MenuItem>
              <MenuItem onClick={handleHide}>Ocultar</MenuItem>
            </Menu>
          </Box>
          <Box>
            <Carousel
              navButtonsAlwaysVisible
              NextIcon={<ArrowForwardIosIcon />}
              PrevIcon={<ArrowBackIosIcon />}
              navButtonsProps={{
                style: {
                  backgroundColor: "transparent",
                  borderRadius: 0,
                  padding: 0,
                  fontSize: ".3rem",
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
              sx={{ borderRadius: "1rem" }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  sx={{
                    width: "100%",
                    height: { xs: "140px", lg: "400px" },
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  src={image}
                  alt={`carousel image ${index + 1}`}
                />
              ))}
            </Carousel>
          </Box>
          <Typography variant="body2" sx={{ marginBottom: "8px", fontWeight: 600, fontSize: 14 }}>
            {date}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            {expanded ? description : truncatedText}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={handleToggle}
              sx={{ textTransform: "none", color: "var(--azul)", fontSize: 16, fontWeight: 500, padding: 0, marginTop: "1rem" }}
            >
              {expanded ? "Ver menos" : "Ver más"}
            </Button>
          </Box>
        </Box>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSuccess={isModalSuccess}
        title={modalTitle}
        onRetry={handleRetry}
      />
    </Box>
  );
};

export default PublicationCard;