import { useEffect, useState } from 'react';
import ContactCard from '../admin-components/ContactCard';
import ContactInfo from '../admin-components/ContactInfo';
import { useNavigate, useParams } from 'react-router';

import axios from 'axios';

interface Microemprendimiento {
  id: number;
  nombre: string;
}

interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fecha_solicitud: string;
  mensaje: string;
  microemprendimiento: Microemprendimiento;
}

function ContactRequestPage() {
  const {id } = useParams()
  const [gestionado, setGestionado] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>()
  const navigate = useNavigate()
  useEffect(() => {

    if(id===null || id === undefined){
    const gestFetch = async() =>{
      setIsLoading(true)
      try{
      if(gestionado){
        const response = await axios.get('https://ubuntu.koyeb.app/contact/unreviewed', {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        if(response.status===200){
          setSolicitudes(response.data)
        }else if(response===null){
          setSolicitudes([])
        }
      }else{
        const response = await axios.get('https://ubuntu.koyeb.app/contact/reviewed', {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        if(response.status===200){
          setSolicitudes(response.data)
        }else if(response===null){
          setSolicitudes([])
          setIsLoading(false);
        }
      }
    }catch(error){
      setSolicitudes([])
      setIsLoading(false);
      console.error(error)
    }finally{
      setIsLoading(false)
    }
    }
    gestFetch()
  }else{
    setSolicitudes([])
  }
  }, [gestionado, id]);
  const handleGestTrue = () =>{
    setSolicitudes([])
    setGestionado(true)
    navigate('/admin/dashboard/contact')
  }
  const handleGestFalse = () =>{
    setSolicitudes([])
    setGestionado(false)
    navigate('/admin/dashboard/contact')
  }
  const handleGestInfoFalse = () =>{
    setSolicitudes([])
    setGestionado(false)
  }
  const handleGestInfoTrue = () =>{
    setSolicitudes([])
    setGestionado(true)
  }
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 'inherit'
    }}>
      <div>
        <h1 style={{
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '35px',
        }}>Solicitudes de contacto</h1>
      </div>

      <section style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}>
        <div style={{
          display: 'flex',
          borderBottom: 'solid 1px var(--azul)',
          position: 'relative',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '108px',
            height: '2px',
            backgroundColor: 'var(--azul)',
            zIndex: '100',
            position: 'absolute',
            bottom: 0,
            left: gestionado ? '28px' : '194px',
            borderRadius: '100px 100px 0 0 ',
            transition: '0.5s ease'
          }}></div>
          <button onClick={handleGestTrue} style={{
            border: 'none',
            backgroundColor: 'var(--blanco)',
            width: '164px',
            height: '48px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '20px'
            }}>No gestionadas</h2>
          </button>
          <button onClick={handleGestFalse} style={{
            border: 'none',
            width: '164px',
            backgroundColor: 'var(--blanco)',
            height: '48px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '20px'
            }}>Gestionadas</h2>
          </button>
        </div>
      {id !== null && id !== undefined && (
        <ContactInfo gestFalse={handleGestInfoFalse} gestTrue={handleGestInfoTrue} />
      )}

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        solicitudes && solicitudes.map(solicitud => (
          <ContactCard
            key={solicitud.id}
            id={solicitud.id}
            nombre={solicitud.microemprendimiento.nombre}
            fecha={solicitud.fecha_solicitud}
            gest={gestionado}
          />
        ))
      )}
      </section>
    </main>
  );
}

export default ContactRequestPage;
