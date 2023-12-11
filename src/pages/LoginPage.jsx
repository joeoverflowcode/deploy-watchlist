import LoginForm from '../components/Login/LoginForm.jsx'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './style/LoginPage.css'


export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleLogin = async (event, formData) =>{

        const res = await axios.post('/api/auth', formData)
        console.log(res)
            if (res.data.success) {
                dispatch({type: "login"})
                navigate('/me')
            }
    }

    return (


<Container >
{/* <h1>Login Page</h1> */}

 <LoginForm className='dog' onLogin={handleLogin} />


        </Container>


    )
  }