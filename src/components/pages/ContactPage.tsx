import { Typography } from '@mui/material';
import Header from '../visitors-components/Header';
import ContactForm from '../visitors-components/ContactForm';
import { useEffect, useState } from 'react';

const ContactPage: React.FC = () => {
    const [microName, setMicroName] = useState<string>('');

    useEffect(() => {
        const name = localStorage.getItem('microName');
        if (name) {
            setMicroName(name);
        }
    }, []);

    return (
        <>
            <Header
                titulo="Contacto"
                descripcion="Contactanos para obtener información detallada sobre cómo podés invertir en un futuro más sostenible"
                imagen="https://res.cloudinary.com/dnf68vq7m/image/upload/v1723495104/y2mvlcvz8tqgezpodsku.jpg"
            />
            <Typography variant="h5"
                align="center"
                padding="2rem 1rem"
                fontSize="22px" fontWeight={500}>
                Por favor, completá el formulario. Nos comunicaremos en breve.
            </Typography>
            <Typography variant="h6"
                align='center'
                color="var(--azul)"
                fontWeight={600}>
                {microName}
            </Typography>
            <Typography variant="h6"
                fontSize={16}
                align='center'
                padding="1rem"
            >
                Vas a contactar a Ubuntu para recibir más información acerca del Microemprendimiento seleccionado.
            </Typography>
            <ContactForm />
        </>
    )
}

export default ContactPage;