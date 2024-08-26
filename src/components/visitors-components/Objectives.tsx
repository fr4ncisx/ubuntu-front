import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Objectives = () => {
    return (
        <Box style={{
            borderTop: '1.2px solid var(--verde)',
            borderBottom: '1.2px solid var(--verde)',
            margin: '3rem 1rem',
            padding: '1rem 0px 1rem 0px'
        }}>
            <Typography variant="h5" sx={{
                textAlign: 'center',
                color: 'var(--azul)',
                fontWeight: '700'
            }}>
                Objetivos de Ubuntu
            </Typography>
            <List style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <ListItem style={{ display: 'list-item' }}>
                    <ListItemText primary="Facilitar a productores o microemprendedores el acceso a microcréditos que les permitan desarrollar sus iniciativas empresariales." />
                </ListItem>
                <ListItem style={{ display: 'list-item' }}>
                    <ListItemText primary="Proporcionar financiación a empresas y organizaciones que ejecutan proyectos con objetivos sociales, ambientales y culturales." />
                </ListItem>
                <ListItem style={{ display: 'list-item' }}>
                    <ListItemText primary="Ofrecer a potenciales inversores la oportunidad de participar en proyectos con impacto significativo." />
                </ListItem>
            </List>
        </Box>
    );
}

export default Objectives;