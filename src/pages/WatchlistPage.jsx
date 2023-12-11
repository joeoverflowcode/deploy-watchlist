import Hero from '../components/Hero/Hero.jsx'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Watchlist from "../components/charts/watchList.jsx"
import { Button } from "react-bootstrap"
import {Container} from "react-bootstrap"
import upArrow from '../../assets/upArrow.jpg'
export default function UserProfilePage() {

  
  const navigate = useNavigate()
    
  const handleAddMoreStock = () => {
    navigate('/me')
  } 


    const handleLogout = async (event) => {
      event.preventDefault()
      const res = await axios.post('/api/logout')
      if (res.data.success) {
        navigate('/')
      }
    }

  return (

    <>
  <Container fluid className='text-center bg-light'>


    <Hero
      timeStamp="Keep Track Of Your Watchlist"
      watchList="The price of stock changes every business day that the stock market is open. Check back in using your login credentials to add, remove and monitor your watchlist."
      />
    
    
    <img className='upArrow' src={upArrow} />
    
    <Watchlist />

    <Button onClick={handleAddMoreStock}>Add More Stock</Button>
      


        </Container>
  </>
  ) 
}
