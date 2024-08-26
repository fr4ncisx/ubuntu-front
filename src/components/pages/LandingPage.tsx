
import Header from '../visitors-components/Header';
import Objectives from '../visitors-components/Objectives';
import Categories from '../visitors-components/Categories';
import Publications from '../visitors-components/Publications';
import Imagen from '../../assets/images/header.jpeg';
import SearchBar from '../visitors-components/SearchBar/SearchBar';

const LandingPage = () => {
    return (
        <>
            <Header 
                titulo="Financiamiento Sostenible"
                descripcion="Impulsamos el desarrollo de finanzas de impacto, liderando la transición hacia un modelo financiero sostenible"
                imagen={Imagen}
            />
            <SearchBar color="--blanco" position="absolute" type="microemprendimientos" top='64px'/>
            <Objectives />
            <Categories />
            <Publications />
        </>
    );
}

export default LandingPage;