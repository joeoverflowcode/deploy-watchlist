import Column from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useLocation } from 'react-router-dom'



export default function Hero({ timeStamp, watchList }) {

    const location = useLocation()
    console.log(location.pathname)




    return (
        // {location.pathname === '/me' && <Container fluid className='text-center py-5 bg-white'>}
        
        // {location.pathname !== '/me' && <Container fluid className='text-center py-5 bg-light'>}
        

        
        <Container fluid className='text-center py-5 bg-light'>
            <Row className='py-lg-6'>
                <Column lg='8' md='8' className="mx-auto">
                    <h1 className='fw-light'> {timeStamp} </h1>
                    <p className='lead text-muted'>{watchList}</p>
                </Column>
            </Row>
        </Container>
    )
}