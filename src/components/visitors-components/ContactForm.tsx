import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import apiClient from '../../scripts/axiosConfig';
import Modal from './Modal';
import { useNavigate } from 'react-router';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        apellido_nombre: '',
        correo_electronico: '',
        numero_telefono: '',
        mensaje_contacto: ''
    });
    const [errors, setErrors] = useState({
        apellido_nombre: '',
        correo_electronico: '',
        numero_telefono: '',
        mensaje_contacto: ''
    });
    const [charCount, setCharCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const navigate = useNavigate()

    const validateApellidoNombre = (value: string) => {
        if (!value) {
            setErrors(prev => ({ ...prev, apellido_nombre: 'El apellido y nombre es obligatorio' }));
        } else {
            setErrors(prev => ({ ...prev, apellido_nombre: '' }));
        }
    };

    const validateCorreoElectronico = (value: string) => {
        const isValid = /\S+@\S+\.\S+/.test(value);
        if (!isValid) {
            setErrors(prev => ({ ...prev, correo_electronico: 'Correo electrónico inválido' }));
        } else {
            setErrors(prev => ({ ...prev, correo_electronico: '' }));
        }
    };
    
    const validateNumeroTelefono = (value: string) => {
        if (!value.startsWith('+') || value.length > 25) {
            setErrors(prev => ({ ...prev, numero_telefono: 'El teléfono debe comenzar con + y no superar los 25 caracteres' }));
        } else {
            setErrors(prev => ({ ...prev, numero_telefono: '' }));
        }
    };
    
    const formatPhoneNumber = (phoneNumber: string) => {
        const parts = phoneNumber.replace(/\D/g, '').match(/(\+\d{2})(\d{1})(\d{3})(\d{3})(\d{3})/);
        return parts ? `${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]} ${parts[5]}` : phoneNumber;
    };

    const validateMensajeContacto = (value: string) => {
        if (value.length > 300) {
            setErrors(prev => ({ ...prev, mensaje_contacto: 'El mensaje no puede exceder los 300 caracteres' }));
        } else if (!value) {
            setErrors(prev => ({ ...prev, mensaje_contacto: 'El mensaje es obligatorio' }));
        } else {
            setErrors(prev => ({ ...prev, mensaje_contacto: '' }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    
        if (name === 'apellido_nombre') validateApellidoNombre(value);
        if (name === 'correo_electronico') validateCorreoElectronico(value);
        if (name === 'numero_telefono') validateNumeroTelefono(value);
        if (name === 'mensaje_contacto') validateMensajeContacto(value);
    
        if (name === 'mensaje_contacto') {
            setCharCount(value.length);
        }
    };


    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        await submitForm();
    };
    
    const submitForm = async () => {
        setIsSubmitting(true);
    
        const formattedPhoneNumber = formatPhoneNumber(formData.numero_telefono);
    
        const payload = {
            ...formData,
            numero_telefono: formattedPhoneNumber,
        };
    
        const id = localStorage.getItem('microID');
    
        try {
            const response = await apiClient.post(`/contact/new-request?id=${id}`, payload);
            console.log('Response:', response.data);
            setIsSuccess(true);
            setModalTitle('Formulario enviado con éxito');
            setModalDescription('Gracias por contactarnos, nos comunicaremos en breve');
        } catch (error) {
            setIsSuccess(false);
            setModalTitle('Lo sentimos, el formulario no pudo ser enviado');
            setModalDescription('Por favor, volvé a intentarlo');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
            setModalOpen(true);
        }
    };
    
    const handleRetry = async () => {
        setModalOpen(false);
        setIsSubmitting(false);
    };
    

    const handleCloseModal = () => {
        navigate('/')
        setModalOpen(false);
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error !== '') || Object.values(formData).some(field => field === '');
        setIsButtonDisabled(hasErrors);
    }, [errors, formData]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('microID');
            localStorage.removeItem('microName')
        };
    }, []);

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '0 auto', padding: 2 }}>
                <TextField
                    label="Apellido y Nombre"
                    name="apellido_nombre"
                    value={formData.apellido_nombre}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.apellido_nombre}
                    helperText={errors.apellido_nombre ? (
                        <Typography sx={{ color: 'var(--error)', fontSize: 13 }}>
                            {errors.apellido_nombre}
                        </Typography>
                    ) : (
                        <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>
                            Campo obligatorio
                        </Typography>
                    )}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: errors.apellido_nombre ? 'var(--error)' : 'var(--azul)',
                            },
                        },
                    }}
                />
                <TextField
                    label="Correo Electrónico"
                    name="correo_electronico"
                    type="email"
                    value={formData.correo_electronico}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.correo_electronico}
                    helperText={errors.correo_electronico ? (
                        <Typography sx={{ color: 'var(--error)', fontSize: 13 }}>
                            {errors.correo_electronico}
                        </Typography>
                    ) : (
                        <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>
                            Campo obligatorio
                        </Typography>
                    )}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: errors.correo_electronico ? 'var(--error)' : 'var(--azul)',
                            },
                        },
                    }}
                />
                <TextField
                    label="Teléfono"
                    name="numero_telefono"
                    value={formData.numero_telefono}
                    onChange={handleChange}
                    fullWidth
                    required
                    helperText={errors.numero_telefono ? (
                        <Typography sx={{ color: 'var(--error)', fontSize: 13 }}>
                            {errors.numero_telefono}
                        </Typography>
                    ) : (
                        <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>
                            Con el siguiente formato +54 9 261 002 002
                        </Typography>
                    )}
                    error={!!errors.numero_telefono}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: errors.numero_telefono ? 'var(--error)' : 'var(--azul)',
                            },
                        },
                    }}
                    type="text"
                />
                <TextField
                    label="Mensaje"
                    name="mensaje_contacto"
                    value={formData.mensaje_contacto}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={!!errors.mensaje_contacto}
                    helperText={
                        errors.mensaje_contacto ? (
                            <Box sx={{ color: 'var(--error)', fontSize: 13 }}>
                                {errors.mensaje_contacto}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>Máximo 300 caracteres</Typography>
                                <Typography sx={{ color: 'var(--negro)', fontSize: 13 }}>{charCount}/300</Typography>
                            </Box>
                        )
                    }
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: errors.mensaje_contacto ? 'var(--error)' : 'var(--azul)',
                            },
                        },
                    }}
                />
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    loadingPosition="start"
                    sx={{
                        backgroundColor: isButtonDisabled ? 'var(--grisOscuro)' : 'var(--azul)',
                        '&:disabled': {
                            backgroundColor: 'var(--grisOscuro)',
                        },
                        borderRadius: '100px',
                        textTransform: 'none',
                    }}
                    disabled={isButtonDisabled}
                >
                    <Typography color="var(--blanco)">{isSubmitting ? 'Enviando...' : 'Enviar'}</Typography>
                </LoadingButton>
            </Box>
            <Modal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                isSuccess={isSuccess}
                title={modalTitle}
                description={modalDescription}
                onRetry={handleRetry}
            />
        </>
    )
};

export default ContactForm;