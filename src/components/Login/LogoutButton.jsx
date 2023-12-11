import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


export default function LogoutButton({ onLogout }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/logout')
    if (res.data.success) {
      dispatch({type:"logout"})
      navigate('/')
    }
  }
  
  return (

      <Nav onClick={handleLogout}>Log Out</Nav>
  );
}

