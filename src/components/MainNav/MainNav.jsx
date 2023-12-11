import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import "bootstrap-icons/font/bootstrap-icons.css"
import { useSelector } from 'react-redux'
import LogoutButton from '../Login/LogoutButton'

import './MainNav.css'


export default function MainNav ({logo, header, Links}){

    let loggedIn = useSelector(state => state.loggedIn)

    return(


        <Navbar expand ="lg" className="mainNav navbar-dark">
            <Container fluid>
                <Navbar.Brand className='logo' href= '/'> {logo}</Navbar.Brand>

                <h1 className='header' style={{ fontSize: '4rem', color:'rgba(10, 52, 110, 0.853)' }}> {header}</h1>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                <Nav className='mx-auto'>
                    {Links.map(({url, text}, index) =>(
                        <Nav.Link key={index} href={url}>
                            {text}
                        </Nav.Link>
                    ))}
                </Nav>
                {loggedIn ? <LogoutButton /> : <></>}
                </Navbar.Collapse>

            </Container>
        </Navbar>

    )
}