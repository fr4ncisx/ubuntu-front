import { useState, useRef, useEffect } from "react";
import { Box, Button, TextField, Typography, CircularProgress, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import apiClient from "../../scripts/axiosConfig";
import Modal from "../visitors-components/Modal";
import { useNavigate, useParams } from "react-router";

interface CreatePublicationProps {
  isEdit?: boolean;
}

const CreatePublication: React.FC<CreatePublicationProps> = ({ isEdit = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const charCount = content.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [isModalSuccess, setIsSuccess] = useState(false);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const { id } = useParams();

  const validateTitle = (value: string) => {
    const isNumeric = /^\d+$/.test(value);
    if (isNumeric) {
      setTitleError('El título no puede contener solo números');
    } else if (!value) {
      setTitleError('El título es obligatorio');
    } else {
      setTitleError('');
    }
  };

  const validateContent = (value: string) => {
    if (value.length > 2000) {
      setContentError('El contenido no puede exceder los 2000 caracteres');
    } else if (!value) {
      setContentError('El contenido es obligatorio');
    }
    else {
      setContentError('');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    validateTitle(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);
    validateContent(value);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setShowSpinner(true);
      const largeFiles = Array.from(files).filter(file => file.size > 3 * 1024 * 1024);
      if (largeFiles.length > 0) {
        setModalTitle('Imagen demasiado pesada');
        setModalDescription('La imagen excede el tamaño máximo de 3MB. Por favor, seleccioná otra imagen.');
        setIsModalOpen(true);
      } else {
        try {
          const formData = new FormData();
          Array.from(files).forEach((file) => {
            formData.append('images', file);
          });

          const response = await apiClient.post('/api/cloudinary/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });

          const urls = Object.values(response.data) as string[];
          setImageUrls([...imageUrls, ...urls].slice(0, 3));
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          setModalTitle('Error');
          setModalDescription('La imagen no se pudo subir. Inténtalo nuevamente.');
          setIsModalOpen(true);
        } finally {
          setShowSpinner(false);
        }
      }
    }
  };

  const handleDeleteImage = async (index: number) => {
    try {
      const publicId = `ubuntu/${imageUrls[index].split('/').pop()?.split('.')[0] || ''}`;
      await apiClient.post(`/api/cloudinary/delete?public_id=${publicId}`);
      const updatedImages = imageUrls.filter((_, i) => i !== index);
      setImageUrls(updatedImages);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      setModalTitle('Error');
      setModalDescription('La imagen no se pudo eliminar. Intentalo nuevamente.');
      setIsModalOpen(true);
    }
  };

  const handleEditImage = (index: number) => {
    const inputElement = fileInputRef.current;

    if (inputElement) {
      inputElement.click();

      inputElement.onchange = async (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          try {
            const formData = new FormData();
            formData.append('image', file);

            const publicId = `ubuntu/${imageUrls[index].split('/').pop()?.split('.')[0] || ''}`;

            console.log("FormData a enviar para editar:", formData);
            console.log("Public ID para editar:", publicId);

            const response = await apiClient.post(`/api/cloudinary/edit?public_id=${encodeURIComponent(publicId)}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              },
            });

            console.log("Respuesta de la API al editar imagen:", response.data);

            const updatedImages = [...imageUrls];
            updatedImages[index] = response.data.newImageUrl;
            setImageUrls(updatedImages);
          } catch (error) {
            console.error('Error al editar la imagen:', error);
            setModalTitle('Error');
            setModalDescription('La imagen no se pudo editar. Inténtalo nuevamente.');
            setIsModalOpen(true);
          }
        }
      };
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (titleError || contentError || imageUrls.length === 0) {
      return;
    }
    setLoading(true);
    try {
      const requestBody = {
        title,
        description: content,
        imagenes: imageUrls.map(url => ({ url })),
      };

      console.log(isEdit ? "Cuerpo de la solicitud al editar publicación:" : "Cuerpo de la solicitud al crear publicación:", requestBody);

      if (isEdit && id) {
        await apiClient.put(`/publications/edit/${id}`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setModalTitle('Cambios guardados con éxito');
        setIsSuccess(true);
        setIsModalOpen(true);
      } else {
        await apiClient.post('/publications/create', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setModalTitle('Publicación creada con éxito');
        setIsSuccess(true);
        setIsModalOpen(true);
      }

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/admin/publications");
      }, 2000);
    } catch (error) {
      console.error(isEdit ? 'Error al editar la publicación:' : 'Error al crear la publicación:', error);
      setModalTitle(isEdit ? 'Lo sentimos, los cambios no pudieron ser guardados' : 'Lo sentimos, la publicación no pudo ser creada');
      setModalDescription('Por favor, volvé a intentarlo');
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    handleSubmit();
  };

  useEffect(() => {
    if (id) {
      apiClient.get(`/publications/find?id=${id}`)
        .then(response => {
          const { title, description, imagenes } = response.data;
          setTitle(title);
          setContent(description);
          setImageUrls(imagenes.map((img: { url: string }) => img.url));
        })
        .catch(error => {
          console.error('Error al cargar la publicación:', error);
          setModalTitle('Error');
          setModalDescription('No se pudo cargar la publicación. Intente nuevamente.');
          setIsSuccess(false);
          setIsModalOpen(true);
        });
    }
  }, [id]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h1" fontSize={28} fontWeight={"600"} padding={"1.5rem"}>{id ? "Editar publicación" : "Carga de publicación"}</Typography>
      <Typography variant="h6" padding={"1.5rem"}>{id ? "Modificá los datos para editar la publicación" : "Completá los datos para crear una nueva publicación"}</Typography>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
        <TextField
          fullWidth
          label="Título*"
          value={title}
          onChange={handleTitleChange}
          helperText={titleError ? <Typography sx={{ color: 'var(--error)', fontSize: 13 }}>{titleError}</Typography> : <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>Se visualizará en el título de la publicación </Typography>}
          margin="normal"
          variant="outlined"
          inputProps={{ maxLength: 100 }}
          sx={{
            borderColor: titleError ? 'var(--error)' : 'inherit',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: titleError ? 'var(--error)' : 'var(--azul)',
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Contenido de la publicación*"
          value={content}
          onChange={handleContentChange}
          helperText={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: contentError ? 'var(--error)' : 'var(--negro)', fontSize: 13 }}>{contentError ? contentError : 'Máximo 2000 caracteres'}</Typography>
              <Typography sx={{ color: contentError ? 'var(--error)' : 'var(--negro)', fontSize: 13 }}>{charCount}/2000</Typography>
            </Box>
          }
          margin="normal"
          variant="outlined"
          multiline
          rows={8}
          inputProps={{ maxLength: 2000 }}
          sx={{
            borderColor: contentError ? 'var(--error)' : 'inherit',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: contentError ? 'var(--error)' : 'var(--azul)',
              },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Box sx={{ width: "90%", maxWidth: "600px", position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
              startIcon={<FileUploadOutlinedIcon sx={{ width: "24px", height: "24px" }} />}
              sx={{
                backgroundColor: imageUrls.length >= 3 ? "var(--grisOscuro) !important" : "var(--azul)",
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
              disabled={imageUrls.length >= 3}
            >
              Subir imagen
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                marginTop: "56px",
                marginLeft: "50%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                paddingRight: "8px",
                width: "152px",
                height: "64px",
                paddingBottom: "2rem",
              }}
            >
              <Typography variant="body2" sx={{ color: "var(--negro)", textAlign: "left" }}>
                *Requerida al menos una imagen
                <br />
                Hasta 3 imágenes. Máximo 3MB cada una
              </Typography>
            </Box>
            {showSpinner && (
              <CircularProgress
                style={{
                  color: "var(--verde)",
                  marginTop: 24,
                }}
              />
            )}
          </Box>
        </Box>

        {/* previsualización de imágenes */}
        {imageUrls.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 4,
            }}
          >
            {imageUrls.map((url, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "140px", lg: "400px" },
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
                  onClick={() => handleEditImage(index)}
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
                  <EditOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 40,
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

        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          loading={loading}
          loadingIndicator={<CircularProgress size={24} />}
          sx={{
            width: "90%",
            maxWidth: "600px",
            height: "40px",
            borderRadius: "100px",
            boxShadow: "none",
            textTransform: "none",
            gap: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "var(--blanco)",
            backgroundColor: "var(--azul)",
            marginTop: 3,
            marginBottom: 3,
          }}
          disabled={title === '' || content === '' || imageUrls.length === 0}
        >
          {id ? "Actualizar Publicación" : "Crear Publicación"}
        </LoadingButton>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSuccess={isModalSuccess}
        title={modalTitle}
        description={modalDescription}
        onRetry={handleRetry}
      />
    </Box>
  );
}

export default CreatePublication;