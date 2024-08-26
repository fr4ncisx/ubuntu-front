import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import '../../../styles/searchBar.css'

type Position = 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static';

interface SearchBarProps {
  color: string;
  position: Position;
  type: 'microemprendimientos' | 'publicaciones'; 
  top?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ color, position, type, top }) => {
  const [searchInfo, setSearchInfo] = useState<string | null>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInfo(e.target.value);
  }

  const handleClick = () => {
    if (type === 'microemprendimientos') {
      navigate(`/search/microentrepreneaurship/${searchInfo}`);
    } else {
      navigate(`/search/publications/${searchInfo}`);
    }
  }

  const handleKey = (e:React.KeyboardEvent<HTMLInputElement>) =>{
  if(e.key==="Enter"){
    handleClick();
  }
  } 

  return (
    <div style={{
      position: `${position}`,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      marginTop:'60px',
      top: `${top}`,
      zIndex: 1
    }}>
      <div className='searchBar-container' style={{
        minWidth: '328px',
        width: '80vw',
        height: '56px'
      }}>
        <div className="searchBar" style={{
          height: 'inherit',
          width: '100%',
          borderRadius: '100px',
          display: 'flex'
        }}>
          <Button onClick={handleClick} className="searchBar-iconContainer" style={{
            height: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '100px 0 0 100px',
            alignItems: 'center',
            minWidth:'80px',
            backgroundColor: `var(${color})`,
            width:'8%',
          }}>
            <SearchIcon style={{
              height: '24px',
              width: '24px',
              fill: 'var(--negro)'
            }} />
          </Button>
          <div className="searchBar-input-container" style={{
            flexBasis: '100%',
            borderRadius: '0 100px 100px 0',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: `var(${color})`
          }}>
            <input autoComplete='off' onChange={handleChange} 
            className='searchBar-input' name='search' 
            placeholder={type === 'microemprendimientos' ? 'Buscar Microemprendimientos' : 'Buscar Publicaciones'} 
            type="text" 
            onKeyDown={handleKey}
            style={{
              padding:'0',
              borderRadius: '0 100px 100px 0',
              width: '100%',
              height: 'inherit',
              lineHeight: '24px',
              fontSize: '16px',
              fontWeight: '400',
              backgroundColor: `var(${color})`,
              border: 'none'
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar