
export const userInfoLogout = () =>{  
  localStorage.removeItem('user')  
  localStorage.removeItem('authToken')
}