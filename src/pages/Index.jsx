import Container from 'react-bootstrap/Container'
import abstractChart from '../../assets/abstractCharts.webp'
import './style/index.css'
import Hero from "../components/Hero/Hero.jsx";
import teenTrade from '../../assets/teentrading.jpg'

import dataup from '../../assets/dataup.jpg'
import invest from '../../assets/invest.jpg'
import investup from '../../assets/investUp.jpg'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';







export default function IndexPage() {

  const navigate = useNavigate()

  const handleGoToSignUp = () => {
    navigate('/signup')
  }


    return (
      <>

      <Container fluid className="text-center py-5 bg-light">
{/* <p>The list of topics goes on and for a young person learning about money and how invessting works, the information can be overwhelming... myFirst Watchlist was designed with the youth in mind to help empower the future generations with the knowledge they need to obtain confidence in their financial futures.</p> */}
{/* <Hero 
timeStamp={"Learning about the stock market is not easy."}
watchList={"myFirst Watchlist was designed with young learners in mind."}
/> */}
        <h1 className="h1">Learning about the stock market is not easy.</h1>
        <h2 className="h2"> myFirst Watchlist was designed with young learners in mind. </h2>
          <br/>
            <div className="indexImage">


            {/* <img className='teentrading' src={teenTrade} /> */}
            {/* <img className='teentrading' src={buysell} /> */}
            {/* <img className='teentrading' src={invest} /> */}
            <img className='teentrading' src={dataup} />
            {/* <img className='teentrading' src={investup} /> */}
            {/* <div className="box">

            </div> */}

            </div>
{/* 
<h3 className="centered-h3">YOUR FIRST STOCK MARKET EXPERIENCE IS JUST A FEW CLICKS AWAY</h3> */}



{/* <div fluid className="styledimg"></div> */}





<Hero
timeStamp={"We ask minors to sign up with adult supervision"}
watchList={"YOUR FIRST STOCK MARKET EXPERIENCE IS JUST A FEW CLICKS AWAY"}
/>

<div className='signUp'>
  <Button 
  className='btn-block'
  onClick={handleGoToSignUp}>
    Sign Up
  </Button>
</div>
       </Container>



      </>
    );
  }
  