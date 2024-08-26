import { Modal as ModalComponent, Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    isSuccess: boolean;
    title: string;
    description?: string;
    onRetry?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    isSuccess,
    title,
    description,
    onRetry,
}) => {
    const Icon = isSuccess ? CheckCircleOutlineIcon : HighlightOffIcon;
    const buttonText = isSuccess ? 'Aceptar' : 'Cerrar';
    const retryButton = !isSuccess && onRetry ? (
        <Button onClick={onRetry} variant="text" sx={{ mt: 2, textTransform: 'none' }}>
            Intentar nuevamente
        </Button>
    ) : null;

    return (
        <ModalComponent
            open={isOpen}
            onClose={onClose}
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
                    <Icon sx={{ color: isSuccess ? 'green' : 'red', fontSize: '70px' }} />
                </Box>
                <Typography id="modal-title" variant="h5" component="h2" fontWeight={500} sx={{ textAlign: 'center', }}>
                    {title}
                </Typography>
                <Typography id="modal-description" variant="h6" sx={{ mt: 2, textAlign: 'left' }}>
                    {description}
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                    {retryButton}
                    <Button onClick={onClose} variant="text" sx={{ mt: 2, textTransform: 'none' }}>
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </ModalComponent>
    );
};

export default Modal;