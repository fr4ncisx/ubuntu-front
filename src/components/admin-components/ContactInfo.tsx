import { FC, useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useNavigate, useParams } from 'react-router';
import apiClient from "../../scripts/axiosConfig";
import Modal from '../visitors-components/Modal';


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
  gestionado: boolean;
  microemprendimiento: Microemprendimiento;
}


interface ContactInfoInterface {
  gestFalse: () => void;
  gestTrue: () => void;
}

const ContactInfo: FC<ContactInfoInterface> = function ({gestFalse, gestTrue}) {
  const [menu, setMenu] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const [solicitud, setSolicitud] = useState<Solicitud>()
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] =useState<boolean>(false)
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {

    const gestFetch = async () => {
      try {
        if (id !== undefined) {
          const idIndex = parseInt(id, 10)
          const response = await apiClient.get("/contact/find", {
            params: {
              id: idIndex
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          })
          if (response.status === 200) {
            setSolicitud(response.data)
          }
        }else{
          setSolicitud(undefined)
        }
      } catch (error) {
        setSolicitud(undefined)
        console.error(error)
      } finally {
        setLoading(false);
      }
    }
    gestFetch()
  }, [id]);
  
  useEffect(() => {
    solicitud?.gestionado? gestFalse() :  gestTrue()
  }, [solicitud?.gestionado]);
  const handleClick = () => {
    setMenu(!menu)
  }
  const handleGest = async() => {
    
    try{
      const response = await apiClient.put("/contact/update", {}, {
        params: {
          id: solicitud?.id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
    if(response.status===200){
      navigate(`/admin/dashboard/contact/${solicitud?.id}`)
      if(solicitud?.gestionado!==undefined)solicitud.gestionado = true
      setModalSuccess(true)
      setModal(true)

    }
  }catch(error){
    setModalSuccess(false)
    setModal(true)
    console.error(error)
  }
  }
  return (
    <>
      {loading ? (<div>Cargando...</div>) :( 
      <>  
      <Modal description={modalSuccess?'':'Por favor, volvé a intentarlo.'} onRetry={handleGest} isOpen={modal} onClose={()=>{setModal(false)}} isSuccess={modalSuccess} title={modalSuccess?'Estado modificado con éxito':'Lo sentimos, el Estado no pudo ser modificado.'}></Modal>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px',
        }} >
          <div style={{
            height: '24px',
            width: '24px',
            borderRadius: '100%',
            backgroundColor: !solicitud?.gestionado ? 'var(--noGestionada)' : 'var(--exitoGestionada)',
            marginRight: '5px'
          }}></div>
          <h2 style={{
            margin: '0px',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '24px'
          }}>{!solicitud?.gestionado ? 'No gestionada' : 'Gestionada'}</h2>
        </div>


        {!solicitud?.gestionado  ?
        <div style={{
          width: '152px',
          height: '88px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '70%'
        }}>
          <div onClick={handleClick} style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '40px',
            backgroundColor: 'var(--grisClaro)',
            borderRadius: '4px',
          }}><span style={{
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px',
          }}>Estado</span><ArrowDropDownIcon /></div>
          {menu &&
            <button onClick={handleGest} style={{
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '1px solid var(--negro)',
              borderRight: 'none',        /* Elimina el borde en la parte derecha */
              borderLeft: 'none',
              borderBottom: 'none',
              backgroundColor: 'var(--grisClaro)',
              borderRadius: '0 0 4px 4px',

            }}>
              <div style={{
                height: '16px',
                width: '16px',
                borderRadius: '100%',
                backgroundColor: 'var(--exitoGestionada)',
                marginRight: '5px'
              }}></div>
              <span style={{
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
              }}>Gestionada</span></button>
            }
        </div> : null}
      <h2 style={{
        margin: '0',
        fontWeight: '700',
        fontSize: '22px',
        lineHeight: '24px',
        marginBottom: '15px',
      }}>EcoSenda</h2>
      <span style={{
        fontSize: '16px',
        marginBottom: '15px',
      }}>Fecha de solicitud: <span>{solicitud?.fecha_solicitud}</span></span>
      <div style={{
        height: '56px',
        width: '328px',
        position: 'relative',
        marginTop: '25px'
      }}>
        <label style={{
          backgroundColor: 'var(--blanco)',
          position: 'absolute',
          left: '15px',
          top: '-12px',
          padding: '0 10px',
          color: 'var(--azul)'
        }} htmlFor="nombre y apellido">Apellido y Nombre</label>
        <input readOnly name='nombre y apellido' value={solicitud?.nombre} type="text" style={{
          height: 'inherit',
          width: 'inherit',
          border: '1px solid var(--negro)',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '400',
          padding: '0 10px'
        }} />
      </div>

      <div style={{
        height: '56px',
        width: '328px',
        position: 'relative',
        marginTop: '25px'
      }}>
        <label style={{
          backgroundColor: 'var(--blanco)',
          position: 'absolute',
          left: '15px',
          top: '-12px',
          padding: '0 10px',
          color: 'var(--azul)'
        }} htmlFor="correo electronico">Correo Electrónico</label>
        <input readOnly name='correo electronico' value={solicitud?.email} type="text" style={{
          height: 'inherit',
          width: 'inherit',
          border: '1px solid var(--negro)',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '400',
          padding: '0 10px'
        }} />
      </div>

      <div style={{
        height: '56px',
        width: '328px',
        position: 'relative',
        marginTop: '25px',
      }}>
        <label style={{
          backgroundColor: 'var(--blanco)',
          position: 'absolute',
          left: '15px',
          top: '-12px',
          padding: '0 10px',
          color: 'var(--azul)'
        }} htmlFor="telefono">Teléfono</label>
        <input readOnly name='telefono' value={solicitud?.telefono} type="text" style={{
          height: 'inherit',
          width: 'inherit',
          border: '1px solid var(--negro)',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '400',
          padding: '0 10px'
        }} />
      </div>

      <div style={{
        height: '200px',
        width: '328px',
        position: 'relative',
        marginTop: '25px'
      }}>
        <label style={{
          backgroundColor: 'var(--blanco)',
          position: 'absolute',
          left: '15px',
          top: '-12px',
          padding: '0 10px',
          color: 'var(--azul)'
        }} htmlFor="mensaje">Mensaje</label>
        <textarea readOnly value={solicitud?.mensaje} maxLength={300} name='mensaje' style={{
          height: 'inherit',
          width: 'inherit',
          border: '1px solid var(--negro)',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '400',
          padding: '15px 10px',
          resize: 'none',
          fontFamily: 'Lato'
        }} />
      </div>
      </>
    )
    }
    </>
  )
}

export default ContactInfo