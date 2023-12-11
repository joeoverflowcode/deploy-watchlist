
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import './style/LoginForm.css'
import { useDispatch } from "react-redux"
import InputGroup from 'react-bootstrap/InputGroup'

export default function LoginForm({ onLogin }) {

    const [emailValue, setEmailValue] = useState("") 
    const [passwordValue, setPasswordValue] = useState('')
    console.log(emailValue)
    console.log(passwordValue)
    

const dispatch = useDispatch()



    return (

<div className='dog'>

<Container className='form-container'>
    <h4>Login Form</h4>
      
      <Form 

      className=" form-row col-md-4 mb-3"
      onSubmit={(event) => {
        event.preventDefault()
        onLogin(event, {
          email: emailValue,
          password: passwordValue,
        })
      }}
      >
      <i></i>

        <Form.Group controlId='email'>
          <Form.Label> Enter your email:</Form.Label>
        <InputGroup>
        <InputGroup.Text>
                <i className="bi bi-envelope"></i>
              </InputGroup.Text>
          <Form.Control 
          value={emailValue} 
          onChange={(evt)=> setEmailValue(evt.target.value)} 
          type="text" 
          placeholder="email"
          required>

          </Form.Control>
            </InputGroup>
        </Form.Group>

        <Form.Group controlId='password'>
        <Form.Label>Password:</Form.Label>
        <InputGroup>
        <InputGroup.Text>
                <i className="bi bi-key"></i>
              </InputGroup.Text>
        <Form.Control 
        value={passwordValue} 
        onChange={(event) => setPasswordValue(event.target.value)}
        type="text" 
        placeholder='password' 
        required>

        </Form.Control>
          </InputGroup>
        </Form.Group>

<br></br>

      <Button className="custom-button" variant="primary" type="submit"> Click to Login </Button>
    
      </Form>



        </Container>
          </div>


    )
  }