import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface HeaderProps {
    titulo: string;
    descripcion: string;
    imagen: string;
}

const Header: React.FC<HeaderProps> = ({ titulo, descripcion, imagen }) => {
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh'
        }}>
            <img
                src={imagen}
                alt={imagen}
                style={{
                    width: '100%',
                    height: 'inherit',
                    objectFit: 'cover'
                }}
            />
            <Box sx={{
                position: 'absolute',
                top: '64px',
                left: 0,
                width: '100%',
                height: 'inherit',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                pointerEvents: 'none'
            }} />
            <Box sx={{
                position: 'absolute',
                top: 64,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                color: '#fff'
            }}>
                <Typography variant="h1" sx={{ fontWeight: 600, fontSize: 18, lineHeight: '33px', textTransform: 'uppercase', padding: '0 16px', marginBottom: '16px', }}>
                    {titulo}
                </Typography>
                <Typography variant="body1" sx={{ width: '70%', fontSize: 28, maxWidth: '800px', padding: '0 16px' }}>
                    {descripcion}
                </Typography>
            </Box>
        </Box>
    );
}

export default Header;