import React, { useEffect, useState } from 'react'
import axiosConfig from '../../../scripts/axiosConfig'


function TopStatistics() {
  const [microFound, setMicroFound] = useState<number | undefined>();
  useEffect(() => {
    const fetch = async()=>{
      try{
    const token = localStorage.getItem('authToken')
    const response =  await axiosConfig.get('/micro/api/statistics/micro',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    } )
    if(response.status===200){
      setMicroFound(response.data.Found)
    }
  } catch(error){
    console.error(error);
    
  }}
  fetch()
  }, []);
  const [requestGest, setrequestGest] = useState<number | undefined>();
  const [requestUngest, setrequestUngest] = useState<number | undefined>();
  useEffect(() => {
    const fetch = async()=>{
      try{
    const token = localStorage.getItem('authToken')
    const response =  await axiosConfig.get('/contact/statistics/find',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    } )
    if(response.status===200){
      setrequestGest(response.data.Found.Reviewed)
      setrequestUngest(response.data.Found.Unreviewed)
    }
  } catch(error){
    console.error(error);
    
  }}
  fetch()
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      gap:'20px',
    }}>
      <div style={{
        height: '64px',
        minWidth: '328px',
        width: '90%',
        maxWidth:'500px',
        display: 'flex',
        backgroundColor: 'var(--azul)',
        borderRadius: '8px',
        alignItems:'center',
        textAlign:'start',
        justifyContent:'space-evenly',
        color:'var(--blanco)',
      }}><span style={{
        width:'225px',
        fontSize: '20px',
        lineHeight: '25px',
        fontWeight: '700',
      }}>Nuevos Emprendimientos</span>
        <span style={{
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: '700'
        }}>{microFound}</span></div>
      <div style={{
        display:'flex',
        minWidth: '328px',
        width: '90%',
        maxWidth:'500px',
        justifyContent:'space-between'
      }}>
        <div style={{
          border: '2px solid var(--exitoGestionada)',
          borderRadius: '8px',
          height: '72px',
          width: '152px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          textAlign:'start',
          gap:'10px',
          position:'relative'
        }}><span style={{
          marginLeft:'10px',
          fontSize: '18px',
          lineHeight: '25px',
          fontWeight: '400'
        }}>Gestionados</span>
                <div style={{
          width:'45px',
          borderBottom: '1px solid var(--exitoGestionada)',
          position:'absolute',
          left:'10px',
          top:'50%'
        }}></div>
        <span style={{
          marginLeft:'10px',
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: '700'
        }}>{requestGest}</span></div>
        <div style={{
          border: '2px solid var(--noGestionada)',
          borderRadius: '8px',
          height: '72px',
          width: '152px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          textAlign:'start',
          gap:'10px',
          position:'relative'
        }}><span style={{
          marginLeft:'10px',
          fontSize: '18px',
          lineHeight: '25px',
          fontWeight: '400'
        }}>No gestionados</span>
        <div style={{
          width:'45px',
          borderBottom: '1px solid var(--noGestionada)',
          position:'absolute',
          left:'10px',
          top:'50%'
        }}></div>
        <span style={{
          marginLeft:'10px',
          fontSize: '22px',
          lineHeight: '25px',
          fontWeight: '700'
        }}>{requestUngest}</span></div>
      </div>
    </div>
  )
}

export default TopStatistics