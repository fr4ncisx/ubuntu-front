import { useEffect, useMemo, useState } from 'react'
import backgroundmicroenterprises from '../../assets/images/backgroundmicroenterprises.webp'
import SearchBar from '../visitors-components/SearchBar/SearchBar'
import Categories from '../visitors-components/Categories'
import MicroentrepreneurshipCard from '../reusable-components/MicroentrepreneurshipCard'
import { useParams } from 'react-router'
import apiClient from '../../scripts/axiosConfig'

interface Microentrepreneurship {
  id: number;
  nombre: string;
  subcategoria: string;
  categoria: string;
  ciudad: string;
  provincia: string;
  pais: string;
  descripcion: string;
  masInformacion: string;
  imagenes: { url: string }[];
  mensajeDeContacto: string;
}

interface CategorySubinfo {
  [key: string]: [string, string];
}

const MicroentrepreneurshipPage = () => {
  const [microData, setMicroData] = useState<Microentrepreneurship[]>([]);
  const [_error, setError] = useState<string | null>(null);
  const { subcategory } = useParams<{ subcategory?: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  const categorySubinfoData: CategorySubinfo = useMemo(() => {
    return {
      agro: ['Agroecología/Orgánicos/Alimentación saludable', 'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.'],
      eco: ['Economía social/Desarrollo local/Inclusión financiera', 'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.'],
      cons: ['Conservación/Regeneración/Servicios ecosistémicos', 'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.'],
      emp: ['Empresas/Organismos de impacto/Economía circular', 'Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.'],
    };
  }, []);

  useEffect(() => {
    const fetchMicroentrepreneurships = async () => {
      setLoading(true);
      if (subcategory && categorySubinfoData[subcategory]) {
        const categoryName = categorySubinfoData[subcategory][0];
        try {
          const response = await apiClient.get(`/micro/find/category`, {
            params: { name: categoryName },
          });

          if (response.status === 200) {
            setMicroData(response.data);
            setError(null);
          } else if (response.status === 404) {
            setMicroData([]);
            setError('No hay microemprendimientos en esta categoría.');
          } else {
            setError('No se pudieron obtener los datos. Intente nuevamente más tarde.');
          }
        } catch (error) {
          setMicroData([]);
          setError('Error fetching data. Please try again later.');
        }
      } else {
        setMicroData([]);
        setError('Categoría no encontrada.');
      }

      setLoading(false);
    };

    fetchMicroentrepreneurships();
  }, [subcategory, categorySubinfoData]);


  return (
    <div className='me-body' style={{
      height: 'inherit'
    }}>
      <div className="me-info" style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}>
        <SearchBar color='--blanco' position='absolute' type='microemprendimientos' top='0'/>
        <div className="" style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>

        </div>
        <div className="me-info_text" style={{
          color: 'var(--blanco)',
          padding: '25px',
          width: '50%',
          minWidth: '240px',
        }}>
          <h2 style={{
            margin: '0',
            fontSize: '18px',
            marginTop: '25px',
            fontWeight: 600,
            lineHeight: '24px',

          }}>MICROEMPRENDIMIENTOS</h2>
          <h4 style={{
            margin: '0',
            fontSize: '28px',
            marginTop: '15px',
            fontWeight: 500,
            lineHeight: '30px',
          }}>Invertí sostenible</h4>
          <p style={{
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: '32px',
            marginTop: '15px',
          }}>Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras</p>
        </div>
        <div className="me-info_image" style={{
          position: 'absolute',
          width: 'inherit',
          height: 'inherit',
          top: '0',
          zIndex: '-1',
        }}>
          <img src={backgroundmicroenterprises} alt="Emprendimiento, mujer" style={{
            objectFit: 'cover',
            width: 'inherit',
            height: 'inherit',
          }} />
        </div>
      </div>
      {subcategory === undefined ? (
        <Categories />
      ) : (
        <div className="" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '48px',
        }}>
          <h2 style={{
            width: '50%',
            minWidth: '328px',
            margin: 0,
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '25px',
            textAlign: 'center'

          }}>Categorías</h2>
          <h4 style={{
            width: '50%',
            minWidth: '328px',
            fontWeight: '500',
            color: 'var(--azul)',
            fontSize: '20px',
            lineHeight: '30px',
            textAlign: 'center'
          }}>
            {categorySubinfoData[subcategory]?.[0]}
          </h4>
          <p style={{
            width: '50%',
            minWidth: '328px',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '25px',
            textAlign: 'center'
          }}>{categorySubinfoData[subcategory]?.[1]}</p>

          <div className="" style={{
            marginTop: '45px',
            width: '100%'
          }}>
            {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 500 }}>Cargando...</p>
          ) :
            microData.length > 0 ? (
              microData.map((micro, index) => (
                <MicroentrepreneurshipCard
                  key={index}
                  id={micro.id}
                  nombre={micro.nombre}
                  subcategoria={micro.subcategoria}
                  categoria={categorySubinfoData[subcategory]?.[0]}
                  ciudad={micro.ciudad}
                  provincia={micro.provincia}
                  pais={micro.pais}
                  descripcion={micro.descripcion}
                  masInformacion={micro.masInformacion}
                  imagenes={micro.imagenes} 
                  mensajeDeContacto={''}
                  />
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 500 }}>No hay microemprendimientos en esta categoría.</p>
            )}
          </div>
        </div>
      )}


    </div>
  )
}

export default MicroentrepreneurshipPage