import Hero from '../components/Hero/Hero.jsx'
import LandingChart from "../components/charts/landingChart.jsx"
import {useNavigate} from 'react-router-dom'
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import buysell from '../../assets/buysell.jpg'
import './style/UserProfilePage.css'
import { useEffect } from 'react'


export default function UserProfilePage() {

    const navigate = useNavigate()
    

    const handleGoToWatchlist = () => {
      navigate('/watchlist')
    }
  return (
    <>
<Container fluid className='welcome text-center bg-light'>

    <Hero
      className="custom-hero bg-light"
      timeStamp="Welcome!"
      watchList="Below is a list of stock with the highest trading volume for the previous day. This list has no merit on the company's performance, it is just a sample list of different stock to help you get started."
      />

  <img className="invest" src={buysell}/>

      <div className="image-container">

      </div>


    <LandingChart />
    <Button type="button" onClick={handleGoToWatchlist}> Go to my Watchlist</Button>
    </Container>




  </>
  ) 
}
