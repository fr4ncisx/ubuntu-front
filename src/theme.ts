import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Lato, sans-serif",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: 'var(--negro)',
                        '&.Mui-focused': {
                            color: 'var(--azul)'
                        }
                    },
                    '& .MuiInputBase-root': {
                        color: 'var(--negro)'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--negro)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--azul)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--azul)'
                        },
                    }
                }
            }
        }
    }
});

export default theme;