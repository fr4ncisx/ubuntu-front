import React, { FC } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
interface contactCardInterface{
  fecha:string,
  gest:boolean,
  nombre:string,
  id:number
}

const ContactCard: FC<contactCardInterface> = function ({gest, fecha, nombre,id}) {

  return (
    <article style={{
      width: '328px',
      height: '88px',
      backgroundColor: 'var(--grisClaro)',
      borderRadius: '8px',
      marginBottom:'15px'
    }}>
      <div style={{
        display: 'flex',
        height: 'inherit',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          width: '280px',
          height: '64px'
        }}>
          <div style={{
            display: 'flex',
            width: 'inherit',
            alignItems:'start',
            height: '50%'
          }}>
            <div style={{
              height: '16px',
              width: '16px',
              borderRadius: '100%',
              transition:'1s',
              backgroundColor: gest ? 'var(--noGestionada)': 'var(--exitoGestionada)'
            }}></div>
            <span style={{
              fontSize:'18px',
              fontWeight:'600',
              lineHeight:'18px',
              marginLeft:'5px',
              color:'var(--azul)'
            }}>{nombre}</span>
          </div>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '1px',
            backgroundColor: 'var(--azul)',
            left: '0',
            top: '50%'
          }}></div>
          <div style={{
            display: 'flex',
            width: 'inherit',
            height: '50%',
            alignItems:'end'
          }}>
            <time style={{
              fontWeight:'400',
              fontSize:'16px',
              lineHeight:'24px'
            }} dateTime={`${fecha}`}>{fecha}</time>
          </div>
        </div>
        <Link style={{
          backgroundColor:'transparent',
          height: '24px',
          color: 'var(--negro)',
          border:'none',
          width:'24px'
        }} to={`/admin/dashboard/contact/${id}`} ><ArrowForwardIosIcon /></Link>
      </div>
    </article>
  )
}

export default ContactCard