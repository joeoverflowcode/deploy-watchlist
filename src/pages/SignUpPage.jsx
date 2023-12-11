
import Container from 'react-bootstrap/Container'
import SignUpForm from '../components/SignUp/SignUpForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style/SignUpPage.css'


export default function SignUpPage() {
const navigate = useNavigate()

const handleRoute = async (event, formData) => {

    const res = await axios.post('/api/signup', formData)
    console.log(res.data.success)
    if(res.data.success) {
        navigate('/me')
    }
}

 

    return (


        <Container className='container'>
            {/* <h1>Sign-Up Page</h1> */}
      
<SignUpForm className='turtle' onSignUp ={handleRoute}
/>


        </Container>


    )
  }